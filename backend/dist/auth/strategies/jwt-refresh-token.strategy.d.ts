import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    readonly configService: ConfigService;
    constructor(configService: ConfigService);
    validate(request: Request, payload: {
        sub: string;
        iat: number;
        exp: number;
    }): {
        refreshToken: string;
        sub: string;
        iat: number;
        exp: number;
    };
}
export {};
