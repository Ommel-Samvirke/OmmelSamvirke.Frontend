import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { Corner } from '@/features/pages/enums/Corner';
import { Layout } from '@/features/pages/enums/Layouts';
import { AbstractContentBlocks } from '@/features/pages/models/AbstractContentBlocks';
import { BorderRadius } from '@/features/pages/types/BorderRadius';

export class ImageBlock extends AbstractContentBlocks {
    public imageUrl: string = 'https://fakeimg.pl/1600x1200?text=Billede';
    public width: number = ImageBlock.defaultWidth;
    public height: number = ImageBlock.defaultHeight;

    public topLeftBorderRadius: BorderRadius;
    public topRightBorderRadius: BorderRadius;
    public bottomLeftBorderRadius: BorderRadius;
    public bottomRightBorderRadius: BorderRadius;
    public static defaultWidth: number = 8;
    public static defaultHeight: number = 6;

    constructor(layout: Layout, x: number, y: number, width?: number, height?: number) {
        super(
            layout,
            ContentBlock.IMAGE_BLOCK,
            x,
            y,
            width ? width : ImageBlock.defaultWidth,
            height ? height : ImageBlock.defaultHeight,
        );

        this.topLeftBorderRadius = { corner: Corner.TopLeft, radius: 0 };
        this.topRightBorderRadius = { corner: Corner.TopRight, radius: 0 };
        this.bottomLeftBorderRadius = { corner: Corner.BottomLeft, radius: 0 };
        this.bottomRightBorderRadius = { corner: Corner.BottomRight, radius: 0 };
    }
}
