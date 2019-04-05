using MedicalCard.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MedicalCard.Data
{
	public class ApplicationDbContext : IdentityDbContext<User>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
			//Database.EnsureCreated();
			Database.Migrate();
		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			builder.Entity<User>().HasData(new User
			{
				Id = "76348b70-22e5-4a32-9329-ad4120081292",
				AccessFailedCount = 0,
				ConcurrencyStamp = "cc8fc7d8-8e14-4a9a-a772-250981ef250f",
				Email = "a@aa.aa",
				EmailConfirmed = true,
				LockoutEnabled = true,
				LockoutEnd = null,
				NormalizedEmail = "A@AA.AA",
				NormalizedUserName = "A@AA.AA",
				PasswordHash = "AQAAAAEAACcQAAAAEHFMEbVzOio1rYWGj7iGX77teToPw9exHknMoPYnVViLjTKd8lyaM79SYPVhED0QCQ==", // 
				PhoneNumber = null,
				PhoneNumberConfirmed = false,
				SecurityStamp = "JQOCVS44PE4WM33DWMKLA4SPHDSQ3VNU",
				TwoFactorEnabled = false,
				UserName = "a@aa.aa",
				FirstName = "FirstName",
				LastName = "LastName",
				MiddleName = "MiddleName",
				Gender = GenderEnum.male,
			});

			builder.Entity<IdentityUserClaim<string>>().HasData(new IdentityUserClaim<string>
			{
				ClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
				ClaimValue = "Admin",
				Id = 1,
				UserId = "76348b70-22e5-4a32-9329-ad4120081292"
			});
		}

		private void _defaultData()
		{

		}
	}
}
