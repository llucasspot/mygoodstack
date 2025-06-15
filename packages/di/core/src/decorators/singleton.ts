import {containerByEnv} from "../container/containerByEnv";
import type {Type} from "../types";
import {adapter} from "./adapter";

export const singleton = <T>(
    env: keyof typeof containerByEnv = 'production',
) =>
    (target: Type<T>): void => {
        adapter(target, env)(target)
    };