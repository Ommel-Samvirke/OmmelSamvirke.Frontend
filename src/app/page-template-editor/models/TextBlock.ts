import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { AbstractContentBlocks } from './AbstractContentBlocks';

export class TextBlock extends AbstractContentBlocks {
    public text: string = 'Tekstindhold';
    public width: number = TextBlock.defaultWidth;
    public height: number = TextBlock.defaultHeight;
    public static defaultWidth: number = 8;
    public static defaultHeight: number = 5;

    constructor(layout: Layout, type: string, x?: number, y?: number, width?: number, height?: number) {
        super(
            layout,
            type,
            x ? x : 0,
            y ? y : 0,
            width ? width : TextBlock.defaultWidth,
            height ? height : TextBlock.defaultHeight,
        );
    }
}
