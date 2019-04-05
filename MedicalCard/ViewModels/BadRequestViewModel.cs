using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalCard.ViewModels
{
	public class BadRequestViewModel
	{
		public List<InvalidItem> Validations { get; set; }
	}
}
