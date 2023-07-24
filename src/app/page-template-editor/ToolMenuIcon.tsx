import {useDrag} from 'react-dnd';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';

interface ToolMenuIconProps {
    type: string;
}

const ToolMenuIcon = (props: ToolMenuIconProps) => {
    const [{isDragging}, drag, preview] = useDrag<IDraggableItem, void, { isDragging: boolean }>(() => ({
        type: props.type,
        item: { id: '', type: props.type, source: DragSource.TOOL_MENU},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    
    return (
        <div ref={drag}>
            {/* Render your icon based on the type */}
            Icon here
        </div>
    );
};

export default ToolMenuIcon;