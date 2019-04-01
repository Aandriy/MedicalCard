using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MedicalCard.Data;
using MedicalCard.Models;
using MedicalCard.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalCard.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class UserController : Controller
	{
		private readonly UserManager<User> _userManager;
		private readonly ApplicationDbContext _applicationDbContext;
		public UserController(
			UserManager<User> userManager,
			ApplicationDbContext applicationDbContext
			)
		{
			_userManager = userManager;
			_applicationDbContext = applicationDbContext;
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> Index()
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var user = await _applicationDbContext.Users.FirstOrDefaultAsync(p => p.Id == userId);

			UserViewModel userData = new UserViewModel
			{
				Birthday = user.Birthday.ToString("yyyy-MM-dd"),
				FirstName = user.FirstName,
				Gender = user.Gender,
				LastName = user.LastName,
				MiddleName = user.MiddleName,
			};

			return Ok(userData);
		}
	}
}