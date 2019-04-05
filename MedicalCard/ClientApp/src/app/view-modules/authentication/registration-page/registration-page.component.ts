import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { catchError } from 'rxjs/operators';
import { get } from 'lodash';

@Component({
	selector: 'app-registration-page',
	templateUrl: './registration-page.component.html',
	styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
	public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
	public password: FormControl = new FormControl('', [Validators.required]);
	public birthday: FormControl = new FormControl('', [Validators.required]);
	public firstName: FormControl = new FormControl('', [Validators.required]);
	public lastName: FormControl = new FormControl('', [Validators.required]);
	public middleName: FormControl = new FormControl('', [Validators.required]);
	public isAllowed: FormControl = new FormControl(false, [Validators.pattern('true')]);

	public isAccountCreated = false;

	public form: FormGroup = new FormGroup({
		firstName: this.firstName,
		lastName: this.lastName,
		middleName: this.middleName,
		email: this.email,
		password: this.password,
		birthday: this.birthday,
		isAllowed: this.isAllowed,
	});

	public success: string;
	public error: string;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _authenticationService: AuthenticationService,
	) {}

	public submit(): void {
		this.error = '';
		this.success = '';

		if (this.form.invalid) {
			Object.keys(this.form.controls).forEach(name => {
				this.form.get(name).markAsDirty();
			});
		} else {
			const model: IRegisterViewModel = Object.keys(this.form.controls).reduce((memo, fieldName) => {
				memo[fieldName] = this[fieldName].value;
				return memo;
			}, {}) as IRegisterViewModel;

			model.birthday = this.birthday.value.formatted;

			this._authenticationService
				.register(model)
				.pipe(
					catchError((err: IBadRequest) => {
						const errors: InvalidItem[] = get(err, 'error.validations');

						if (Array.isArray(errors)) {
							this.error = errors.map((error: InvalidItem) => error.message).join(', ');
						}
						return [];
					}),
				)
				.subscribe(() => {
					this.isAccountCreated = true;
				});
		}
	}
}
