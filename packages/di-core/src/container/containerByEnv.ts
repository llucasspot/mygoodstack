import {container} from "./index";

const production = container.createChildContainer();
const development = production.createChildContainer();
const mock = development.createChildContainer();
export const containerByEnv = {
    production,
    development,
    mock,
} as const