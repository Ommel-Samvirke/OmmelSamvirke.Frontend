import {DragPreviewImage, useDrag} from 'react-dnd';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';
import {useEffect, useState} from 'react';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';

interface ToolMenuIconProps {
    type: string;
}

const ToolMenuIcon = (props: ToolMenuIconProps) => {
    const [previewImagePath, setPreviewImagePath] = useState<string>('');
    
    useEffect(() => {
        switch (props.type) {
            case DraggableTypes.HEADLINE_BLOCK:
                setPreviewImagePath('/images/content-block-previews/headline.png');
        }
    }, []);
    
    const [{isDragging}, drag, preview] = useDrag<IDraggableItem, void, { isDragging: boolean }>(() => ({
        type: props.type,
        item: { id: '', type: props.type, source: DragSource.TOOL_MENU},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    
    return (
        <>
            <DragPreviewImage connect={preview} src={previewImagePath} />
            <div ref={drag}>
                { props.type === DraggableTypes.HEADLINE_BLOCK && <span>Overskrift</span>}
                { props.type === DraggableTypes.TEXT_BLOCK && <span>Tekst</span>}
                { props.type === DraggableTypes.IMAGE_BLOCK && <span>Billede</span>}
            </div>
        </>
    );
};

export default ToolMenuIcon;
