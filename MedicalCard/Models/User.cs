using Microsoft.AspNetCore.Identity;
using System;

namespace MedicalCard.Models
{
	public class User : IdentityUser
	{
		public DateTime Birthday { get; set; }
		public string FirstName { get; set; }
		public string MiddleName { get; set; }
		public string LastName { get; set; }
		public GenderEnum Gender { get; set; }
	}
}
