import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BasicAuthGuard } from './auth.guard';
import { AppConfigService } from '../config/app-config.service';
import { IS_PUBLIC_KEY } from '../public.decorator';

describe('BasicAuthGuard', () => {
  let guard: BasicAuthGuard;
  let mockAppConfigService: { authKey: jest.Mock; authSecret: jest.Mock };
  let reflector: Reflector;

  // Arrange 
  const mockUserName = 'testuser';
  const mockUserPassword = 'testpassword';

  beforeEach(async () => {
    mockAppConfigService = {
      authKey: jest.fn().mockReturnValue(mockUserName),
      authSecret: jest.fn().mockReturnValue(mockUserPassword),
    }
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasicAuthGuard,
        {
          provide: AppConfigService,
          useValue: mockAppConfigService,
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<BasicAuthGuard>(BasicAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should inject the mockAppConfigService', () => {
    const injectedService = guard['appConfigService'];
    // Verify that it's the same instance as the mock
    expect(injectedService).toBe(mockAppConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  // Act

  describe('canActivate', () => {

    let mockContext: ExecutionContext;
    let mockRequest: any;

    beforeEach(() => {
      mockRequest = {
        headers: {},
      };
  
      mockContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
        getHandler: jest.fn(),
        getClass: jest.fn(),
      } as unknown as ExecutionContext;
      
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false); // Default to non-public route
      console.log('beforeEach->mockRequest->', mockContext.switchToHttp().getRequest())
    });


    it('should throw UnauthorizedException when no authorization header is present', () => {
      console.log('0',mockRequest)

      expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
      expect(guard.canActivate(mockContext)).rejects.toThrow('Missing authentication header');
    });
    
    /*
    it('should throw UnauthorizedException when auth type is not Basic', async () => {
      mockRequest.headers.authorization = 'Bearer some-token';
      console.log('1',mockRequest)
      await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
      await expect(guard.canActivate(mockContext)).rejects.toThrow('Invalid authentication type');
    });
    
    it('should throw UnauthorizedException when credentials format is invalid', async () => {
      mockRequest.headers.authorization = 'Basic aW52YWxpZGNyZWRlbnRpYWxz'; // Invalid base64
      console.log('2',mockRequest)
      await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
      await expect(guard.canActivate(mockContext)).rejects.toThrow('Invalid authentication format');
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      mockRequest.headers.authorization = 'Basic d3JvbmdVc2VyOndyb25nUGFzcw=='; // wrongUser:wrongPass
      console.log('3',mockRequest)
      await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
      await expect(guard.canActivate(mockContext)).rejects.toThrow('Invalid credentials');
    });*/

    it('should return true when credentials are valid', async () => {
      const encodedCredentials = Buffer.from(`${mockUserName}:${mockUserPassword}`).toString('base64');
      mockRequest.headers.authorization = `Basic ${encodedCredentials}`;
      expect(await guard.canActivate(mockContext)).toBe(true);
    });

    it('should call the config service to get credentials', async () => {
      const encodedCredentials = Buffer.from(`${mockUserName}:${mockUserPassword}`).toString('base64');
      mockRequest.headers.authorization = `Basic ${encodedCredentials}`;
      await guard.canActivate(mockContext);
      expect(mockAppConfigService.authKey).toHaveBeenCalled();
      expect(mockAppConfigService.authSecret).toHaveBeenCalled();
    });

    it('should not call config service when route is public', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      await guard.canActivate(mockContext);
      expect(mockAppConfigService.authKey).not.toHaveBeenCalled();
      expect(mockAppConfigService.authSecret).not.toHaveBeenCalled();
    });

    it('should allow access to public routes', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      expect(await guard.canActivate(mockContext)).toBe(true);
    });
  });
});