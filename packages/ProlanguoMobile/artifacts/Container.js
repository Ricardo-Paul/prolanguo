"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const react_1 = require("react");
const prolanguo_observable_1 = require("@prolanguo/prolanguo-observable");
;
class Container extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.observer = new prolanguo_observable_1.Observer();
        // access eventBusFactory through the Services interface
        this.eventBus = this.props.eventBusFactory.createBus();
    }
    onThemeChanged(__) { }
}
exports.Container = Container;
