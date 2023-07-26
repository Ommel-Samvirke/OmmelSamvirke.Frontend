import { AbstractContentBlocks } from './AbstractContentBlocks';

export class SlideshowBlock extends AbstractContentBlocks {
    public imageUrls: string[] = ['https://via.placeholder.com/600', 'https://via.placeholder.com/601', 'https://via.placeholder.com/602'];
    public width: number = SlideshowBlock.defaultWidth;
    public height: number = SlideshowBlock.defaultHeight;

    public static defaultWidth: number = 8;
    public static defaultHeight: number = 6;

    constructor(type: string, x?: number, y?: number, width?: number, height?: number) {
        super(
            type,
            x ? x : 0,
            y ? y : 0,
            width ? width : SlideshowBlock.defaultWidth,
            height ? height : SlideshowBlock.defaultHeight,
        );
    }
}
