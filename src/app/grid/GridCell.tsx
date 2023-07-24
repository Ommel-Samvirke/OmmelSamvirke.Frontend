import styles from "./styles/GridCell.module.scss";
import React, {useContext} from 'react';
import {DraggableTypes} from '@/app/grid/constants/DraggableTypes';
import {useDrop} from 'react-dnd';
import {GridContext} from '@/app/grid/context/GridContext';
import DropOverlay from '@/app/grid/DropOverlay';

export interface GridCellProps {
    x: number,
    y: number,
    children?: React.ReactNode
}

const GridCell = (props: GridCellProps) => {
    const gridContext = useContext(GridContext);

    const [{isOver, canDrop }, drop] = useDrop(() => ({
        accept: DraggableTypes.CONTENT_BLOCK,
        canDrop: (item: { id: string }) => {
            return gridContext.canMoveContentBlock(item.id, props.x, props.y)
        },
        drop: (item: { id: string }) => gridContext.moveContentBlock(item.id, props.x, props.y),
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
