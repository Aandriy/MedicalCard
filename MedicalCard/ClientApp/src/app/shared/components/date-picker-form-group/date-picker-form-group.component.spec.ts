import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerFormGroupComponent } from './date-picker-form-group.component';

describe('DatePickerFormGroupComponent', () => {
	let component: DatePickerFormGroupComponent;
	let fixture: ComponentFixture<DatePickerFormGroupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DatePickerFormGroupComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DatePickerFormGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
