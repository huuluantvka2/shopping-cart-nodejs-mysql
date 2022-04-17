"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../controllers/authenticate");
const router = (0, express_1.Router)();
router.route('/signup').post(authenticate_1.registerController);
router.route('/signin').post(authenticate_1.loginController);
exports.default = router;
//# sourceMappingURL=authenticate.js.map