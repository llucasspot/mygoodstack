import { Abstract } from './abstract';
import { Type } from './type';

export type Token<T = any> = Abstract<T> | string | Type<T>;
