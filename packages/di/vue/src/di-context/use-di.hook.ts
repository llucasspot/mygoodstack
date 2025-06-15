import {ContainerI} from "@mygoodstack/di-core";
import {inject, type Ref} from "vue";
import {diContainerKey} from "./di-container-key";

export type DIContextType = {
    container: Ref<ContainerI>;
    setContainer: (container: ContainerI) => void
}

export function useDI() {
    const context = inject<DIContextType>(diContainerKey)
    if (!context) {
        throw new Error('useDI must be used within a DIProvider');
    }
    return context;
}
