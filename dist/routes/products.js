"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const router = (0, express_1.Router)();
router.route('/').get(productsController_1.getAllProduct);
exports.default = router;
//# sourceMappingURL=products.js.map