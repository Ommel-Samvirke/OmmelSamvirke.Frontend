import { Layout } from '@/features/pages/enums/Layouts';
import { Side } from '@/features/pages/enums/Side';
import { Padding } from '@/features/pages/types/Padding';
import { v1 as UUID1 } from 'uuid';

export abstract class AbstractContentBlocks {
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public type: string;
    public layout: Layout;
    public leftPadding: Padding;
    public rightPadding: Padding;
    public topPadding: Padding;
    public bottomPadding: Padding;
    public minPadding: number;

    protected constructor(layout: Layout, type: string, x: number, y: number, width: number, height: number) {
        this.id = UUID1();
        this.layout = layout;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.leftPadding = { side: Side.Left, padding: 6 };
        this.rightPadding = { side: Side.Right, padding: 6 };
        this.topPadding = { side: Side.Top, padding: 6 };
        this.bottomPadding = { side: Side.Bottom, padding: 6 };
        this.minPadding = 0;
    }
}
