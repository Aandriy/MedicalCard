using MedicalCard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalCard.ViewModels
{
	public class UserViewModel
	{
		public string Birthday { get; set; }
		public string FirstName { get; set; }
		public string MiddleName { get; set; }
		public string LastName { get; set; }
		public GenderEnum Gender { get; set; }
	}
}
