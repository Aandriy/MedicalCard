import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-fetch-data',
	templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent {
	public forecasts: WeatherForecast[];

	constructor(http: HttpClient, @Inject('CONSTANTS') constants: IConstants) {
		http.get<WeatherForecast[]>(`${constants.BASE_API_URL}SampleData/WeatherForecasts`).subscribe(
			result => {
				this.forecasts = result;
			},
			error => console.error(error),
		);
	}
}

interface WeatherForecast {
	dateFormatted: string;
	temperatureC: number;
	temperatureF: number;
	summary: string;
}
