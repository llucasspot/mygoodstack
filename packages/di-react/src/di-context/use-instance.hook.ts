import {Token} from "@mygoodstack/di-core";
import {useMemo} from "react";
import {useDI} from "./use-di.hook";

export function useInstance<T>(token: Token<T>) {
    const {container} = useDI()
    return useMemo(() => {
        return container.resolve(token)
    }, [container])
}
