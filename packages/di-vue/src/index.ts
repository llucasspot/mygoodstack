import {App} from "vue";

import DIProvider from './di-context/di.provider.vue'
export {useDI} from './di-context/use-di.hook'
export {useInstance} from './di-context/use-instance.hook'
export {DIProvider}

export * from '@mygoodstack/di-core'

export default {
    install(app: App<Element>) {
        app.component('DIProvider', DIProvider);
    },
};
