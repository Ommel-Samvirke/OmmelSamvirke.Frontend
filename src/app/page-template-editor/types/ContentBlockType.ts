import {HeadlineBlock} from '@/app/page-template-editor/models/HeadlineBlock';
import {TextBlock} from '@/app/page-template-editor/models/TextBlock';
import {SlideshowBlock} from '@/app/page-template-editor/models/SlideshowBlock';
import {ImageBlock} from '@/app/page-template-editor/models/ImageBlock';
import {VideoBlock} from '@/app/page-template-editor/models/VideoBlock';
import {PdfBlock} from '@/app/page-template-editor/models/PdfBlock';

export type ContentBlockType =
    | HeadlineBlock
    | TextBlock
    | ImageBlock
    | PdfBlock
    | VideoBlock
    | SlideshowBlock;
