import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import { createContext } from 'react';

export interface EditorContextState {
    moveContentBlock: (layout: Layout, id: string, x: number, y: number) => void;
    canMoveContentBlock: (layout: Layout, id: string, x: number, y: number, width?: number, height?: number) => boolean;
    resizeContentBlock: (layout: Layout, id: string, width: number, height: number) => void;
    addContentBlock: (layout: Layout, contentBlock: ContentBlockType) => void;
    removeContentBlock: (layout: Layout, id: string) => void;
    rowCount: number;
    updateRowCount: (rowCount: number) => void;
    color: string;
    updateColor: (color: string) => void;
}

export const EditorContext = createContext<EditorContextState>({
    moveContentBlock: () => {},
    canMoveContentBlock: () => false,
    resizeContentBlock: () => {},
    addContentBlock: () => {},
    removeContentBlock: () => {},
    rowCount: GridConstants.COLUMNS,
    updateRowCount: () => {},
    color: '#ffffff',
    updateColor: () => {}
});
