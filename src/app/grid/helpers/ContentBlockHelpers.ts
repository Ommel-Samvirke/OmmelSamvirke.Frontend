import IContentBlock from '@/app/grid/interfaces/IContentBlock';

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
    newWidth: number,
    newHeight: number,
    currentX: number,
    currentY: number,
    currentId: string,
    contentBlocks: IContentBlock[]
) => {
    for(let block of contentBlocks) {
        if(block.id === currentId) continue;

        if(isOverlapping(currentX, currentY, newWidth, newHeight, block.x, block.y, block.width, block.height)) {
            return false;
        }
    }
    return true;
}