import {container as tsyringeContainer, type DependencyContainer, Lifecycle, inject as tsyringeInject, injectable as tsyringeInjectable} from "tsyringe";
import {Token, Type, Scope} from "../types";
import {ContainerI} from "./ContainerI";

export class TsyringeContainer implements ContainerI {
    private container: DependencyContainer;

    private scopeMapping = {
        [Scope.Singleton]: Lifecycle.Singleton,
        [Scope.Transient]: Lifecycle.Transient,
        [Scope.ResolutionScoped]: Lifecycle.ResolutionScoped,
        [Scope.ContainerScoped]: Lifecycle.ContainerScoped,
    } as const;

    private constructor(container: DependencyContainer) {
        this.container = container;
    }

    static create() {
        return new TsyringeContainer(tsyringeContainer);
    }

    createChildContainer(): ContainerI {
        return new TsyringeContainer(this.container.createChildContainer());
    }

    register<T>(token: Token<T>, provider: Type<T>, scope: Scope): void {
        const _token = ContainerI.getToken(token);
        this.container.register(_token, {useClass: provider}, {lifecycle: this.scopeMapping[scope]});
    }

    resolve<T>(token: Token<T>): T {
        const _token = ContainerI.getToken(token);
        return this.container.resolve(_token);
    }

    inject<T>(token: Token<T>): ParameterDecorator {
        const _token = ContainerI.getToken(token);
        return function (target, propertyKey, parameterIndex) {
            tsyringeInject(_token)(target, propertyKey, parameterIndex);
        };
    }

    injectable(): ClassDecorator {
        return function (target: any) {
            tsyringeInjectable()(target);
        };
    }
}
