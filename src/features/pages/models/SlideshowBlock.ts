import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { Layout } from '@/features/pages/enums/Layouts';
import { AbstractContentBlocks } from '@/features/pages/models/AbstractContentBlocks';

export class SlideshowBlock extends AbstractContentBlocks {
    public imageUrls: string[] = [
        'https://fakeimg.pl/1600x1200?text=Billede1',
        'https://fakeimg.pl/1600x1200?text=Billede2',
        'https://fakeimg.pl/1600x1200?text=Billede3',
    ];
    public width: number = SlideshowBlock.defaultWidth;
    public height: number = SlideshowBlock.defaultHeight;

    public static defaultWidth: number = 14;
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
