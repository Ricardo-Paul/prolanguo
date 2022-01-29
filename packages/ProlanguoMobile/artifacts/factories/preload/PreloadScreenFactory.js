"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadScreenFactory = void 0;
const PreloadScreenDelegate_1 = require("../../delegates/preload/PreloadScreenDelegate");
const ScreenFactory_1 = require("../ScreenFactory");
class PreloadScreenFactory extends ScreenFactory_1.ScreenFactory {
    createScreenDelegate(observableScreen) {
        const navigatorDelegate = this.createNavigatorDelegate();
        return new PreloadScreenDelegate_1.PreloadScreenDelegate(navigatorDelegate, this.eventBus, observableScreen);
    }
}
exports.PreloadScreenFactory = PreloadScreenFactory;
;
