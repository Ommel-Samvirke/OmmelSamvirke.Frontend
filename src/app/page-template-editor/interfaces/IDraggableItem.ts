import { DragSource } from '@/app/page-template-editor/constants/DragSource';

export interface IDraggableItem {
    id: string;
    type: string;
    source: DragSource;
}
