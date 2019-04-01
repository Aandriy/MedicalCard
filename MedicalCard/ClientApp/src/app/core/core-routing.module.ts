import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RootComponent } from './components/root/root.component';
import { UserGuardService } from '../guards/user-guard.service';
import { UserResolverService } from '../resolvers/user-resolver.service';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: RootComponent,
		resolve: { data: UserResolverService },
		runGuardsAndResolvers: 'always',
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: HomePageComponent,
				canActivate: [UserGuardService],
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class CoreRoutingModule {}
