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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const common_2 = require("@nestjs/common");
const jwt_refresh_token_guard_1 = require("./guards/jwt-refresh-token.guard");
const decorators_1 = require("./decorators");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async register(body) {
        const user = await this.userService.findUser(body.nickname);
        if (user) {
            throw new common_1.ConflictException('User already exists');
        }
        if (body.nickname === body.password) {
            throw new common_1.ConflictException('Password should not be the same as nickname');
        }
        const newUser = await this.authService.createUnverifiedUser(body.nickname, body.password);
        const jwtTokens = await this.authService.generateJwtTokens(newUser.id);
        return Object.assign(Object.assign({}, jwtTokens), { user: newUser });
    }
    async login(body) {
        const user = await this.authService.validateUser(body.nickname, body.password);
        if (!user) {
            throw new common_1.ConflictException('Invalid credentials');
        }
        const jwtTokens = await this.authService.generateJwtTokens(user.id);
        return Object.assign(Object.assign({}, jwtTokens), { user: user });
    }
    async refreshToken(userId, refreshToken) {
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const isRefreshTokenValid = await this.authService.checkRefreshToken(user.id, refreshToken);
        if (!isRefreshTokenValid) {
            throw new common_1.ConflictException('Invalid refresh token');
        }
        const accessToken = await this.authService.generateJwtAccessToken(user.id);
        return { accessToken };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_2.UseGuards)(jwt_refresh_token_guard_1.JwtRefreshTokenGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorators_1.CurrentUserId)()),
    __param(1, (0, decorators_1.CurrentUser)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map