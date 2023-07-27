import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { DraggableTypes } from '../constants/DraggableTypes';
import { HeadlineBlock } from './HeadlineBlock';
import { ImageBlock } from './ImageBlock';
import { PdfBlock } from './PdfBlock';
import { SlideshowBlock } from './SlideshowBlock';
import { TextBlock } from './TextBlock';
import { VideoBlock } from './VideoBlock';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';

export class ContentBlockFactory {
    public static createContentBlock(layout: Layout, type: string, x?: number, y?: number): ContentBlockType {
        switch (type) {
            case DraggableTypes.HEADLINE_BLOCK:
                return new HeadlineBlock(layout, type, x, y);
            case DraggableTypes.TEXT_BLOCK:
                return new TextBlock(layout, type, x, y);
            case DraggableTypes.IMAGE_BLOCK:
                return new ImageBlock(layout, type, x, y);
            case DraggableTypes.PDF_BLOCK:
                return new PdfBlock(layout, type, x, y);
            case DraggableTypes.VIDEO_BLOCK:
                return new VideoBlock(layout, type, x, y);
            case DraggableTypes.SLIDESHOW_BLOCK:
                return new SlideshowBlock(layout, type, x, y);
            default:
                throw new Error('Unknown content block type');
        }
    }
}
