"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenFactory = void 0;
const NavigatorDelegate_1 = require("../delegates/navigator/NavigatorDelegate");
class ScreenFactory {
    constructor(props, eventBus) {
        this.props = props;
        this.eventBus = eventBus;
    }
    createNavigatorDelegate() {
        return new NavigatorDelegate_1.NavigatorDelegate(this.props.componentId);
    }
}
exports.ScreenFactory = ScreenFactory;
