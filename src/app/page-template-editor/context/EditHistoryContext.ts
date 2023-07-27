import { createContext } from 'react';

export interface EditHistoryContextState {
    undo: () => void;
    undoBufferUsedCapacity: number;
    redo: () => void;
    redoBufferUsedCapacity: number;
}

export const EditHistoryContext = createContext<EditHistoryContextState>({
    undo: () => {},
    undoBufferUsedCapacity: 0,
    redo: () => {},
    redoBufferUsedCapacity: 0,
});
