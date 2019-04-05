import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private _baseApiUrl: string;

	constructor(private _http: HttpClient, @Inject('CONSTANTS') constants: IConstants) {
		this._baseApiUrl = constants.BASE_API_URL;
	}

	public login(model): Observable<null> {
		const url = `${this._baseApiUrl}Account/Login`;

		return this._http.post<null>(url, model);
	}

	public logout() {
		const url = `${this._baseApiUrl}Account/Login`;
		return this._http.delete(url);
	}

	public register(model: IRegisterViewModel) {
		const url = `${this._baseApiUrl}Account/Register`;

		return this._http.post(url, model);
	}
	public confirmEmail(userId: string, code: string): Observable<null> {
		const url = `${this._baseApiUrl}Account/ConfirmEmail`;

		return this._http.get<null>(url, { params: { userId, code } });
	}
}
