import { AbstractContentBlocks } from './AbstractContentBlocks';

export class PdfBlock extends AbstractContentBlocks {
    public pdfUrl: string = '';
    public width: number = PdfBlock.defaultWidth;
    public height: number = PdfBlock.defaultHeight;

    public static defaultWidth: number = 12;
    public static defaultHeight: number = 14;

    constructor(type: string, x?: number, y?: number, width?: number, height?: number) {
        super(
            type,
            x ? x : 0,
            y ? y : 0,
            width ? width : PdfBlock.defaultWidth,
            height ? height : PdfBlock.defaultHeight,
        );
    }
}
