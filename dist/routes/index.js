"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = __importDefault(require("./authenticate"));
const products_1 = __importDefault(require("./products"));
const invoices_1 = __importDefault(require("./invoices"));
function RouterConfig(app) {
    app.use('/v1/authenticate', authenticate_1.default);
    app.use('/v1/products', products_1.default);
    app.use('/v1/invoices', invoices_1.default);
}
exports.default = RouterConfig;
//# sourceMappingURL=index.js.map