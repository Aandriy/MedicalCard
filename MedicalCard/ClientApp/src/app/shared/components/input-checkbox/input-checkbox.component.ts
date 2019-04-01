import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { get, keys } from 'lodash';

@Component({
	selector: 'app-input-checkbox',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss'],
})
export class InputCheckboxComponent {
	@Input() field: FormControl;
	@Input() label: string;
	@Input() group: FormGroup;
	@Input() controlName: string;
	@Input() name: string;

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
