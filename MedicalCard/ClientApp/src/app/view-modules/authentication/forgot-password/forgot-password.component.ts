import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { catchError } from 'rxjs/operators';
import { get } from 'lodash';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
	public isSuccess = false;
	public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

	public form: FormGroup = new FormGroup({
		email: this.email,
	});

	public success: string;
	public error: string;

	constructor(private _authenticationService: AuthenticationService) {}

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
			};

			this._authenticationService
				.forgotPassword(model)
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
					this.isSuccess = true;
				});
		}

		console.log({
			email: this.email.value,
		});
	}
}
