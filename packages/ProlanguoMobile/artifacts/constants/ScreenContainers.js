"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenContainers = void 0;
const SignUpScreenContainer_1 = require("../views/auth/SignUpScreenContainer");
const PreloadScreenContainer_1 = require("../views/preload/PreloadScreenContainer");
const WelcomeScreenContainer_1 = require("../views/welcome/WelcomeScreenContainer");
exports.ScreenContainers = {
    SIGN_UP_SCREEN: SignUpScreenContainer_1.SignUpScreenContainer,
    WELCOME_SCREEN: WelcomeScreenContainer_1.WelcomeScreenContainer,
    PRELOAD_SCREEN: PreloadScreenContainer_1.PreloadScreenContainer
};
