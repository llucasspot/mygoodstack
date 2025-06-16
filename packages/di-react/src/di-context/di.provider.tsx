import {ContainerI} from "@mygoodstack/di-core";
import {type PropsWithChildren, useState} from "react";
import {DIContext} from "./di.context";

export function DIProvider({children, container: initContainer}: PropsWithChildren<{
    container: ContainerI
}>) {
    const [container, setContainer] = useState<ContainerI>(initContainer)
    return (
        <DIContext.Provider value={{container, setContainer}}>
            {children}
        </DIContext.Provider>
    );
}
