"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = exports.ActionTokenType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/entity/user.entity");
var ActionTokenType;
(function (ActionTokenType) {
    ActionTokenType[ActionTokenType["EMAIL_VERIFICATION"] = 0] = "EMAIL_VERIFICATION";
    ActionTokenType[ActionTokenType["PASSWORD_RESET"] = 1] = "PASSWORD_RESET";
    ActionTokenType[ActionTokenType["EMAIL_CHANGE"] = 2] = "EMAIL_CHANGE";
    ActionTokenType[ActionTokenType["PROJECT_SHARE"] = 3] = "PROJECT_SHARE";
    ActionTokenType[ActionTokenType["ADDING_PROJECT_SUBSCRIBER"] = 4] = "ADDING_PROJECT_SUBSCRIBER";
    ActionTokenType[ActionTokenType["TRANSFER_PROJECT"] = 5] = "TRANSFER_PROJECT";
})(ActionTokenType = exports.ActionTokenType || (exports.ActionTokenType = {}));
let ActionToken = class ActionToken {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ActionToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.actionTokens, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], ActionToken.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], ActionToken.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254, default: null }),
    __metadata("design:type", String)
], ActionToken.prototype, "newValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ActionTokenType,
    }),
    __metadata("design:type", Number)
], ActionToken.prototype, "action", void 0);
ActionToken = __decorate([
    (0, typeorm_1.Entity)()
], ActionToken);
exports.ActionToken = ActionToken;
//# sourceMappingURL=action-token.entity.js.map