import { AbstractContentBlocks } from "./AbstractContentBlocks";

export class ImageBlock extends AbstractContentBlocks {
    public imageUrl: string = 'https://via.placeholder.com/600';
    public width: number = ImageBlock.defaultWidth;
    public height: number = ImageBlock.defaultHeight;
    public static defaultWidth: number = 8;
    public static defaultHeight: number = 6;

    constructor(type: string, x?: number, y?: number, width?: number, height?: number) {
        super(
            type,
            x ? x : 0,
            y ? y : 0, 
            width ? width : ImageBlock.defaultWidth, 
            height ? height : ImageBlock.defaultHeight
        );
    }
}
