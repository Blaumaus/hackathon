import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    readonly configService: ConfigService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: {
        sub: string;
        iat: number;
        exp: number;
    }): Promise<import("../../user/entity/user.entity").User>;
}
export {};
