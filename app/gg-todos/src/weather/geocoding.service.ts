import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class GeoCodingService {
  private readonly apiUrl;

  constructor(private readonly httpService: HttpService, private appConfigService: AppConfigService) {
    this.apiUrl = this.appConfigService.geocodeUrl;
    console.log('Geo-Code Url:', this.apiUrl);
  }

  async getCoordinates(city: string): Promise<{ latitude: number; longitude: number } | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.apiUrl, { params: { name: city } }),
      );

      const results = response.data.results;
      if (results && results.length > 0) {
        const { latitude, longitude } = results[0];
        return { latitude, longitude };
      }
      return null; // Return null if no coordinates found
    } catch (error) {
      throw new Error(`Failed to fetch coordinates: ${error.message}`);
    }
  }
}
