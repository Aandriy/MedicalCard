import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { get } from 'lodash';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-log-in-page',
	templateUrl: './log-in-page.component.html',
	styleUrls: ['./log-in-page.component.scss'],
})
export class LogInPageComponent {
	public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
	public password: FormControl = new FormControl('', [Validators.required]);
	public rememberMe: FormControl = new FormControl(false);

	public form: FormGroup = new FormGroup({
		email: this.email,
		password: this.password,
		rememberMe: this.rememberMe,
	});

	public success: string;
	public error: string;

	constructor(
		private _router: Router,
		private _authenticationService: AuthenticationService,
		private _userService: UserService,
		private _activatedRoute: ActivatedRoute,
	) {}

	public submit(): void {
		this.error = '';
		this.success = '';

		if (this.form.invalid) {
			Object.keys(this.form.controls).forEach(name => {
				this.form.get(name).markAsDirty();
			});
		} else {
			const model = {
				email: this.email.value,
				password: this.password.value,
				rememberMe: this.rememberMe.value,
			};
			this._authenticationService
				.login(model)
				.pipe(
					catchError((err: any) => {
						const errors = get(err, 'error.validation');

						if (Array.isArray(errors)) {
							this.error = errors.map((error: InvalidItem) => error.message).join(', ');
						}
						return [];
					}),
				)
				.subscribe(() => {
					this._userService.loadUser().subscribe(() => {
						const queryParams = { ...this._activatedRoute.snapshot.queryParams };
						const url = queryParams.previousUrl || '/';

						this._router.navigateByUrl(url);
					});
				});
		}
	}
}
