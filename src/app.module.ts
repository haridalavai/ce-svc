import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Auth0Module } from './shared/auth0.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    Auth0Module.forRoot(
      process.env.AUTH0_DOMAIN,
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_CLIENT_SECRET,
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
