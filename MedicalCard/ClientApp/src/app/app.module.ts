import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { CoreModule } from './core/core.module';

import { UserService } from './services/user.service';
import { UserGuardService } from './guards/user-guard.service';
import { PreloadService } from './services/preload.service';
import { UserResolverService } from './resolvers/user-resolver.service';
import { AuthenticationService } from './services/authentication.service';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export function settingsProviderFactory(provider: PreloadService) {
	return () => provider.load();
}

@NgModule({
	declarations: [AppComponent, NotFoundPageComponent],
	imports: [
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
		}),
		SharedModule.forRoot(),
		CoreModule,
		BrowserModule,
		AppRoutingModule,
		MyDatePickerModule,
	],
	providers: [
		UserService,
		{ provide: APP_INITIALIZER, useFactory: settingsProviderFactory, deps: [PreloadService], multi: true },
		UserGuardService,
		UserResolverService,
		AuthenticationService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
