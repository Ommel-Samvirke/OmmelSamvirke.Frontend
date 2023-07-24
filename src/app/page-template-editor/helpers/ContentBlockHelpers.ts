import IContentBlock from '@/app/page-template-editor/interfaces/IContentBlock';
import {GridConstants} from '@/app/page-template-editor/constants/GridConstants';

const isOverlapping = (
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number
) => {
    return !(x2 >= x1 + w1 ||
        x2 + w2 <= x1 ||
        y2 >= y1 + h1 ||
        y2 + h2 <= y1);
}

export const canResizeOrMove = (
    width: number,
    height: number,
    x: number,
    y: number,
    id: string,
    contentBlocks: IContentBlock[]
) => {
    if (width + x > GridConstants.COLUMNS) return false;
    
    for(let block of contentBlocks) {
        if(block.id === id) continue;

        if(isOverlapping(x, y, width, height, block.x, block.y, block.width, block.height)) {
            return false;
        }
    }
    return true;
}