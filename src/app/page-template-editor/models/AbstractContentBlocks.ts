import IContentBlock from '../interfaces/IContentBlock';
import { v1 as uuidv1 } from 'uuid';

export abstract class AbstractContentBlocks implements IContentBlock {

    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public type: string;

    protected constructor(type: string, x: number, y: number, width: number, height: number) {
        this.id = uuidv1();
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
