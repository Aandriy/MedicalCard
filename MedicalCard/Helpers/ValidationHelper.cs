using MedicalCard.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace MedicalCard.Helpers
{
	public class ValidationHelper
	{
		public static List<InvalidItem> GetErrorsList(ModelStateDictionary modelState)
		{
			var errors = modelState.Select(x => x)
					.Where(y => y.Value.Errors.Count > 0)
					.SelectMany(p => p.Value.Errors.Select(t => new InvalidItem
					{
						Field = StrHelper.ToCamelCase(p.Key),
						Message = t.ErrorMessage
					}))
					.ToList();
			return errors;
		}

		public static BadRequestViewModel AddValidationError(string message)
		{
			List<InvalidItem> errors = new List<InvalidItem>();

			errors.Add(new InvalidItem
			{
				Field = "",
				Message = message
			});

			return new BadRequestViewModel
			{
				Validations = errors
			};
		}


		private bool IsDebug()
		{
#if DEBUG
			return true;
#else
			return false;
#endif
		}
	}
}
