import { ActionToken } from '../../action-tokens/action-token.entity';
import { RefreshToken } from './refresh-token.entity';
export declare class User {
    id: string;
    password: string;
    actionTokens: ActionToken[];
    refreshTokens: RefreshToken[];
    nickname: string;
}
