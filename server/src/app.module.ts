import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './modules/films/films.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      ssl: false,
      synchronize: true,
    }),

    FilmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
