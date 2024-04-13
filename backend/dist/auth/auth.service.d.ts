import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ActionTokensService } from 'src/action-tokens/action-tokens.service';
import { ActionToken } from 'src/action-tokens/action-token.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    private actionTokensService;
    constructor(userService: UserService, jwtService: JwtService, actionTokensService: ActionTokensService);
    generateJwtAccessToken(userId: string): Promise<string>;
    private generateJwtRefreshToken;
    generateJwtTokens(userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private comparePassword;
    validateUser(nickname: string, password: string): Promise<User | null>;
    checkVerificationToken(token: string): Promise<ActionToken | null>;
    hashPassword(password: string): Promise<string>;
    createUnverifiedUser(password: string, nickname: string): Promise<User>;
    checkRefreshToken(userId: string, refreshToken: string): Promise<boolean>;
}
