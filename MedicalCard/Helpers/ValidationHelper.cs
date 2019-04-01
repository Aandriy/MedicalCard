using MedicalCard.ViewModels;
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
