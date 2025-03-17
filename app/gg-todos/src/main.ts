import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const swaggerDeets = new DocumentBuilder()
    .setTitle(`Weather-Todo-Nest API (${appConfigService.nodeEnv})`)
    .setDescription('a Nest API demo')
    .setVersion('1.0')
    .addTag('nest-js')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDeets);
  SwaggerModule.setup('api-doc', app, document); 


  await app.listen(port);
  console.log(`Application is running in ${appConfigService.nodeEnv} mode on: http://localhost:${port}`);
}
bootstrap();
