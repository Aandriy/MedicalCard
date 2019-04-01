import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
	selector: 'app-reset-password-page',
	templateUrl: './reset-password-page.component.html',
	styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent {
	public password: FormControl = new FormControl('', [Validators.required]);

	public form: FormGroup = new FormGroup({
		password: this.password,
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
			console.log({
				password: this.password.value,
			});
		}
	}
}
