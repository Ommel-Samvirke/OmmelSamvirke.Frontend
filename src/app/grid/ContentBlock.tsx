import styles from "./styles/ContentBlock.module.scss";
import {useDrag} from 'react-dnd';
import {DraggableTypes} from '@/app/grid/constants/DraggableTypes';
import {GridContext} from '@/app/grid/context/GridContext';
import {useContext} from 'react';

import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import {canResizeOrMove} from '@/app/grid/helpers/ContentBlockHelpers';

export interface ContentBlockProps {
    id: string,
    width: number,
    height: number,
    x: number,
    y: number,
    gridCellWidth: number
}

const ContentBlock = (props: ContentBlockProps) => {
    const { resizeContentBlock, contentBlocks } = useContext(GridContext);
    
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: DraggableTypes.CONTENT_BLOCK,
        item: {id: props.id},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <Resizable
            width={props.width * props.gridCellWidth}
            height={props.height * props.gridCellWidth}
            draggableOpts={{grid: [props.gridCellWidth, props.gridCellWidth]}}
            
            // @ts-ignore
            onResize={(event: MouseEvent) => {
                const boxLeft = props.x * props.gridCellWidth;
                const boxTop = props.y * props.gridCellWidth;

                // Distance moved by the cursor from the starting position of the box
                const deltaX = event.clientX - boxLeft;
                const deltaY = event.clientY - boxTop;

                // Calculate new width and height based on cursor's position
                let newWidth = Math.round(deltaX / props.gridCellWidth) - 1;
                let newHeight = Math.round(deltaY / props.gridCellWidth);

                // Clamping the width and height to be within certain boundaries
                newWidth = Math.min(Math.max(newWidth, 1), 24);
                newHeight = Math.min(Math.max(newHeight, 1), 200);

                if (!canResizeOrMove(newWidth, newHeight, props.x, props.y, props.id, contentBlocks)) {
                    return;
                }

                resizeContentBlock(props.id, newWidth, newHeight);
            }}
            resizeHandles={['se']} 
        >
            <div
                ref={preview}
                className={styles.contentBlock}
                style={{
                    position: 'absolute',
                    left: `${props.x * props.gridCellWidth}px`,
                    top: `${props.y * props.gridCellWidth}px`,
                    width: `${props.width * props.gridCellWidth}px`,
                    height: `${props.height * props.gridCellWidth}px`,
                    opacity: isDragging ? 0.5 : 1
                }}
            >
                <div ref={drag}>H</div>
                <span>B{props.id}</span>
                
            </div>
        </Resizable>
    )
}

export default ContentBlock;
