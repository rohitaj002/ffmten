import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Main');

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  // TODO: Need to disable in the production mode
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('FFMax10')
    .setDescription('FFMax10 Api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Game')
    .build();

  /* Add swagger configuration */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    logger.log(`Server started at ${port}`);
  });
}
bootstrap();