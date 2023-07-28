import { DraggableTypes } from "@/features/pages/constants/DraggableTypes";
import { Layout } from "@/features/pages/constants/Layouts";
import { HeadlineBlock } from "@/features/pages/models/HeadlineBlock";
import { ImageBlock } from "@/features/pages/models/ImageBlock";
import { PdfBlock } from "@/features/pages/models/PdfBlock";
import { SlideshowBlock } from "@/features/pages/models/SlideshowBlock";
import { TextBlock } from "@/features/pages/models/TextBlock";
import { VideoBlock } from "@/features/pages/models/VideoBlock";
import { ContentBlockType } from "@/features/pages/types/ContentBlockType";

export class ContentBlockFactory {
    public static createContentBlock(
        layout: Layout,
        type: string,
        x?: number,
        y?: number,
    ): ContentBlockType {
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
                throw new Error("Unknown content block type");
        }
    }
}
