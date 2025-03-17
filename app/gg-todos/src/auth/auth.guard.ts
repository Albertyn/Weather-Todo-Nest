import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AppConfigService } from '../config/app-config.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../public.decorator';

@Injectable()
export class BasicAuthGuard implements CanActivate {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly reflector: Reflector,
  ) {
    /* console.log('AppConfigService in Guard:', this.appConfigService); */

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    /* Check if route is marked as public */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    console.log('BasicGuard->Auth Header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('Missing authentication header');
    }

    /* authentication logic... */
    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic') {
      throw new UnauthorizedException('Invalid authentication type');
    }

    const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    if (!username || !password) {
      throw new UnauthorizedException('Invalid authentication format');
    }

    //    
    // Call the getters here, within canActivate
    const u = this.appConfigService.authKey;
    const p = this.appConfigService.authSecret;

    /* Check vars
    console.log('Decoded Credentials:', decodedCredentials);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Config Key:', u()); 
    console.log('Config Secret:', p());   */

    if (username === u && password === p) {
      return true;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}