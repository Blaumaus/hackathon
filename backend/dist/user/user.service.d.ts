import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RefreshToken } from './entity/refresh-token.entity';
export declare class UserService {
    private usersRepository;
    private refreshTokenRepository;
    constructor(usersRepository: Repository<User>, refreshTokenRepository: Repository<RefreshToken>);
    findUser(nickname: string): Promise<User | undefined>;
    createUser(user: Pick<User, 'password' | 'nickname'>): Promise<{
        password: string;
        nickname: string;
    } & User>;
    saveRefreshToken(userId: string, refreshToken: string): Promise<{
        userId: string;
        refreshToken: string;
    } & RefreshToken>;
    findUserById(userId: string): Promise<User>;
    findRefreshToken(userId: string, refreshToken: string): Promise<RefreshToken>;
    findOneWhere(where: Record<string, unknown>): Promise<User>;
    findAll(): Promise<User[]>;
    updateUser(id: string, data: Partial<User>): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: string): Promise<import("typeorm").DeleteResult>;
}
