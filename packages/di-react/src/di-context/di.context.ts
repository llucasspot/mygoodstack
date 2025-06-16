import {ContainerI} from "@mygoodstack/di-core";
import {createContext, type Dispatch, type SetStateAction} from 'react';

type DIContextType = {
    container: ContainerI;
    setContainer: Dispatch<SetStateAction<ContainerI>>
}

export const DIContext = createContext<DIContextType | null>(null);
