import {containerByEnv} from "../container/containerByEnv";
import {Type, Scope} from "../types";
import {adapter} from "./adapter";

export const transient = <T>(
    env: keyof typeof containerByEnv = 'production',
) =>
    (target: Type<T>): void => {
        adapter(target, Scope.Transient, env)(target)
    };