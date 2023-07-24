import styles from "./ContentBlock.module.scss";
import {useDrag} from 'react-dnd';
import {DraggableTypes} from '@/app/grid/constants/DraggableTypes';

export interface ContentBlockProps {
    id: string
} 

const ContentBlock = (props: ContentBlockProps) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: DraggableTypes.CONTENT_BLOCK,
        item: { id: props.id },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }));
    
    return (
        <div 
            ref={drag}
            className={styles.contentBlock}
            style={{
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