import { createContext } from 'react';
import { HeadlineBlock } from '../models/HeadlineBlock';
import { ImageBlock } from '../models/ImageBlock';
import { PdfBlock } from '../models/PdfBlock';
import { SlideshowBlock } from '../models/SlideshowBlock';
import { VideoBlock } from '../models/VideoBlock';
import { TextBlock } from '../models/TextBlock';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';

export interface GridContextState {
    contentBlocks: (HeadlineBlock | ImageBlock | PdfBlock | SlideshowBlock | VideoBlock | TextBlock)[];
    moveContentBlock: (id: string, x: number, y: number) => void;
    canMoveContentBlock: (id: string, x: number, y: number, width?: number, height?: number) => boolean;
    resizeContentBlock: (id: string, width: number, height: number) => void;
    addContentBlock: (contentBlock: ContentBlockType) => void;
    removeContentBlock: (id: string) => void;
    undo: () => void;
    undoBufferUsedCapacity: number;
    redo: () => void;
    redoBufferUsedCapacity: number;
    rowCount: number;
    updateRowCount: (rowCount: number) => void;
    color: string;
    updateColor: (color: string) => void;
}

export const GridContext = createContext<GridContextState>({
    contentBlocks: [],
    moveContentBlock: () => {
    },
    canMoveContentBlock: () => false,
    resizeContentBlock: () => {
    },
    addContentBlock: () => {
    },
    removeContentBlock: () => {
    },
    undo: () => {
    },
    undoBufferUsedCapacity: 0,
    redo: () => {
    },
    redoBufferUsedCapacity: 0,
    rowCount: GridConstants.COLUMNS,
    updateRowCount: () => {},
    color: '#ffffff',
    updateColor: () => {},
});
