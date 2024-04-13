"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTokensModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const action_tokens_service_1 = require("./action-tokens.service");
const action_token_entity_1 = require("./action-token.entity");
let ActionTokensModule = class ActionTokensModule {
};
ActionTokensModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([action_token_entity_1.ActionToken])],
        providers: [action_tokens_service_1.ActionTokensService],
        exports: [action_tokens_service_1.ActionTokensService],
    })
], ActionTokensModule);
exports.ActionTokensModule = ActionTokensModule;
//# sourceMappingURL=action-tokens.module.js.map