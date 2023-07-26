"use client";

import styles from "./styles/PageTemplateEditor.module.scss";

import Grid from '@/app/page-template-editor/Grid';
import PageTemplateEditorHeader from '@/app/page-template-editor/PageTemplateEditorHeader';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {canResizeOrMove} from '@/app/page-template-editor/helpers/ContentBlockHelpers';
import {ContentBlockType} from '@/app/page-template-editor/types/ContentBlockType';
import {CircularBuffer} from '@/util/circularBuffer';
import {GridConstants} from '@/app/page-template-editor/constants/GridConstants';

const PageTemplateEditor = () => {
    const [contentBlocks, setContentBlocks] = useState<ContentBlockType[]>([]);
    const [undoBuffer, setUndoBuffer] = useState<CircularBuffer<(ContentBlockType)[]>>(new CircularBuffer<(ContentBlockType)[]>());
    const [redoBuffer, setRedoBuffer] = useState<CircularBuffer<(ContentBlockType)[]>>(new CircularBuffer<(ContentBlockType)[]>());
    const [rowCount, setRowCount] = useState<number>(GridConstants.COLUMNS);
    const contentBlocksRef = useRef(contentBlocks);
    const rowCountRef = useRef(rowCount);

    const undo = useCallback(() => {
        if (undoBuffer.size() === 0) return;

        const previousState = undoBuffer.pop();

        if (!previousState) return;

        redoBuffer.push(contentBlocks);
        setRedoBuffer(redoBuffer);

        setContentBlocks(previousState);
    }, [contentBlocks, undoBuffer, redoBuffer]);

    const redo = useCallback(() => {
        if (redoBuffer.size() === 0) return;

        const nextState = redoBuffer.pop();

        if (!nextState) return;

        undoBuffer.push(contentBlocks);
        setUndoBuffer(undoBuffer);

        setContentBlocks(nextState);
    }, [contentBlocks, undoBuffer, redoBuffer]);

    const canMoveContentBlock = useCallback((id: string, x: number, y: number, width?: number, height?: number) => {
        const contentBlock: ContentBlockType | undefined = contentBlocksRef.current.find(block => block.id === id);
        if(!contentBlock) {
            if (!width || !height) return false;
            return canResizeOrMove(width, height, x, y, id, contentBlocksRef.current, rowCountRef.current);
        }
        
        return canResizeOrMove(
            width ? width : contentBlock.width,
            height ? height : contentBlock.height,
            x,
            y,
            id,
            contentBlocksRef.current,
            rowCountRef.current
        );
    }, [contentBlocksRef]);

    useEffect(() => {
        contentBlocksRef.current = contentBlocks;
    }, [contentBlocks]);
    
    useEffect(() => {
        rowCountRef.current = rowCount;
    }, [rowCount]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
                undo();
            } else if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
                redo();
            }
        };
        
        document.addEventListener('keydown', handleKeyPress);
        
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [undo, redo]);
    
    const moveContentBlock = useCallback((id: string, x: number, y: number) => {
        if (!canMoveContentBlock(id, x, y)) return;
        
        setContentBlocks(prevBlocks => {
            updateUndoBuffer(prevBlocks);
            return prevBlocks.map(block =>
                block.id === id ? { ...block, x, y } : block
            );
        });
    }, [canMoveContentBlock]);

    const resizeContentBlock = useCallback((id: string, width: number, height: number) => {
        const currentBlock = contentBlocks.find(block => block.id === id);
        if (!currentBlock) return;
        
        const { x, y } = currentBlock;
        if (!canMoveContentBlock(id, x, y, width, height)) return;
        
        setContentBlocks(prevBlocks => {
            updateUndoBuffer(prevBlocks);
            return prevBlocks.map(block =>
                block.id === id ? { ...block, width, height } : block
            );
        });
    }, [canMoveContentBlock, contentBlocks]);


    const addContentBlock = useCallback((contentBlock: ContentBlockType) => {
        setContentBlocks(prevBlocks => {
            updateUndoBuffer(prevBlocks);
            return [...prevBlocks, contentBlock];
        });
    }, []);
    
    const removeContentBlock = useCallback((id: string) => {
        setContentBlocks(prevBlocks => {
            updateUndoBuffer(prevBlocks);
            return prevBlocks.filter(block => block.id !== id);
        });
    }, []);

    const updateUndoBuffer = (snapshot: ContentBlockType[]) => {
        undoBuffer.push(snapshot);
        setUndoBuffer(undoBuffer);
        
        setRedoBuffer(new CircularBuffer<ContentBlockType[]>());
    };
    
    const updateRowCount = useCallback((rows: number) => {
        console.log("asdlæjkf")
        setRowCount(rows);
    }, []);
    
    const contextValue = useMemo(() => ({
        contentBlocks,
        moveContentBlock,
        canMoveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
        undo,
        redo,
        rowCount,
        updateRowCount
    }), [
        contentBlocks,
        moveContentBlock,
        canMoveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
        undo,
        redo,
        rowCount,
        updateRowCount
    ]);
    
    return (
        <GridContext.Provider value={contextValue}>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.PageTemplateEditor}>
                    <PageTemplateEditorHeader
                        onUndo={undo}    
                        onRedo={redo}
                    />
                    <Grid />
                </div>
            </DndProvider>
        </GridContext.Provider>
    );
};

export default PageTemplateEditor;
