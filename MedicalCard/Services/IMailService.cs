using MedicalCard.Models;
using System.Threading.Tasks;

namespace MedicalCard.Services
{
	public interface IMailService
	{
		void Send(MailModel args);
	}
}
