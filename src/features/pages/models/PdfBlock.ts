import { Layout } from "@/features/pages/constants/Layouts";
import { AbstractContentBlocks } from "@/features/pages/models/AbstractContentBlocks";

export class PdfBlock extends AbstractContentBlocks {
    public pdfUrl: string = "";
    public width: number = PdfBlock.defaultWidth;
    public height: number = PdfBlock.defaultHeight;

    public static defaultWidth: number = 12;
    public static defaultHeight: number = 14;

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
            width ? width : PdfBlock.defaultWidth,
            height ? height : PdfBlock.defaultHeight,
        );
    }
}
