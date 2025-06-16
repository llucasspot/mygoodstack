import {Container, inject as inversifyInject, injectable as inversifyInjectable} from "inversify";
import type {Token, Type} from "../types";
import {ContainerI} from "./ContainerI";

export class InversifyContainer implements ContainerI {
    private container;

    constructor(container: Container) {
        this.container = container;
    }

    static create() {
        return new InversifyContainer(new Container());
    }

    createChildContainer(): ContainerI {
        return new InversifyContainer(new Container({parent: this.container}));
    }

    register<T>(token: Token<T>, provider: Type<T>): void {
        const _token = ContainerI.getToken(token);
        this.container.bind<T>(_token).to(provider).inSingletonScope();
    }

    resolve<T>(token: Token<T>): T {
        const _token = ContainerI.getToken(token);
        return this.container.get<T>(_token);
    }

    inject<T>(token: Token<T>): ParameterDecorator {
        return function (target, propertyKey, parameterIndex) {
            const _token = ContainerI.getToken(token);
            inversifyInject(_token)(target, propertyKey, parameterIndex);
        };
    }

    injectable(): ClassDecorator {
        return function (target: any) {
            inversifyInjectable()(target);
        };
    }
}