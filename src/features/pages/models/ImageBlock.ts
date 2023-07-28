import { Layout } from "@/features/pages/enums/Layouts";
import { AbstractContentBlocks } from "@/features/pages/models/AbstractContentBlocks";

export class ImageBlock extends AbstractContentBlocks {
    public imageUrl: string = "https://fakeimg.pl/1600x1200?text=Billede";
    public width: number = ImageBlock.defaultWidth;
    public height: number = ImageBlock.defaultHeight;
    public static defaultWidth: number = 8;
    public static defaultHeight: number = 6;

    constructor(
        layout: Layout,
        type: string,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    ) {
        super(
            layout,
            type,
            x ? x : 0,
            y ? y : 0,
            width ? width : ImageBlock.defaultWidth,
            height ? height : ImageBlock.defaultHeight,
        );
    }
}
