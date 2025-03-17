import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  
  // Server configuration
  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }
  
  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }
  
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
  
  // ensure safe defaults 
  get weatherUrl(): string {
    const secret = this.configService.get<string>('WEATHER_URL');
    if (!secret) {
      throw new Error('WEATHER_URL environment variable is not defined');
    }
    return secret;
  }

  get geocodeUrl(): string {
    const secret = this.configService.get<string>('GEOCODE_URL');
    if (!secret) {
      throw new Error('GEOCODE_URL environment variable is not defined');
    }
    return secret;
  }
  
  // Authentication configuration  
  get authKey(): string {
    return this.configService.get<string>('AUTH_USER_NAME','testuser');
  }
  get authSecret(): string {
    return this.configService.get<string>('AUTH_USER_PASS','testpassword');
  }
}