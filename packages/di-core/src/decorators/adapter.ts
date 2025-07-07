import {containerByEnv} from "../container/containerByEnv";
import {Scope, Token, Type} from "../types";
import {injectable} from "./injectable";

export const adapter = <T>(
    port: Token<T>,
    scope: Scope = Scope.Singleton,
    env: keyof typeof containerByEnv = 'production',
) =>
    (target: Type<T>): void => {
        const container = containerByEnv[env]
        injectable()(target);
        container.register(port, target, scope)
    };