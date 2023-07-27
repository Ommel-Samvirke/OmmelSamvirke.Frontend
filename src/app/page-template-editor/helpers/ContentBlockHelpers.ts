import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';

const isOverlapping = (
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number,
) => {
    return !(x2 >= x1 + w1 ||
        x2 + w2 <= x1 ||
        y2 >= y1 + h1 ||
        y2 + h2 <= y1);
};

export const canResizeOrMove = (
    width: number,
    height: number,
    x: number,
    y: number,
    id: string,
    contentBlocks: ContentBlockType[],
    rowCount: number,
) => {
    for (let block of contentBlocks) {
        if (block.id === id) continue;

        if (x + width > GridConstants.COLUMNS) return false;
        if (x + width < 0) return false;
        if (y + height < 0) return false;
        if ((y + height) > rowCount) return false;

        if (isOverlapping(x, y, width, height, block.x, block.y, block.width, block.height)) {
            return false;
        }
    }
    return true;
};
