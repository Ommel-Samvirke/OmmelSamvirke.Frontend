import styles from "./styles/GridCell.module.scss";
import React, {useContext} from 'react';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import {useDrop} from 'react-dnd';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import DropOverlay from '@/app/page-template-editor/DropOverlay';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';
import { HeadlineBlock } from "./models/HeadlineBlock";
import { TextBlock } from "./models/TextBlock";
import { ImageBlock } from "./models/ImageBlock";
import { PdfBlock } from "./models/PdfBlock";
import { VideoBlock } from "./models/VideoBlock";
import { SlideshowBlock } from "./models/SlideshowBlock";
import { ContentBlockFactory } from "./models/ContentBlockFactory";

export interface GridCellProps {
    x: number,
    y: number,
    children?: React.ReactNode
}

const GridCell = (props: GridCellProps) => {
    const gridContext = useContext(GridContext);

    const [{isOver, canDrop }, drop] = useDrop<IDraggableItem, void, {isOver: boolean, canDrop: boolean}>(() => ({
        accept: [
            DraggableTypes.HEADLINE_BLOCK,
            DraggableTypes.TEXT_BLOCK,
            DraggableTypes.IMAGE_BLOCK,
            DraggableTypes.PDF_BLOCK,
            DraggableTypes.VIDEO_BLOCK,
            DraggableTypes.SLIDESHOW_BLOCK,
        ],
        canDrop: (item: IDraggableItem) => {
            if (item.source === DragSource.TOOL_MENU) {
                switch (item.type) {
                    case DraggableTypes.HEADLINE_BLOCK:
                        return gridContext.canMoveContentBlock(item.id, props.x, props.y, HeadlineBlock.defaultWidth, HeadlineBlock.defaultHeight);
                    case DraggableTypes.TEXT_BLOCK:
                        return gridContext.canMoveContentBlock(item.id, props.x, props.y, TextBlock.defaultWidth, TextBlock.defaultHeight);
                    case DraggableTypes.IMAGE_BLOCK:
                        return gridContext.canMoveContentBlock(item.id, props.x, props.y, ImageBlock.defaultWidth, ImageBlock.defaultHeight);
                    case DraggableTypes.PDF_BLOCK:
                        return gridContext.canMoveContentBlock(item.id, props.x, props.y, PdfBlock.defaultWidth, PdfBlock.defaultHeight);
                    case DraggableTypes.VIDEO_BLOCK:
                        return gridContext.canMoveContentBlock(item.id, props.x, props.y, VideoBlock.defaultWidth, VideoBlock.defaultHeight);
                    case DraggableTypes.SLIDESHOW_BLOCK:
                        return gridContext.canMoveContentBlock(item.id, props.x, props.y, SlideshowBlock.defaultWidth, SlideshowBlock.defaultHeight);
                }
            } 

            return gridContext.canMoveContentBlock(item.id, props.x, props.y)
        },
        drop: (item: IDraggableItem) => {
            if (item.source === DragSource.TOOL_MENU) {
                gridContext.addContentBlock(ContentBlockFactory.createContentBlock(item.type, props.x, props.y));
            } else if (item.source === DragSource.CONTENT_BLOCK) {
                gridContext.moveContentBlock(item.id, props.x, props.y);
            }  
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }),
    [props.x, props.y]);

    return (
        <div
            ref={drop}    
            className={styles.gridCell}
        >
            {isOver && canDrop && <DropOverlay color={"yellow"} />}
            {isOver && !canDrop && <DropOverlay color={"red"} />}
            
            {props.children}
        </div>
    )
}

export default GridCell;
