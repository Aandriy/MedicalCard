import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-confirm-email-page',
	templateUrl: './confirm-email-page.component.html',
	styleUrls: ['./confirm-email-page.component.scss'],
})
export class ConfirmEmailPageComponent {
	public isError = false;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _authenticationService: AuthenticationService,
		private _router: Router,
		private _userService: UserService,
	) {
		this._activatedRoute.queryParams.subscribe((params: IDictionary) => {
			if (!params.userId || !params.code) {
				this.isError = true;
			} else {
				this._authenticationService
					.confirmEmail(params.userId, params.code)
					.pipe(
						catchError(() => {
							this.isError = true;
							return [];
						}),
					)
					.subscribe(() => {
						this._userService.loadUser().subscribe(() => {
							this._router.navigateByUrl('/');
						});
					});
			}
		});
	}
}
