import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import { createContext } from 'react';

export interface LayoutContextState {
    desktopLayout: ContentBlockType[];
    tabletLayout: ContentBlockType[];
    mobileLayout: ContentBlockType[];
    currentLayout: Layout;
    selectLayout: (layout: Layout) => void;
}

export const LayoutContext = createContext<LayoutContextState>({
    desktopLayout: [],
    tabletLayout: [],
    mobileLayout: [],
    currentLayout: Layout.DESKTOP,
    selectLayout: () => {}
});
