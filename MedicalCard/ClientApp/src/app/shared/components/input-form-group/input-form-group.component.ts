import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { get, keys } from 'lodash';

@Component({
	selector: 'app-input-form-group',
	templateUrl: './input-form-group.component.html',
	styleUrls: ['./input-form-group.component.scss'],
})
export class InputFormGroupComponent {
	@Input() field: FormControl;
	@Input() label: string;
	@Input() group: FormGroup;
	@Input() controlName: string;
	@Input() name: string;
	@Input() maxlength: number = 255;

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
}
