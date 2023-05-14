// generate an internal api nestjs guard that will be used to protect the internal api using internal api key.

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalApiGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const internalApiKey = this.configService.get<string>('INTERNAL_API_KEY');

    if (!request.headers['internal-api-key']) {
      throw new UnauthorizedException('Internal API Key is missing');
    }

    if (request.headers['internal-api-key'] !== internalApiKey) {
      throw new UnauthorizedException('Internal API Key is invalid');
    } else {
      return true;
    }
  }
}
