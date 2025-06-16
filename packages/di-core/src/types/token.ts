import type { Abstract } from './abstract';
import type { Type } from './type';

export type Token<T = any> = Abstract<T> | string | Type<T>;
