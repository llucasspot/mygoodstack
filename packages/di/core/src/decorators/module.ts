import {Type} from "../types";

const isInLineProvider = (
    provider: Type,
): provider is Type => {
    // @ts-expect-error isInLineProvider
    return !provider.token;
}
export const Module = <T>({
                              providers = [],
                          }: {
    providers?: Type[]
}) =>
    (target: Type<T>): void => {
        providers.forEach((provider) => {
            if (isInLineProvider(provider)) {
                return;
            }
        })
        console.log(`module ${target.name} registry ended`);
    }