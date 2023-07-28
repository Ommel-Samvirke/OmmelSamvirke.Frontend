import { ContentBlock } from "@/features/pages/enums/ContentBlock";
import { Layout } from "@/features/pages/enums/Layouts";
import { AbstractContentBlocks } from "@/features/pages/models/AbstractContentBlocks";

export class SlideshowBlock extends AbstractContentBlocks {
    public imageUrls: string[] = [
        "https://via.placeholder.com/600",
        "https://via.placeholder.com/601",
        "https://via.placeholder.com/602",
    ];
    public width: number = SlideshowBlock.defaultWidth;
    public height: number = SlideshowBlock.defaultHeight;

    public static defaultWidth: number = 8;
    public static defaultHeight: number = 6;

    constructor(layout: Layout, x: number, y: number, width?: number, height?: number) {
        super(
            layout,
            ContentBlock.SLIDESHOW_BLOCK,
            x,
            y,
            width ? width : SlideshowBlock.defaultWidth,
            height ? height : SlideshowBlock.defaultHeight,
        );
    }
}
