"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRegistry = void 0;
class ServiceRegistry {
    static registerAll(services) {
        ServiceRegistry.registry = services;
    }
    static get services() {
        return ServiceRegistry.registry;
    }
}
exports.ServiceRegistry = ServiceRegistry;
