import {
    BindInWhenOnFluentSyntax,
    Container,
    inject as inversifyInject,
    injectable as inversifyInjectable
} from "inversify";
import {Token, Type, Scope} from "../types";
import {ContainerI} from "./ContainerI";

export class InversifyContainer implements ContainerI {
    private container;

    private scopeMapping = {
        [Scope.Singleton]: <T>(binding: BindInWhenOnFluentSyntax<T>) => binding.inSingletonScope(),
        [Scope.Transient]: <T>(binding: BindInWhenOnFluentSyntax<T>) => binding.inTransientScope(),
        [Scope.ResolutionScoped]: <T>(binding: BindInWhenOnFluentSyntax<T>) => binding.inRequestScope(),
        [Scope.ContainerScoped]: <T>(binding: BindInWhenOnFluentSyntax<T>) => {
            throw new Error('ContainerScoped not supported')
        },
    } as const;

    constructor(container: Container) {
        this.container = container;
    }

    static create() {
        return new InversifyContainer(new Container());
    }

    createChildContainer(): ContainerI {
        return new InversifyContainer(new Container({parent: this.container}));
    }

    register<T>(token: Token<T>, provider: Type<T>, scope: Scope): void {
        const _token = ContainerI.getToken(token);
        const binding = this.container.bind<T>(_token).to(provider);
        this.scopeMapping[scope](binding);
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