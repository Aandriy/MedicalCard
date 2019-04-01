import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { get, keys } from 'lodash';
import { IMyDpOptions } from 'mydatepicker';

@Component({
	selector: 'app-date-picker-form-group',
	templateUrl: './date-picker-form-group.component.html',
	styleUrls: ['./date-picker-form-group.component.scss'],
})
export class DatePickerFormGroupComponent {
	@Input() field: FormControl;
	@Input() label: string;
	@Input() group: FormGroup;
	@Input() controlName: string;
	@Input() name: string;
	@Input() maxlength: number = 255;

	public myDatePickerOptions: IMyDpOptions = {
		// other options...
		dateFormat: 'mm/dd/yyyy',
	};
	setDate(): void {
		// Set today date using the patchValue function
		let date = new Date();
		this.group.patchValue({
			[this.controlName]: {
				date: {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate(),
				},
			},
		});
	}

	clearDate(): void {
		// Clear the date using the patchValue function
		this.group.patchValue({ [this.controlName]: null });
	}

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
