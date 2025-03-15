import { plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Type(() => Number)
  PORT: number;

  @IsString()
  WEATHER_URL: string;

  @IsString()
  GEOCODE_URL: string;

  @IsString()
  AUTH_USER_NAME: string;

  @IsString()
  AUTH_USER_PASS: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    {
      NODE_ENV: config.NODE_ENV || 'development',
      PORT: config.PORT,
      WEATHER_URL: config.WEATHER_URL,
      GEOCODE_URL: config.GEOCODE_URL,
      AUTH_USER_NAME: config.AUTH_USER_NAME,
      AUTH_USER_PASS: config.AUTH_USER_PASS,
    },
  );

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    console.error('Environment validation errors:', errors);
    throw new Error(errors.toString());
  }
  return validatedConfig;
}