import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { get, keys } from 'lodash';

@Component({
	selector: 'app-input-password-form-group',
	templateUrl: './input-password-form-group.component.html',
	styleUrls: ['./input-password-form-group.component.scss'],
})
export class InputPasswordFormGroupComponent {
	@Input() field: FormControl;
	@Input() label: string;
	@Input() group: FormGroup;
	@Input() controlName: string;
	@Input() name: string;
	@Input() maxlength: number = 255;

	public passwordType = 'password';
	public isVisible = false;

	public isInvalid(): boolean {
		const { field } = this;

		return field.invalid && field.dirty;
	}

	public getError(): string[] {
		const errors = get(this.field, 'errors');

		if (!errors) {
			return [];
		}
		return keys(errors).map((key: string) => `FORM_ERROR.${key.toUpperCase()}`);
	}

	public toggle(): void {
		if (this.passwordType === 'password') {
			this.passwordType = 'text';
			this.isVisible = true;
		} else {
			this.passwordType = 'password';
			this.isVisible = false;
		}
	}
}
