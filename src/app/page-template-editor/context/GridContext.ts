import {createContext} from 'react';
import IContentBlock from '@/app/page-template-editor/interfaces/IContentBlock';

export interface GridContextState {
    contentBlocks: IContentBlock[];
    moveContentBlock: (id: string, x: number, y: number) => void;
    canMoveContentBlock: (id: string, x: number, y: number) => boolean;
    resizeContentBlock: (id: string, width: number, height: number) => void;
}


export const GridContext = createContext<GridContextState>({
    contentBlocks: [],
    moveContentBlock: () => {},
    canMoveContentBlock: () => false,
    resizeContentBlock: () => {}
});
