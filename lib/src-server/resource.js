"use strict";
var tslib_1 = require("tslib");
var resource_1 = require("@told/azure-functions-server/lib/src-server/resource");
function main(context, request) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resource_1.main(context, request)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=resource.js.map