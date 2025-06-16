import type {Token} from "@mygoodstack/di-core";
import {useDI} from "./use-di.hook";

export function useInstance<T>(token: Token<T>) {
    const {container} = useDI()
    return container.resolve(token)
}
