import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import { createContext } from 'react';

export interface LayoutContextState {
    desktopLayout: ContentBlockType[];
    tabletLayout: ContentBlockType[];
    mobileLayout: ContentBlockType[];
    currentLayout: Layout;
    selectLayout: (layout: Layout) => void;
    currentMinRows: number;
    updateMinRows: (minRows: number) => void;
}

export const LayoutContext = createContext<LayoutContextState>({
    desktopLayout: [],
    tabletLayout: [],
    mobileLayout: [],
    currentLayout: Layout.DESKTOP,
    selectLayout: () => {},
    currentMinRows: GridConstants.COLUMNS,
    updateMinRows: () => {},
});
