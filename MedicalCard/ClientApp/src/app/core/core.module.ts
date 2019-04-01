import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RootComponent } from './components/root/root.component';

@NgModule({
	declarations: [HomePageComponent, RootComponent],
	imports: [CommonModule, CoreRoutingModule, SharedModule],
	providers: [],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() _coreModule: CoreModule) {
		if (_coreModule) {
			throw new Error('CoreModule is already loaded. Import it in the AppModule only');
		}
	}
}
