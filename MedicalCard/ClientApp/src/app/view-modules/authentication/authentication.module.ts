import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';

const routes: Routes = [
	{
		path: '',
		component: LogInPageComponent,
	},
	{
		path: 'registration',
		pathMatch: 'full',
		component: RegistrationPageComponent,
	},
	{
		path: 'forgot-password',
		pathMatch: 'full',
		component: ForgotPasswordComponent,
	},
	{
		path: 'reset-password',
		pathMatch: 'full',
		component: ResetPasswordPageComponent,
	},
];

@NgModule({
	declarations: [LogInPageComponent, RegistrationPageComponent, ForgotPasswordComponent, ResetPasswordPageComponent],
	imports: [
		SharedModule.forRoot(),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		RouterModule.forChild(routes),
	],
	providers: [],
	exports: [],
})
export class AuthenticationModule {}
