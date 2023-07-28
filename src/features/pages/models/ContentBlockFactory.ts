import { ContentBlock } from "@/features/pages/enums/ContentBlock";
import { Layout } from "@/features/pages/enums/Layouts";
import { HeadlineBlock } from "@/features/pages/models/HeadlineBlock";
import { ImageBlock } from "@/features/pages/models/ImageBlock";
import { PdfBlock } from "@/features/pages/models/PdfBlock";
import { SlideshowBlock } from "@/features/pages/models/SlideshowBlock";
import { TextBlock } from "@/features/pages/models/TextBlock";
import { VideoBlock } from "@/features/pages/models/VideoBlock";
import { ContentBlockType } from "@/features/pages/types/ContentBlockType";

export class ContentBlockFactory {
    public static createContentBlock(layout: Layout, type: string, x: number, y: number): ContentBlockType {
        switch (type) {
            case ContentBlock.HEADLINE_BLOCK:
                return new HeadlineBlock(layout, x, y);
            case ContentBlock.TEXT_BLOCK:
                return new TextBlock(layout, x, y);
            case ContentBlock.IMAGE_BLOCK:
                return new ImageBlock(layout, x, y);
            case ContentBlock.PDF_BLOCK:
                return new PdfBlock(layout, x, y);
            case ContentBlock.VIDEO_BLOCK:
                return new VideoBlock(layout, x, y);
            case ContentBlock.SLIDESHOW_BLOCK:
                return new SlideshowBlock(layout, x, y);
            default:
                throw new Error("Unknown content block type");
        }
    }
}
