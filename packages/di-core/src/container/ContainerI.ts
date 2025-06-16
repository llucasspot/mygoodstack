import type {Token, Type} from "../types";

export abstract class ContainerI {

    static getToken<T>(token: Token<T>) {
        if (typeof token === 'string') {
            return token;
        }
        return token.name;
    }

    abstract createChildContainer(): ContainerI

    abstract register<T>(token: Token<T>, provider: Type<T>): void;

    abstract resolve<T>(token: Token<T>): T;

    abstract inject<T>(token: Token<T>): ParameterDecorator

    abstract injectable(): ClassDecorator
}
