import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ManagementClient } from 'auth0';
import { ConfigService } from '@nestjs/config';

const Auth0ManagementClient = {
  provide: 'AUTH0_MANAGEMENT_CLIENT',
  useFactory: (configService: ConfigService) => {
    return new ManagementClient({
      domain: configService.get('AUTH0_DOMAIN'),
      clientId: configService.get('AUTH0_CLIENT_ID'),
      clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, Auth0ManagementClient],
  exports: [JwtStrategy, Auth0ManagementClient],
})
export class AuthModule {}
