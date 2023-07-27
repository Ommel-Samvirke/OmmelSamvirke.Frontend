import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { AbstractContentBlocks } from './AbstractContentBlocks';

export class HeadlineBlock extends AbstractContentBlocks {
    public headline: string = 'Lorem ipsum dolor sit amet';
    public width: number = HeadlineBlock.defaultWidth;
    public height: number = HeadlineBlock.defaultHeight;

    public static defaultWidth: number = 8;
    public static defaultHeight: number = 1;

    constructor(layout: Layout, type: string, x?: number, y?: number, width?: number, height?: number) {
        super(
            layout,
            type,
            x ? x : 0,
            y ? y : 0,
            width ? width : HeadlineBlock.defaultWidth,
            height ? height : HeadlineBlock.defaultHeight,
        );
    }
}
