﻿import {createContext} from 'react';
import IContentBlock from '@/app/page-template-editor/interfaces/IContentBlock';

export interface GridContextState {
    contentBlocks: IContentBlock[];
    moveContentBlock: (id: string, x: number, y: number) => void;
    canMoveContentBlock: (id: string, x: number, y: number, width?: number, height?: number) => boolean;
    resizeContentBlock: (id: string, width: number, height: number) => void;
    addContentBlock: (contentBlock: IContentBlock) => void;
    removeContentBlock: (id: string) => void;
}


export const GridContext = createContext<GridContextState>({
    contentBlocks: [],
    moveContentBlock: () => {},
    canMoveContentBlock: () => false,
    resizeContentBlock: () => {},
    addContentBlock: () => {},
    removeContentBlock: () => {}
});