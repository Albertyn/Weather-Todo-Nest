import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true }
    }),
  );

  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;

  await app.listen(port);
  console.log(`Application is running in ${appConfigService.nodeEnv} mode on: http://localhost:${port}`);
}
bootstrap();
