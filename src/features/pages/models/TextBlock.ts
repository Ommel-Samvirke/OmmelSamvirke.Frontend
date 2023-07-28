import { ContentBlock } from "@/features/pages/enums/ContentBlock";
import { HorizontalTextAlignment } from "@/features/pages/enums/HorizontalTextAlignment";
import { Layout } from "@/features/pages/enums/Layouts";
import { VerticalTextAlignment } from "@/features/pages/enums/VerticalTextAlignment";
import { AbstractContentBlocks } from "@/features/pages/models/AbstractContentBlocks";

export class TextBlock extends AbstractContentBlocks {
    public text: string = "Tekstindhold";
    public width: number = TextBlock.defaultWidth;
    public height: number = TextBlock.defaultHeight;
    public verticalTextAlignment: VerticalTextAlignment = VerticalTextAlignment.TOP;
    public horizontalTextAlignment: HorizontalTextAlignment = HorizontalTextAlignment.LEFT;
    public static defaultWidth: number = 8;
    public static defaultHeight: number = 5;

    constructor(layout: Layout, x: number, y: number, width?: number, height?: number) {
        super(
            layout,
            ContentBlock.TEXT_BLOCK,
            x,
            y,
            width ? width : TextBlock.defaultWidth,
            height ? height : TextBlock.defaultHeight,
        );
    }
}
