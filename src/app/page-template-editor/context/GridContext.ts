import {createContext} from 'react';
import IContentBlock from '@/app/page-template-editor/interfaces/IContentBlock';
import { HeadlineBlock } from '../models/HeadlineBlock';
import { ImageBlock } from '../models/ImageBlock';
import { PdfBlock } from '../models/PdfBlock';
import { SlideshowBlock } from '../models/SlideshowBlock';
import { VideoBlock } from '../models/VideoBlock';
import { TextBlock } from '../models/TextBlock';

export interface GridContextState {
    contentBlocks: (HeadlineBlock | ImageBlock | PdfBlock | SlideshowBlock | VideoBlock | TextBlock)[];
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
