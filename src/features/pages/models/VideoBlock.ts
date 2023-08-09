import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { Layout } from '@/features/pages/enums/Layouts';
import { AbstractContentBlocks } from '@/features/pages/models/AbstractContentBlocks';

export class VideoBlock extends AbstractContentBlocks {
    public videoUrl: string = 'https://www.youtube.com/watch?v=mQMLMSi2pB0';
    public width: number = VideoBlock.defaultWidth;
    public height: number = VideoBlock.defaultHeight;
    public static defaultWidth: number = 14;
    public static defaultHeight: number = 6;

    constructor(layout: Layout, x: number, y: number, width?: number, height?: number) {
        super(
            layout,
            ContentBlock.VIDEO_BLOCK,
            x,
            y,
            width ? width : VideoBlock.defaultWidth,
            height ? height : VideoBlock.defaultHeight,
        );
    }
}
