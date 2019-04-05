using System.ComponentModel.DataAnnotations;

namespace MedicalCard.ViewModels
{
	public class ResetPasswordViewModel
	{
		[Required]
		public string UserId { get; set; }
		[Required]
		[StringLength(100, ErrorMessage = "Пароль должен содержать как минимум 6 символов", MinimumLength = 6)]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		public string Code { get; set; }
	}
}
