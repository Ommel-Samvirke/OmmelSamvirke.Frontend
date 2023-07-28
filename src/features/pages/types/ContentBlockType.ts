import { HeadlineBlock } from "@/features/pages/models/HeadlineBlock";
import { ImageBlock } from "@/features/pages/models/ImageBlock";
import { PdfBlock } from "@/features/pages/models/PdfBlock";
import { SlideshowBlock } from "@/features/pages/models/SlideshowBlock";
import { TextBlock } from "@/features/pages/models/TextBlock";
import { VideoBlock } from "@/features/pages/models/VideoBlock";

export type ContentBlockType =
    | HeadlineBlock
    | TextBlock
    | ImageBlock
    | PdfBlock
    | VideoBlock
    | SlideshowBlock;
