import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header-section',
	templateUrl: './header-section.component.html',
	styleUrls: ['./header-section.component.scss'],
})
export class HeaderSectionComponent implements OnInit {
	public user: IUser;
	public initials: string;

	constructor(
		private _userService: UserService,
		private _authenticationService: AuthenticationService,
		private _router: Router,
	) {}

	ngOnInit() {
		this.user = this._userService.user;
		this.initials = this.user.firstName + this.user.lastName;
	}
	onLogout() {
		this._authenticationService.logout().subscribe(() => {
			this._router.navigate(['/authentication']);
		});
	}
}
