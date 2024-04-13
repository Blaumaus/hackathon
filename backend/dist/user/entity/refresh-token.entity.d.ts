import { User } from './user.entity';
export declare class RefreshToken {
    id: string;
    userId: string;
    refreshToken: string;
    user: User;
    created: Date;
}
