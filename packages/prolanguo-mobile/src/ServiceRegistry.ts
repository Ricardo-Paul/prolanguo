import { Services } from "./interfaces/Services"

export class ServiceRegistry{
    private static registry: Services;

    public static registerAll(services: Services): void{
        ServiceRegistry.registry = services;
    }

    public static get services(): Services{
        return ServiceRegistry.registry
    }
}