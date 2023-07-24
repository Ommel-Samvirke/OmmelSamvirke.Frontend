import styles from "./styles/GridCell.module.scss";
import React, {useContext} from 'react';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import {useDrop} from 'react-dnd';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import DropOverlay from '@/app/page-template-editor/DropOverlay';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import { v1 as uuidv1 } from 'uuid';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';

export interface GridCellProps {
    x: number,
    y: number,
    children?: React.ReactNode
}

const GridCell = (props: GridCellProps) => {
    const gridContext = useContext(GridContext);

    const [{isOver, canDrop }, drop] = useDrop<IDraggableItem, void, {isOver: boolean, canDrop: boolean}>(() => ({
        accept: [DraggableTypes.HEADLINE_BLOCK, DraggableTypes.TEXT_BLOCK, DraggableTypes.IMAGE_BLOCK],
        canDrop: (item: IDraggableItem) => {
            if (item.source === DragSource.TOOL_MENU) {
                switch (item.type) {
                    case DraggableTypes.HEADLINE_BLOCK:
                        return gridContext.canMoveContentBlock(item.id, props.x, props.y, 9, 1);
                }
                
                
            } else if (item.source === DragSource.CONTENT_BLOCK) {
                return gridContext.canMoveContentBlock(item.id, props.x, props.y);
            }
            
            return gridContext.canMoveContentBlock(item.id, props.x, props.y)
        },
        drop: (item: IDraggableItem) => {
            if (item.source === DragSource.TOOL_MENU) {
                gridContext.addContentBlock({
                    id: uuidv1(),
                    x: props.x,
                    y: props.y,
                    width: 9,
                    height: 1
                });
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
