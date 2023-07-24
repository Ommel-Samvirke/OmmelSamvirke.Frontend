import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';

export interface IDraggableItem { 
    id: string;
    type: DraggableTypes;
    source: DragSource;
}
