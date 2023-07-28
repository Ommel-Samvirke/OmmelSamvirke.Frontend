import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { HorizontalTextAlignment } from '@/features/pages/enums/HorizontalTextAlignment';
import { Layout } from '@/features/pages/enums/Layouts';
import { VerticalTextAlignment } from '@/features/pages/enums/VerticalTextAlignment';
import { AbstractContentBlocks } from '@/features/pages/models/AbstractContentBlocks';

export class HeadlineBlock extends AbstractContentBlocks {
    public headline: string = 'Lorem ipsum dolor sit amet';
    public width: number = HeadlineBlock.defaultWidth;
    public height: number = HeadlineBlock.defaultHeight;
    public verticalTextAlignment: VerticalTextAlignment = VerticalTextAlignment.TOP;
    public horizontalTextAlignment: HorizontalTextAlignment = HorizontalTextAlignment.LEFT;
    public static defaultWidth: number = 8;
    public static defaultHeight: number = 1;

    constructor(layout: Layout, x: number, y: number, width?: number, height?: number) {
        super(
            layout,
            ContentBlock.HEADLINE_BLOCK,
            x,
            y,
            width ? width : HeadlineBlock.defaultWidth,
            height ? height : HeadlineBlock.defaultHeight,
        );
    }
}
