import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    me(user_id: string): Promise<Partial<User>>;
    update(user_id: string, data: Partial<User>): Promise<Partial<User>[]>;
    delete(user_id: string): Promise<Partial<User>[]>;
}
