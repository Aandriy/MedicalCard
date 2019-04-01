import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
	public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

	public form: FormGroup = new FormGroup({
		email: this.email,
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

		console.log({
			email: this.email.value,
		});
	}
}
