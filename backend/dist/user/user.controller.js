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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const decorators_1 = require("../auth/decorators");
const common_2 = require("@nestjs/common");
const jwt_access_token_guard_1 = require("../auth/guards/jwt-access-token.guard");
const auth_service_1 = require("../auth/auth.service");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async me(user_id) {
        if (!user_id) {
            return null;
        }
        const user = await this.userService.findOneWhere({ id: user_id });
        return user;
    }
    async update(user_id, data) {
        const user = await this.userService.findOneWhere({ id: user_id });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (!data.id) {
            throw new common_1.BadRequestException('User id is required');
        }
        const modifedData = {
            nickname: data.nickname,
        };
        if (data.password) {
            modifedData.password = await this.authService.hashPassword(data.password);
        }
        await this.userService.updateUser(data.id, modifedData);
        return this.userService.findAll();
    }
    async delete(user_id) {
        const user = await this.userService.findOneWhere({ id: user_id });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.userService.deleteUser(user.id);
        return this.userService.findAll();
    }
};
__decorate([
    (0, common_1.Get)('/me'),
    (0, common_2.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, decorators_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, common_2.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, decorators_1.CurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/delete'),
    (0, common_2.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, decorators_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_2.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map