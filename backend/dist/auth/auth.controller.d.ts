import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entity/user.entity';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(body: {
        nickname: string;
        password: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
    login(body: {
        nickname: string;
        password: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
    refreshToken(userId: string, refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
