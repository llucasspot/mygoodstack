import {
    container as tsyringeContainer,
    type DependencyContainer,
    Lifecycle,
    inject as tsyringeInject,
    injectable as tsyringeInjectable,
    Provider, isClassProvider
} from "tsyringe";
import {Token, Type, Scope} from "../types";
import {ContainerI} from "./ContainerI";

type Container = DependencyContainer & {
    parent: DependencyContainer,
    _registry: {
        _registryMap: Map<string, [{ provider: Provider }]>
    }
};

export class TsyringeContainer implements ContainerI {
    private container: DependencyContainer;

    private scopeMapping = {
        [Scope.Singleton]: Lifecycle.Singleton,
        [Scope.Transient]: Lifecycle.Transient,
        [Scope.ResolutionScoped]: Lifecycle.ResolutionScoped,
        [Scope.ContainerScoped]: Lifecycle.ContainerScoped,
    } as const;

    private constructor(container: DependencyContainer) {
        this.container = container as Container;
    }

    static consoleLog(container: DependencyContainer) {
        const _container = container as Container
        if (_container.parent) {
            this.consoleLog(_container.parent)
        }
        const registryMap = _container._registry._registryMap
        if (registryMap.size === 0) {
            return;
        }
        // @ts-ignore
        const entries = Array.from(registryMap).map(([key, value]: [string, [{ provider: Provider }]], index) => {
            const token = key;
            const provider = value[0]?.provider
            if (isClassProvider(provider)) {
                // @ts-ignore
                const useClass: string = provider.useClass.name
                return [
                    index,
                    {
                        token,
                        useClass,
                    },
                ];
            }
            return [
                index,
                {
                    token,
                },
            ];
        });
        console.table(Object.fromEntries(entries));
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

    consoleLog() {
        console.log('\n')
        console.log('--------------------------------')
        console.log('----- @mygoodstack/di-core -----')
        console.log('----- services injected --------')
        console.log('--------------------------------')
        TsyringeContainer.consoleLog(this.container)
        console.log('\n')
    }
}
