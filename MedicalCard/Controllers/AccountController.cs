using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalCard.Filters;
using MedicalCard.Models;
using MedicalCard.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCard.Controllers
{
	[Route("api/[controller]")]
	public class AccountController : Controller
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;

		public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
		}

		[HttpPost("[action]")]
		[ModelStateValidation]
		public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
		{
			User user = new User { Email = model.Email, UserName = model.Email, Birthday = model.Birthday };
			// добавляем пользователя
			var result = await _userManager.CreateAsync(user, model.Password);
			if (result.Succeeded)
			{
				// установка куки
				await _signInManager.SignInAsync(user, false);
				//return RedirectToAction("Index", "Home");
				return Ok(new { Redirect = "/EmailConfirmation" });
			}

			var errors = AddErrors(result);
			return BadRequest(new { Validation = errors });
		}


		[HttpPost("[action]")]
		//[ValidateAntiForgeryToken]
		[ModelStateValidation]
		public async Task<IActionResult> Login([FromBody] LoginViewModel model)
		{

			var result =
				await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
			if (result.Succeeded)
			{
				return Ok(new { });

			}

			List<InvalidItem> errors = new List<InvalidItem>();
			
			errors.Add(new InvalidItem
			{
				Field = "",
				Message = "Неправильный логин и (или) пароль"
			});

			return BadRequest(new { Validation = errors });

		}

		[HttpDelete("[action]")]
		public async Task<IActionResult> Login()
		{
			await _signInManager.SignOutAsync();
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