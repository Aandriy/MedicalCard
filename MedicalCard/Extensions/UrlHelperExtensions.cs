using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Web;

namespace MedicalCard.Extensions
{
	public static class UrlHelperExtensions
	{
		private static IHttpContextAccessor HttpContextAccessor;
		public static void Configure(IHttpContextAccessor httpContextAccessor)
		{
			HttpContextAccessor = httpContextAccessor;
		}
		public static string AbsolutePath( this IUrlHelper url, string path)
		{
			var request = HttpContextAccessor.HttpContext.Request;

			return string.Concat(
						request.Scheme,
						"://",
						request.Host.ToUriComponent(),
						path);
		}

		public static Uri AddQuery(this Uri uri, string name, string value)
		{
			var httpValueCollection = HttpUtility.ParseQueryString(uri.Query);

			httpValueCollection.Remove(name);
			httpValueCollection.Add(name, value);

			var ub = new UriBuilder(uri);
			ub.Query = httpValueCollection.ToString();

			return ub.Uri;
		}
	}
}
