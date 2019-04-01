import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { constants } from './app/app.consts';

import { environment } from './environments/environment';

const providers = [{ provide: 'CONSTANTS', useValue: constants }];

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic(providers)
	.bootstrapModule(AppModule)
	.catch(err => console.error(err));
