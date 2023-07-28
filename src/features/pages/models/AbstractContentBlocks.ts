import { Layout } from "@/features/pages/enums/Layouts";
import { v1 as UUID1 } from "uuid";

export abstract class AbstractContentBlocks {
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public type: string;
    public layout: Layout;

    protected constructor(
        layout: Layout,
        type: string,
        x: number,
        y: number,
        width: number,
        height: number,
    ) {
        this.id = UUID1();
        this.layout = layout;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
