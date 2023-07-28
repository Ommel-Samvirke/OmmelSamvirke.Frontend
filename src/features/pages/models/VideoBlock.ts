import { Layout } from "@/features/pages/enums/Layouts";
import { AbstractContentBlocks } from "@/features/pages/models/AbstractContentBlocks";

export class VideoBlock extends AbstractContentBlocks {
    public videoUrl: string = "";
    public width: number = VideoBlock.defaultWidth;
    public height: number = VideoBlock.defaultHeight;
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
            width ? width : VideoBlock.defaultWidth,
            height ? height : VideoBlock.defaultHeight,
        );
    }
}
