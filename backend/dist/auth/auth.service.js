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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const action_tokens_service_1 = require("../action-tokens/action-tokens.service");
const action_token_entity_1 = require("../action-tokens/action-token.entity");
let AuthService = class AuthService {
    constructor(userService, jwtService, actionTokensService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.actionTokensService = actionTokensService;
    }
    async generateJwtAccessToken(userId) {
        return this.jwtService.signAsync({
            sub: userId,
        }, {
            algorithm: 'HS256',
            expiresIn: '7d',
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }
    async generateJwtRefreshToken(userId) {
        const refreshToken = await this.jwtService.signAsync({
            sub: userId,
        }, {
            algorithm: 'HS256',
            expiresIn: '30d',
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        });
        await this.userService.saveRefreshToken(userId, refreshToken);
        return refreshToken;
    }
    async generateJwtTokens(userId) {
        const accessToken = await this.generateJwtAccessToken(userId);
        let refreshToken = 'NOT_AVAILABLE';
        refreshToken = await this.generateJwtRefreshToken(userId);
        return { accessToken, refreshToken };
    }
    async comparePassword(password, hashedPassword) {
        return (0, bcrypt_1.compare)(password, hashedPassword);
    }
    async validateUser(nickname, password) {
        const user = await this.userService.findUser(nickname);
        if (user && (await this.comparePassword(password, user.password))) {
            return user;
        }
        return null;
    }
    async checkVerificationToken(token) {
        const actionToken = await this.actionTokensService.findActionToken(token);
        if (actionToken &&
            actionToken.action === action_token_entity_1.ActionTokenType.EMAIL_VERIFICATION) {
            return actionToken;
        }
        return null;
    }
    async hashPassword(password) {
        const salt = await (0, bcrypt_1.genSalt)(10);
        return (0, bcrypt_1.hash)(password, salt);
    }
    async createUnverifiedUser(password, nickname) {
        const hashedPassword = await this.hashPassword(password);
        const user = await this.userService.createUser({
            password: hashedPassword,
            nickname,
        });
        return user;
    }
    async checkRefreshToken(userId, refreshToken) {
        const token = await this.userService.findRefreshToken(userId, refreshToken);
        return Boolean(token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        action_tokens_service_1.ActionTokensService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map