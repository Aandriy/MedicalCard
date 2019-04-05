using MedicalCard.ConfigModels;
using MedicalCard.Models;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;


namespace MedicalCard.Services
{
	public class EmailService : IMailService
	{

		private readonly SendEmail _settings;

		public EmailService(IOptions<SendEmail> options)
		{
			_settings = options.Value;
		}

		public void Send(MailModel args)
		{
			string template = @"<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='margin: 0; padding: 0;'>
<table width='100%'>
  <tr>
	<td>{0}</td>
	</tr>
</table>
</body>
</html>";
			var client = new SmtpClient("smtp.gmail.com", 587)
			{
				Credentials = new NetworkCredential(_settings.Login, _settings.Password),
				EnableSsl = true
			};
			MailMessage message = new MailMessage(args.From, args.Receptions, args.Subject, String.Format(template, args.Body) );
			message.IsBodyHtml = true;
			client.Send(message);
		}
	}
}