import styles from './styles/ContentBlock.module.scss';
import {useDrag} from 'react-dnd';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import {useContext, useState} from 'react';

import {Resizable} from 'react-resizable';
import 'react-resizable/css/styles.css';
import {canResizeOrMove} from '@/app/page-template-editor/helpers/ContentBlockHelpers';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';
import Image from 'next/image';
import {Cancel} from '@mui/icons-material';

export interface ContentBlockProps {
    id: string,
    width: number,
    height: number,
    x: number,
    y: number,
    gridCellWidth: number,
    type: string
}

const ContentBlock = (props: ContentBlockProps) => {
    const { resizeContentBlock, contentBlocks } = useContext(GridContext);
    const [areContentBlockButtonsVisible, setAreContentBlockButtonsVisible] = useState<boolean>(false);
    const gridContext = useContext(GridContext);
    
    const [{isDragging}, drag, preview] = useDrag<IDraggableItem, void, { isDragging: boolean }>(() => ({
        type: props.type,
        item: { id: props.id, type: props.type, source: DragSource.CONTENT_BLOCK },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
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
                onMouseEnter={() => setAreContentBlockButtonsVisible(true)}
                onMouseLeave={() => setAreContentBlockButtonsVisible(false)}
            >
                {areContentBlockButtonsVisible && (
                    <>
                        <div ref={drag} className={styles.dragIconContainer}>
                            <Image src={"/images/icons/drag-icon.png"} alt={"Drag Icon"} width={12} height={12} />
                        </div>
                        <div className={styles.deleteIconContainer} onClick={() => gridContext.removeContentBlock(props.id)}>
                            <Cancel className={styles.deleteIcon} />
                        </div>
                    </>
                )}
                {props.type === DraggableTypes.HEADLINE_BLOCK && <h1 className={styles.headline}>Eksempel: Overskrift</h1>}
                
            </div>
        </Resizable>
    )
}

export default ContentBlock;
