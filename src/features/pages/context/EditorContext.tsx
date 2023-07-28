import React, { createContext } from "react";

import { useContentBlockManager } from "@/features/pages/hooks/useContentBlockManager";
import { ContentBlockType } from "@/features/pages/types/ContentBlockType";

export interface EditorContextState {
    moveContentBlock: (id: string, x: number, y: number) => void;
    canMoveContentBlock: (
        id: string,
        x: number,
        y: number,
        width?: number,
        height?: number,
    ) => boolean;
    resizeContentBlock: (id: string, width: number, height: number) => void;
    addContentBlock: (contentBlock: ContentBlockType) => void;
    removeContentBlock: (id: string) => void;
}

export const EditorContext = createContext<EditorContextState>({
    moveContentBlock: () => {},
    canMoveContentBlock: () => false,
    resizeContentBlock: () => {},
    addContentBlock: () => {},
    removeContentBlock: () => {},
});

interface EditorContextProviderProps {
    children: React.ReactNode;
}

export const EditorContextProvider = ({
    children,
}: EditorContextProviderProps) => {
    const ContentBlockManager = useContentBlockManager();

    return (
        <EditorContext.Provider
            value={{
                moveContentBlock: ContentBlockManager.moveContentBlock,
                canMoveContentBlock: ContentBlockManager.canMoveContentBlock,
                resizeContentBlock: ContentBlockManager.resizeContentBlock,
                addContentBlock: ContentBlockManager.addContentBlock,
                removeContentBlock: ContentBlockManager.removeContentBlock,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};
