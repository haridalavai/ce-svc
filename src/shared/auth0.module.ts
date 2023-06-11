import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ManagementClient } from 'auth0';

@Module({})
export class Auth0Module {
  static forRoot(
    domain: string,
    clientId: string,
    clientSecret: string,
  ): DynamicModule {
    const Auth0ManagementClient = new ManagementClient({
      domain,
      clientId,
      clientSecret,
    });

    const Auth0Provider: Provider = {
      provide: 'AUTH0_MANAGEMENT_CLIENT',
      useValue: Auth0ManagementClient,
    };

    return {
      module: Auth0Module,
      providers: [Auth0Provider],
      exports: [Auth0Provider],
      global: true,
    };
  }
}
