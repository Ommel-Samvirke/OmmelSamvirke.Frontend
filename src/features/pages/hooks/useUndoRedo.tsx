import { useCallback, useRef } from "react";

import { ContentBlockType } from "@/features/pages/types/ContentBlockType";
import { CircularBuffer } from "@/util/circular-buffer";

export const useUndoRedo = () => {
    const undoBufferRef = useRef(new CircularBuffer<ContentBlockType[]>());
    const redoBufferRef = useRef(new CircularBuffer<ContentBlockType[]>());

    const undo = useCallback((state: ContentBlockType[]) => {
        if (undoBufferRef.current.size() === 0) return;

        const previousState = undoBufferRef.current.pop();
        if (!previousState) return;

        redoBufferRef.current.push(state);
        return previousState;
    }, []);

    const redo = useCallback((state: ContentBlockType[]) => {
        if (redoBufferRef.current.size() === 0) return;

        const nextState = redoBufferRef.current.pop();
        if (!nextState) return;

        undoBufferRef.current.push(state);
        return nextState;
    }, []);

    const updateBuffers = useCallback((snapshot: ContentBlockType[]) => {
        undoBufferRef.current.push(snapshot);
        redoBufferRef.current.clear();
    }, []);

    return {
        undo,
        redo,
        undoBufferUsedCapacity: undoBufferRef.current.size(),
        redoBufferUsedCapacity: redoBufferRef.current.size(),
        updateBuffers,
    };
};
