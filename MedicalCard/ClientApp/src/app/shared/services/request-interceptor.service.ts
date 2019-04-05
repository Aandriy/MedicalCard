import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';
import { UNAUTHORIZED, NOT_FOUND } from 'http-status-codes';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
	constructor(private _router: Router, private _location: Location) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next
			.handle(request)
			.pipe(catchError((httpErrResp: HttpErrorResponse) => this._handleErrorResponse(httpErrResp)));
	}

	private _handleErrorResponse(err: HttpErrorResponse) {
		const currentUrl = document.location.pathname;

		switch (err.status) {
			case 0:
				this._router
					.navigateByUrl('/on-maintenance', { skipLocationChange: true })
					.then(() => this._location.go(currentUrl));
				return this._ok(err);

			case NOT_FOUND:
				this._router
					.navigateByUrl('/not-found', { skipLocationChange: true })
					.then(() => this._location.go(currentUrl));
				return throwError(err);

			case UNAUTHORIZED:
				const url = '/authentication';

				if (url === this._router.url || window.location.pathname.indexOf(url) === 0) {
					return throwError(err);
				}
				this._router.navigate([url]);
				return this._ok(err);

			default:
				return throwError(err);
		}
	}

	private _ok(body) {
		return of(new HttpResponse({ status: 200, body }));
	}
}
