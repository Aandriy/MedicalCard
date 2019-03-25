const baseUrl = document.getElementsByTagName('base')[0].href;

class Constants implements IConstants {
	public BASE_URL = baseUrl;
	public BASE_API_URL = `${this.BASE_URL}api/`;
}
export const constants = new Constants();
