using MedicalCard.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalCard.ViewModels
{
	public class RegisterViewModel
	{
		[Required]
		[MaxLength(256)]
		public string Email { get; set; }

		[Required]
		[DataType(DataType.Date)]
		//[DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
		public DateTime Birthday { get; set; }

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required]
		[MaxLength(256)]
		public string FirstName { get; set; }
		[MaxLength(256)]
		public string MiddleName { get; set; }
		[Required]
		[MaxLength(256)]
		public string LastName { get; set; }

		public GenderEnum Gender { get; set; }
	}
}
