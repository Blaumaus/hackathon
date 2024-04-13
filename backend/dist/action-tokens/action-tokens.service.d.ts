import { Repository } from 'typeorm';
import { ActionToken, ActionTokenType } from './action-token.entity';
import { User } from '../user/entity/user.entity';
export declare class ActionTokensService {
    private actionTokensRepository;
    constructor(actionTokensRepository: Repository<ActionToken>);
    deleteMultiple(where: string): Promise<any>;
    createForUser(user: User, action: ActionTokenType, newValue?: string): Promise<ActionToken>;
    find(id: string): Promise<ActionToken>;
    delete(id: string): Promise<void>;
    createActionToken(userId: string, action: ActionTokenType, newValue?: string): Promise<{
        user: {
            id: string;
        };
        action: ActionTokenType;
        newValue: string;
    } & ActionToken>;
    findActionToken(token: string): Promise<ActionToken>;
    deleteActionToken(token: string): Promise<void>;
    getActionToken(token: string): Promise<ActionToken>;
}
