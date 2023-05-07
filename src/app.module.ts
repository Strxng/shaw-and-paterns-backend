import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ProvidersModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
