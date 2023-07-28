import { DragSource } from "@/features/pages/enums/DragSource";

export interface IDraggableItem {
    id: string;
    type: string;
    source: DragSource;
}
