"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserId = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUserId = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    return user && (user.sub || user.id) ? user.sub || user.id : null;
});
//# sourceMappingURL=current-user-id.decorator.js.map