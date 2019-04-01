import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class PreloadService {
	constructor(private _userService: UserService) {}

	public load(): Promise<void> {
		return this._userService
			.loadUser()
			.toPromise()
			.then((user: IUser) => {
				console.log(user);
			})
			.catch(() => {});
	}
}
