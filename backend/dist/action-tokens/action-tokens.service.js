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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTokensService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const action_token_entity_1 = require("./action-token.entity");
let ActionTokensService = class ActionTokensService {
    constructor(actionTokensRepository) {
        this.actionTokensRepository = actionTokensRepository;
    }
    async deleteMultiple(where) {
        return this.actionTokensRepository
            .createQueryBuilder()
            .delete()
            .where(where)
            .execute();
    }
    async createForUser(user, action, newValue = null) {
        return this.actionTokensRepository.save({ user, action, newValue });
    }
    async find(id) {
        return this.actionTokensRepository.findOneOrFail({
            where: { id },
            relations: ['user'],
        });
    }
    async delete(id) {
        await this.actionTokensRepository.delete(id);
    }
    async createActionToken(userId, action, newValue) {
        return this.actionTokensRepository.save({
            user: { id: userId },
            action,
            newValue,
        });
    }
    async findActionToken(token) {
        return this.actionTokensRepository.findOne({
            where: {
                id: token,
            },
            relations: ['user'],
        });
    }
    async deleteActionToken(token) {
        await this.actionTokensRepository.delete(token);
    }
    async getActionToken(token) {
        return this.actionTokensRepository.findOne({
            where: {
                id: token,
            },
            relations: ['user'],
        });
    }
};
ActionTokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(action_token_entity_1.ActionToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActionTokensService);
exports.ActionTokensService = ActionTokensService;
//# sourceMappingURL=action-tokens.service.js.map