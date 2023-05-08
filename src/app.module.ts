import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), ProvidersModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
