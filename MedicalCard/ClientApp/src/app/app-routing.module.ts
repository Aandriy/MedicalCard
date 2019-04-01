import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
	{ path: 'authentication', loadChildren: './view-modules/authentication/authentication.module#AuthenticationModule' },
	{
		path: '**',
		component: NotFoundPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule {}
