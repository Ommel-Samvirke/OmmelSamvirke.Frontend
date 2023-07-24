﻿import {createContext} from 'react';
import IContentBlock from '@/app/grid/interfaces/IContentBlock';

export interface GridContextState {
    contentBlocks: IContentBlock[];
    moveContentBlock: (id: string, x: number, y: number) => void;
    canMoveContentBlock: (id: string, x: number, y: number) => boolean;
}


export const GridContext = createContext<GridContextState>({
    contentBlocks: [],
    moveContentBlock: () => {},
    canMoveContentBlock: () => false,
});
