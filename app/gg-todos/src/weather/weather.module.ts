import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { GeoCodingService } from './geocoding.service';
import { AppConfigService } from 'src/config/app-config.service';

@Module({
  imports: [HttpModule],
  providers: [AppConfigService, WeatherService, GeoCodingService],
  controllers: [WeatherController],
})
export class WeatherModule {}
