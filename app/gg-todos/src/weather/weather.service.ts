import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class WeatherService {
  private readonly apiUrl;

  constructor(private readonly httpService: HttpService, private appConfigService: AppConfigService) {
      this.apiUrl = this.appConfigService.weatherUrl
      console.log('Weather Url:', this.apiUrl);
    }

  async getWeather(latitude: number, longitude: number): Promise<any> {
    const params = {
      latitude,
      longitude,
      current_weather: true,
    };

    try {
      // make HTTP request | convert Observable to Promise
      const response = await firstValueFrom(this.httpService.get(this.apiUrl, { params }));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }
}

