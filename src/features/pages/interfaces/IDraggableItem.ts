import { DragSource } from "@/features/pages/constants/DragSource";

export interface IDraggableItem {
    id: string;
    type: string;
    source: DragSource;
}
