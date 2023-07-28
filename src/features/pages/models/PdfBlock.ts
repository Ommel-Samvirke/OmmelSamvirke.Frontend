import { ContentBlock } from "@/features/pages/enums/ContentBlock";
import { Layout } from "@/features/pages/enums/Layouts";
import { AbstractContentBlocks } from "@/features/pages/models/AbstractContentBlocks";

export class PdfBlock extends AbstractContentBlocks {
    public pdfUrl: string = "";
    public width: number = PdfBlock.defaultWidth;
    public height: number = PdfBlock.defaultHeight;

    public static defaultWidth: number = 12;
    public static defaultHeight: number = 14;

    constructor(layout: Layout, x: number, y: number, width?: number, height?: number) {
        super(
            layout,
            ContentBlock.PDF_BLOCK,
            x,
            y,
            width ? width : PdfBlock.defaultWidth,
            height ? height : PdfBlock.defaultHeight,
        );
    }
}
