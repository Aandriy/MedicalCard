import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-reset-password-page',
	templateUrl: './reset-password-page.component.html',
	styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent {
	public isError = false;
	public password: FormControl = new FormControl('', [Validators.required]);
	public form: FormGroup = new FormGroup({ password: this.password });
	public success: string;
	public error: string;

	private _userId: string;
	private _code: string;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _authenticationService: AuthenticationService,
	) {
		this._activatedRoute.queryParams.subscribe((params: IDictionary) => {
			if (!params.userId || !params.code) {
				this.isError = true;
			} else {
				this._userId = params.userId;
				this._code = params.code;
			}
		});
	}

	public submit(): void {
		this.error = '';
		this.success = '';

		if (this.form.invalid) {
			Object.keys(this.form.controls).forEach(name => {
				this.form.get(name).markAsDirty();
			});
		} else {
			const model = {
				userId: this._userId,
				code: this._code,
				password: this.password.value,
			};
			this._authenticationService
				.resetPassword(model)
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
			console.log({
				password: this.password.value,
			});
		}
	}
}
