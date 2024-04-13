"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshTokenGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JwtRefreshTokenGuard extends (0, passport_1.AuthGuard)('jwt-refresh-token') {
}
exports.JwtRefreshTokenGuard = JwtRefreshTokenGuard;
//# sourceMappingURL=jwt-refresh-token.guard.js.map