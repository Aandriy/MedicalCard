import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordFormGroupComponent } from './input-password-form-group.component';

describe('InputPasswordFormGroupComponent', () => {
	let component: InputPasswordFormGroupComponent;
	let fixture: ComponentFixture<InputPasswordFormGroupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputPasswordFormGroupComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputPasswordFormGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
