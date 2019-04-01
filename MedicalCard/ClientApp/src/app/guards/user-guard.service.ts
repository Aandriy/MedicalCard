import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class UserGuardService implements CanActivate {
	constructor(private _userService: UserService, private _router: Router) {}

	canActivate(route, state): boolean {
		if (!this._userService.user) {
			this._router.navigate(['/authentication'], { queryParams: { previousUrl: state.url } });
			return false;
		}
		return true;
	}
}
