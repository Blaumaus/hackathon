import { Timestamp } from 'typeorm';
import { User } from '../user/entity/user.entity';
export declare enum ActionTokenType {
    EMAIL_VERIFICATION = 0,
    PASSWORD_RESET = 1,
    EMAIL_CHANGE = 2,
    PROJECT_SHARE = 3,
    ADDING_PROJECT_SUBSCRIBER = 4,
    TRANSFER_PROJECT = 5
}
export declare class ActionToken {
    id: string;
    user: User;
    created: Timestamp;
    newValue: string;
    action: ActionTokenType;
}
