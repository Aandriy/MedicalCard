using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalCard.Data;
using MedicalCard.Extensions;
using MedicalCard.Filters;
using MedicalCard.Helpers;
using MedicalCard.Models;
using MedicalCard.Services;
using MedicalCard.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace MedicalCard.Controllers
{
	[Route("api/[controller]")]
	public class AccountController : Controller
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly IMailService _mailService;
		private readonly ApplicationDbContext _applicationDbContext;

		public AccountController(UserManager<User> userManager, 
			SignInManager<User> signInManager, 
			IMailService mailService,
			ApplicationDbContext applicationDbContext)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_mailService = mailService;
			_applicationDbContext = applicationDbContext;
		}

		[HttpPost("[action]")]
		[ModelStateValidation]
		public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
		{
			User user = new User
			{
				LastName = model.LastName,
				MiddleName = model.MiddleName,
				FirstName = model.FirstName,
				Gender = model.Gender,
				Email = model.Email,
				UserName = model.Email,
				Birthday = model.Birthday
			};
			// добавляем пользователя
			var result = await _userManager.CreateAsync(user, model.Password);
			if (result.Succeeded)
			{
				// генерация токена для пользователя
				var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
				string callbackUrl = new Uri(Url.AbsolutePath("/authentication/confirm-email"))
				.AddQuery("userId", user.Id)
				.AddQuery("code", code).ToString();

				_mailService.Send(new MailModel
				{
					From = "Noreply@gamil.com",
					Receptions = model.Email,
					Subject = "Confirm your account",
					Body = String.Format("Confirm registration by clicking on the <a href='{0}'>link</a>", callbackUrl)
				});

				return Ok(null);
			}

			var errors = AddErrors(result);
			return BadRequest(new BadRequestViewModel { Validations = errors });
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> ConfirmEmail(string userId, string code)
		{
			string errorMessage = "Error";

			if (userId == null || code == null)
			{
				return BadRequest(ValidationHelper.AddValidationError(errorMessage));
			}
			var user = await _userManager.FindByIdAsync(userId);
			if (user == null)
			{
				return BadRequest(ValidationHelper.AddValidationError(errorMessage));
			}

			var result = await _userManager.ConfirmEmailAsync(user, code);
			if (!result.Succeeded)
			{
				return BadRequest(ValidationHelper.AddValidationError(errorMessage));
			}
			await _signInManager.SignInAsync(user, false);

			return Ok(null);
		}

		[HttpPost("[action]")]
		[ModelStateValidation]
		public async Task<IActionResult> Login([FromBody] LoginViewModel model)
		{
			var result =
				await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
			if (result.Succeeded)
			{
				return Ok(null);
			}

			return BadRequest(ValidationHelper.AddValidationError("Неправильный логин и (или) пароль"));
		}

		[HttpDelete("[action]")]
		public async Task<IActionResult> Login()
		{
			await _signInManager.SignOutAsync();
			return Ok(null);
		}

		[HttpPost("[action]")]
		[ModelStateValidation]
		//[ValidateAntiForgeryToken]
		public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model)
		{
			var user = await _userManager.FindByNameAsync(model.Email);
			if (user == null)
			{
				// || !(await _userManager.IsEmailConfirmedAsync(user))
				return Ok(null);
			}

			var code = await _userManager.GeneratePasswordResetTokenAsync(user);
			string callbackUrl = new Uri(Url.AbsolutePath("/authentication/reset-password"))
				.AddQuery("userId", user.Id)
				.AddQuery("code", code).ToString();

			_mailService.Send(new MailModel
			{
				From = "Noreply@gamil.com",
				Receptions = model.Email,
				Subject = "Reset Password",
				Body = String.Format("To reset your password, click the <a href='{0}'>link</a>", callbackUrl)
			});

			return Ok(null);
		}


		[HttpPost("[action]")]
		[ModelStateValidation]
		//[ValidateAntiForgeryToken]
		public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
		{
			var user = await _userManager.FindByIdAsync(model.UserId);
			if (user == null)
			{
				return BadRequest(ValidationHelper.AddValidationError("Error"));
			}
			var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
			if (!result.Succeeded)
			{
				var errors = AddErrors(result);
				return BadRequest(new BadRequestViewModel { Validations = errors });
			}

			if (!(await _userManager.IsEmailConfirmedAsync(user)))
			{
				var u = await _applicationDbContext.Users.Where(x => x.Id == user.Id).FirstOrDefaultAsync();
				u.EmailConfirmed = true;
				await _applicationDbContext.SaveChangesAsync();
				// tod acivate emails
			}

			await _signInManager.SignInAsync(user, false);
			return Ok(null);
		}


		private List<InvalidItem> AddErrors(IdentityResult result)
		{
			var errors = new List<InvalidItem>();
			foreach (var error in result.Errors)
			{
				errors.Add(new InvalidItem
				{
					Field = "",
					Message = error.Description
				});
			}
			return errors;
		}
	}
}