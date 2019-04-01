import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserResolverService implements Resolve<Observable<IUser>> {
	constructor(private _userService: UserService) {}

	resolve() {
		if (this._userService.user) {
			return of(this._userService.user);
		}
		return this._userService.loadUser();
	}
}
