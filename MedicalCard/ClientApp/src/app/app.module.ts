import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { constants } from './app.consts';

@NgModule({
	declarations: [AppComponent, FetchDataComponent],
	imports: [HttpModule, BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [{ provide: 'CONSTANTS', useValue: constants }],
	bootstrap: [AppComponent],
})
export class AppModule {}
