import {Token} from "@mygoodstack/di-core";
import {computed} from "vue";
import {useDI} from "./use-di.hook";

export function useInstance<T>(token: Token<T>) {
    const {container} = useDI();
    return computed(() => container.value.resolve(token));
}
