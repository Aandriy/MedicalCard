using MedicalCard.Helpers;
using MedicalCard.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MedicalCard.Filters
{
	public class ModelStateValidationAttribute : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			if (!context.ModelState.IsValid)
			{
				var errors = ValidationHelper.GetErrorsList(context.ModelState);
				context.Result = new OkObjectResult(new BadRequestViewModel
				{
					Validations = errors
				});
			}
		}
	}
}
