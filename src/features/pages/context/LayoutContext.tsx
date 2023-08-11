import React, { createContext, useCallback } from 'react';

import { GridConstants } from '@/features/pages/constants/GridConstants';
import { Layout } from '@/features/pages/enums/Layouts';
import { useLayout } from '@/features/pages/hooks/useLayout';
import { useLayoutState } from '@/features/pages/hooks/useLayoutState';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

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
    getRowCount: () => number;
    incrementRowCount: () => void;
    decrementRowCount: () => void;
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
    getRowCount: () => GridConstants.COLUMNS,
    incrementRowCount: () => {},
    decrementRowCount: () => {},
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

        return 0;
    }, [
        DesktopLayoutManager.rowCount,
        LayoutManager.layout,
        MobileLayoutManager.rowCount,
        TabletLayoutManager.rowCount,
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

        return [];
    }, [LayoutManager.layout, DesktopLayoutManager.content, TabletLayoutManager.content, MobileLayoutManager.content]);

    const updateCurrentLayoutContent = useCallback(
        (updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => {
            switch (LayoutManager.layout) {
                case Layout.DESKTOP:
                    return DesktopLayoutManager.updateContent(updateFn);
                case Layout.TABLET:
                    return TabletLayoutManager.updateContent(updateFn);
                case Layout.MOBILE:
                    return MobileLayoutManager.updateContent(updateFn);
            }
        },
        [LayoutManager.layout, DesktopLayoutManager, TabletLayoutManager, MobileLayoutManager],
    );

    const incrementRowCount = useCallback(() => {
        switch (LayoutManager.layout) {
            case Layout.DESKTOP:
                DesktopLayoutManager.incrementRowCount();
                break;
            case Layout.TABLET:
                TabletLayoutManager.incrementRowCount();
                break;
            case Layout.MOBILE:
                MobileLayoutManager.incrementRowCount();
                break;
        }
    }, [LayoutManager.layout, DesktopLayoutManager, TabletLayoutManager, MobileLayoutManager]);

    const decrementRowCount = useCallback(() => {
        switch (LayoutManager.layout) {
            case Layout.DESKTOP:
                DesktopLayoutManager.decrementRowCount();
                break;
            case Layout.TABLET:
                TabletLayoutManager.decrementRowCount();
                break;
            case Layout.MOBILE:
                MobileLayoutManager.decrementRowCount();
                break;
        }
    }, [LayoutManager.layout, DesktopLayoutManager, TabletLayoutManager, MobileLayoutManager]);

    return (
        <LayoutContext.Provider
            value={{
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
                getRowCount: getRowCount,
                incrementRowCount,
                decrementRowCount,
                color: LayoutManager.color,
                updateColor: LayoutManager.updateColor,
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
};
