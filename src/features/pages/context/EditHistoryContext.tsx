import React, { createContext, useCallback, useContext } from "react";

import { Layout } from "@/features/pages/constants/Layouts";
import { LayoutContext } from "@/features/pages/context/LayoutContext";
import { useUndoRedo } from "@/features/pages/hooks/useUndoRedo";
import { ContentBlockType } from "@/features/pages/types/ContentBlockType";

export interface EditHistoryContextState {
    undo: () => void;
    redo: () => void;
    isUndoCapacityEmpty: (layout: Layout) => boolean;
    isRedoCapacityEmpty: (layout: Layout) => boolean;
    updateBuffers: (snapshot: ContentBlockType[], layout: Layout) => void;
}

export const EditHistoryContext = createContext<EditHistoryContextState>({
    undo: () => {},
    redo: () => {},
    isUndoCapacityEmpty: () => true,
    isRedoCapacityEmpty: () => true,
    updateBuffers: () => {},
});

interface EditHistoryContextProviderProps {
    children: React.ReactNode;
}

export const EditHistoryContextProvider = (
    props: EditHistoryContextProviderProps,
) => {
    const UndoRedoDesktopManager = useUndoRedo();
    const UndoRedoTabletManager = useUndoRedo();
    const UndoRedoMobileManager = useUndoRedo();
    const layoutContext = useContext(LayoutContext);

    const undo = useCallback(() => {
        switch (layoutContext.currentLayout) {
            case Layout.DESKTOP:
                const prevStateDesktop = UndoRedoDesktopManager.undo(
                    layoutContext.getCurrentLayoutContent(),
                );
                layoutContext.updateDesktopLayout((p) => prevStateDesktop || p);
                break;
            case Layout.TABLET:
                const prevStateTablet = UndoRedoTabletManager.undo(
                    layoutContext.getCurrentLayoutContent(),
                );
                layoutContext.updateTabletLayout((p) => prevStateTablet || p);
                break;
            case Layout.MOBILE:
                const prevStateMobile = UndoRedoMobileManager.undo(
                    layoutContext.getCurrentLayoutContent(),
                );
                layoutContext.updateMobileLayout((p) => prevStateMobile || p);
                break;
        }
    }, [
        layoutContext.currentLayout,
        layoutContext.getCurrentLayoutContent,
        layoutContext.updateDesktopLayout,
        layoutContext.updateMobileLayout,
        layoutContext.updateTabletLayout,
    ]);

    const redo = useCallback(() => {
        switch (layoutContext.currentLayout) {
            case Layout.DESKTOP:
                const nextStateDesktop = UndoRedoDesktopManager.redo(
                    layoutContext.getCurrentLayoutContent(),
                );
                layoutContext.updateDesktopLayout((p) => nextStateDesktop || p);
                break;
            case Layout.TABLET:
                const nextStateTablet = UndoRedoTabletManager.redo(
                    layoutContext.getCurrentLayoutContent(),
                );
                layoutContext.updateTabletLayout((p) => nextStateTablet || p);
                break;
            case Layout.MOBILE:
                const nextStateMobile = UndoRedoMobileManager.redo(
                    layoutContext.getCurrentLayoutContent(),
                );
                layoutContext.updateMobileLayout((p) => nextStateMobile || p);
                break;
        }
    }, [
        layoutContext.currentLayout,
        layoutContext.getCurrentLayoutContent,
        layoutContext.updateDesktopLayout,
        layoutContext.updateMobileLayout,
        layoutContext.updateTabletLayout,
    ]);

    const isUndoCapacityEmpty = useCallback(
        (layout: Layout) => {
            switch (layout) {
                case Layout.DESKTOP:
                    return UndoRedoDesktopManager.undoBufferUsedCapacity === 0;
                case Layout.TABLET:
                    return UndoRedoTabletManager.undoBufferUsedCapacity === 0;
                case Layout.MOBILE:
                    return UndoRedoMobileManager.undoBufferUsedCapacity === 0;
            }
        },
        [
            UndoRedoDesktopManager.undoBufferUsedCapacity,
            UndoRedoTabletManager.undoBufferUsedCapacity,
            UndoRedoMobileManager.undoBufferUsedCapacity,
        ],
    );

    const isRedoCapacityEmpty = useCallback(
        (layout: Layout) => {
            switch (layout) {
                case Layout.DESKTOP:
                    return UndoRedoDesktopManager.redoBufferUsedCapacity === 0;
                case Layout.TABLET:
                    return UndoRedoTabletManager.redoBufferUsedCapacity === 0;
                case Layout.MOBILE:
                    return UndoRedoMobileManager.redoBufferUsedCapacity === 0;
            }
        },
        [
            UndoRedoDesktopManager.redoBufferUsedCapacity,
            UndoRedoTabletManager.redoBufferUsedCapacity,
            UndoRedoMobileManager.redoBufferUsedCapacity,
        ],
    );

    const updateBuffers = useCallback(
        (snapshot: ContentBlockType[], layout: Layout) => {
            switch (layout) {
                case Layout.DESKTOP:
                    UndoRedoDesktopManager.updateBuffers(snapshot);
                    break;
                case Layout.TABLET:
                    UndoRedoTabletManager.updateBuffers(snapshot);
                    break;
                case Layout.MOBILE:
                    UndoRedoMobileManager.updateBuffers(snapshot);
                    break;
            }
        },
        [
            UndoRedoDesktopManager.updateBuffers,
            UndoRedoTabletManager.updateBuffers,
            UndoRedoMobileManager.updateBuffers,
        ],
    );

    return (
        <EditHistoryContext.Provider
            value={{
                undo,
                redo,
                isUndoCapacityEmpty,
                isRedoCapacityEmpty,
                updateBuffers,
            }}
        >
            {props.children}
        </EditHistoryContext.Provider>
    );
};
