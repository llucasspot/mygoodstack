import {containerByEnv} from "../container/containerByEnv";
import {ContainerI} from "../container/ContainerI";
import type {Token, Type} from "../types";
import {injectable} from "./injectable";

export const adapter = <T>(
    port: Token<T>,
    env: keyof typeof containerByEnv = 'production',
) =>
    (target: Type<T>): void => {
        const _port = ContainerI.getToken(port);
        const _target = ContainerI.getToken(target);
        console.log(`register ${_port} with provider ${_target} for ${env} environment`);

        const container = containerByEnv[env]
        injectable()(target);
        container.register(port, target)
    };