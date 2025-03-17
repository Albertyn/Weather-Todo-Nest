import { Controller, Get, Query } from '@nestjs/common';
import { GeoCodingService } from './geocoding.service';
import { WeatherService } from './weather.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly geoCodingService: GeoCodingService,
  ) {}

  /* http://localhost:3000/weather?city=Cape Town */
  @Get()
  @ApiOperation({ summary: 'Get the weather forecast for your city' })
  @ApiOkResponse({ description: 'weather forecast json payload'})
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new Error('City name is required');
    }

    // Lookup coordinates based on city name
    const coordinates = await this.geoCodingService.getCoordinates(city);
    if (!coordinates) {
      throw new Error(`Could not find coordinates for city: ${city}`);
    }

    // Fetch weather data using coordinates
    const { latitude, longitude } = coordinates;
    return this.weatherService.getWeather(latitude, longitude);
  }
}
