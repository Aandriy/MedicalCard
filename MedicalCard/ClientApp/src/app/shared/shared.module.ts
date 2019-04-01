import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputFormGroupComponent } from './components/input-form-group/input-form-group.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { InputPasswordFormGroupComponent } from './components/input-password-form-group/input-password-form-group.component';
import { FrameContainerComponent } from './components/frame-container/frame-container.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { DatePickerFormGroupComponent } from './components/date-picker-form-group/date-picker-form-group.component';
import { HeaderSectionComponent } from './components/header-section/header-section.component';

@NgModule({
	declarations: [
		InputFormGroupComponent,
		InputPasswordFormGroupComponent,
		FrameContainerComponent,
		InputCheckboxComponent,
		DatePickerFormGroupComponent,
		HeaderSectionComponent,
	],
	exports: [
		InputFormGroupComponent,
		InputPasswordFormGroupComponent,
		FrameContainerComponent,
		InputCheckboxComponent,
		DatePickerFormGroupComponent,
		HeaderSectionComponent,
	],
	imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, MyDatePickerModule, RouterModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptorService,
			multi: true,
		},
	],
})
export class SharedModule {
	static forRoot() {
		return {
			ngModule: SharedModule,
			providers: [],
		};
	}
}
