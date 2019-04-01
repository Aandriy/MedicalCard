import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private _baseApiUrl: string;
	private _userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject(null);
	private _userObservable: Observable<IUser> = this._userSubject.asObservable();

	constructor(private _http: HttpClient, @Inject('CONSTANTS') constants: IConstants) {
		this._baseApiUrl = constants.BASE_API_URL;
	}

	loadUser(): Observable<IUser> {
		const url = `${this._baseApiUrl}User/Index`;

		return this._http.get<IUser>(url).pipe(
			catchError(() => {
				return [];
			}),
			map((user: IUser) => {
				this._userSubject.next(user);
				return user;
			}),
		);
	}

	get observable(): Observable<IUser | null> {
		return this._userObservable;
	}

	get subject(): BehaviorSubject<IUser | null> {
		return this._userSubject;
	}

	get user(): IUser | null {
		return this._userSubject.getValue();
	}
}
