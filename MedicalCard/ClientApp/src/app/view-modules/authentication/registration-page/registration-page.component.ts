import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

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
			console.log(model);

			this._authenticationService.register(model).subscribe(x => {
				//delete model.birthday;

				console.log(x);
			});
		}
	}
}
