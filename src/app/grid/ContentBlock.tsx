import styles from "./ContentBlock.module.scss";
import {useDrag} from 'react-dnd';
import {DraggableTypes} from '@/app/grid/constants/DraggableTypes';

export interface ContentBlockProps {
    id: string,
    width: number,
    height: number,
    x: number,
    y: number,
    gridCellWidth: number
}

export type DragItem = {
    id: string;
    width: number;
    height: number;
    x: number;
    y: number;
};

const ContentBlock = (props: ContentBlockProps) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: DraggableTypes.CONTENT_BLOCK,
        item: {
            id: props.id,
            width: props.width,
            height: props.height
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div
            ref={drag}
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
            <span>
                B{props.id}
            </span>
        </div>
    )
}

export default ContentBlock;