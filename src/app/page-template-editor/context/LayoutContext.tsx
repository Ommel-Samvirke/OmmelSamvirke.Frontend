import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { useLayout } from '@/app/page-template-editor/hooks/useLayout';
import { useLayoutState } from '@/app/page-template-editor/hooks/UseLayoutState';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import React, { createContext, useCallback } from 'react';

export interface LayoutContextState {
    desktopLayout: ContentBlockType[];
    updateDesktopLayout: (updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => void;
    tabletLayout: ContentBlockType[];
    updateTabletLayout: (updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => void;
    mobileLayout: ContentBlockType[];
    updateMobileLayout: (updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => void;
    currentLayout: Layout;
    getCurrentLayoutContent: () => ContentBlockType[];
    updateCurrentLayoutContent: (updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => void;
    selectLayout: (layout: Layout) => void;
    currentMinRows: number;
    getRowCount: () => number;
    updateMinRows: (minRows: number) => void;
    updateRowCount: (rowCount: number) => void;
    color: string;
    updateColor: (color: string) => void;
}

export const LayoutContext = createContext<LayoutContextState>({
    desktopLayout: [],
    updateDesktopLayout: () => [],
    tabletLayout: [],
    updateTabletLayout: () => [],
    mobileLayout: [],
    updateMobileLayout: () => [],
    currentLayout: Layout.DESKTOP,
    getCurrentLayoutContent: () => [],
    updateCurrentLayoutContent: () => [],
    selectLayout: () => {},
    currentMinRows: GridConstants.COLUMNS,
    getRowCount: () => GridConstants.COLUMNS,
    updateMinRows: () => {},
    updateRowCount: () => {},
    color: '#ffffff',
    updateColor: () => {},
});

interface LayoutContextProviderProps {
    children: React.ReactNode;
}

export const LayoutContextProvider = (props: LayoutContextProviderProps) => {
    const LayoutManager = useLayout(Layout.DESKTOP);
    const DesktopLayoutManager = useLayoutState();
    const TabletLayoutManager = useLayoutState();
    const MobileLayoutManager = useLayoutState();
    
    const getRowCount = useCallback(() => {
        switch (LayoutManager.layout) {
            case Layout.DESKTOP:
                return DesktopLayoutManager.rowCount;
            case Layout.TABLET:
                return TabletLayoutManager.rowCount;
            case Layout.MOBILE:
                return MobileLayoutManager.rowCount;
        }
    }, [
        DesktopLayoutManager.rowCount,
        TabletLayoutManager.rowCount,
        MobileLayoutManager.rowCount,
    ]);
    
    const updateRowCount = useCallback((rowCount: number) => {
        switch (LayoutManager.layout) {
            case Layout.DESKTOP:
                DesktopLayoutManager.updateRowCount(rowCount);
                break;
            case Layout.TABLET:
                TabletLayoutManager.updateRowCount(rowCount);
                break;
            case Layout.MOBILE:
                MobileLayoutManager.updateRowCount(rowCount);
                break;
        }
    }, [
        LayoutManager.layout,
        DesktopLayoutManager.updateRowCount,
        TabletLayoutManager.updateRowCount,
        MobileLayoutManager.updateRowCount,
    ]);
    
    const getCurrentLayoutContent = useCallback(() => {
        switch (LayoutManager.layout) {
            case Layout.DESKTOP:
                return DesktopLayoutManager.content;
            case Layout.TABLET:
                return TabletLayoutManager.content;
            case Layout.MOBILE:
                return MobileLayoutManager.content;
        }
    }, [
        LayoutManager.layout,
        DesktopLayoutManager.content,
        TabletLayoutManager.content,
        MobileLayoutManager.content,
    ]);

    const updateCurrentLayoutContent = useCallback((updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => {
        switch (LayoutManager.layout) {
            case Layout.DESKTOP:
                return DesktopLayoutManager.updateContent(updateFn);
            case Layout.TABLET:
                return TabletLayoutManager.updateContent(updateFn);
            case Layout.MOBILE:
                return MobileLayoutManager.updateContent(updateFn);
        }
    }, [
        LayoutManager.layout,
        DesktopLayoutManager.updateContent,
        TabletLayoutManager.updateContent,
        MobileLayoutManager.updateContent,
    ]);

    return (
        <LayoutContext.Provider value={{
            desktopLayout: DesktopLayoutManager.content,
            updateDesktopLayout: DesktopLayoutManager.updateContent,
            tabletLayout: TabletLayoutManager.content,
            updateTabletLayout: TabletLayoutManager.updateContent,
            mobileLayout: MobileLayoutManager.content,
            updateMobileLayout: MobileLayoutManager.updateContent,
            currentLayout: LayoutManager.layout,
            getCurrentLayoutContent: getCurrentLayoutContent,
            updateCurrentLayoutContent: updateCurrentLayoutContent,
            selectLayout: LayoutManager.updateLayout,
            currentMinRows: LayoutManager.minRows,
            getRowCount: getRowCount,
            updateMinRows: LayoutManager.updateMinRows,
            updateRowCount: updateRowCount,
            color: LayoutManager.color,
            updateColor: LayoutManager.updateColor,
        }}>
            {props.children}
        </LayoutContext.Provider>
    )
};
