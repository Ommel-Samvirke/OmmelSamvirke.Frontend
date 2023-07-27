'use client';

import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { EditHistoryContext } from '@/app/page-template-editor/context/EditHistoryContext';
import { EditorContext } from '@/app/page-template-editor/context/EditorContext';
import { LayoutContext } from '@/app/page-template-editor/context/LayoutContext';
import styles from './styles/PageTemplateEditor.module.scss';

import Grid from '@/app/page-template-editor/Grid';
import PageTemplateEditorHeader from '@/app/page-template-editor/PageTemplateEditorHeader';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { canResizeOrMove } from '@/app/page-template-editor/helpers/ContentBlockHelpers';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import { CircularBuffer } from '@/util/circularBuffer';
import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';

const PageTemplateEditor = () => {
    const [currentLayout, setCurrentLayout] = useState<Layout>(Layout.DESKTOP);
    const [desktopLayout, setDesktopLayout] = useState<ContentBlockType[]>([]);
    const [tabletLayout, setTabletLayout] = useState<ContentBlockType[]>([]);
    const [mobileLayout, setMobileLayout] = useState<ContentBlockType[]>([]);
    const [undoBuffer, setUndoBuffer] = useState<CircularBuffer<(ContentBlockType)[]>>(new CircularBuffer<(ContentBlockType)[]>());
    const [redoBuffer, setRedoBuffer] = useState<CircularBuffer<(ContentBlockType)[]>>(new CircularBuffer<(ContentBlockType)[]>());
    const [rowCount, setRowCount] = useState<number>(GridConstants.COLUMNS);
    const [undoBufferUsedCapacity, setUndoBufferUsedCapacity] = useState<number>(0);
    const [redoBufferUsedCapacity, setRedoBufferUsedCapacity] = useState<number>(0);
    const [color, setColor] = useState<string>('#ffffff');
    const [currentMinRows, setCurrentMinRows] = useState<number>(GridConstants.COLUMNS);
    const desktopLayoutRef = useRef(desktopLayout);
    const tabletLayoutRef = useRef(tabletLayout);
    const mobileLayoutRef = useRef(mobileLayout);
    const rowCountRef = useRef(rowCount);

    const undo = useCallback(() => {
        if (undoBuffer.size() === 0) return;

        const previousState = undoBuffer.pop();

        if (!previousState) return;

        redoBuffer.push(desktopLayout);
        setRedoBuffer(redoBuffer);

        setDesktopLayout(previousState);
        setUndoBufferUsedCapacity(undoBuffer.size());
        setRedoBufferUsedCapacity(redoBuffer.size());
    }, [desktopLayout, undoBuffer, redoBuffer]);

    const redo = useCallback(() => {
        if (redoBuffer.size() === 0) return;

        const nextState = redoBuffer.pop();

        if (!nextState) return;

        undoBuffer.push(desktopLayout);
        setUndoBuffer(undoBuffer);

        setDesktopLayout(nextState);
        setUndoBufferUsedCapacity(undoBuffer.size());
        setRedoBufferUsedCapacity(redoBuffer.size());
    }, [desktopLayout, undoBuffer, redoBuffer]);

    const canMoveContentBlock = useCallback((layout: Layout, id: string, x: number, y: number, width?: number, height?: number) => {
        let contentBlock: ContentBlockType | undefined;
        
        switch (layout) {
            case Layout.DESKTOP:
                contentBlock = desktopLayoutRef.current.find(block => block.id === id);
                break;
            case Layout.TABLET:
                contentBlock = tabletLayoutRef.current.find(block => block.id === id);
                break;
            case Layout.MOBILE:
                contentBlock = mobileLayoutRef.current.find(block => block.id === id);
                break;
        }
        
        if (!contentBlock) {
            if (!width || !height) return false;
            return canResizeOrMove(width, height, x, y, id, desktopLayoutRef.current, rowCountRef.current);
        }

        return canResizeOrMove(
            width ? width : contentBlock.width,
            height ? height : contentBlock.height,
            x,
            y,
            id,
            desktopLayoutRef.current,
            rowCountRef.current,
        );
    }, [desktopLayoutRef, tabletLayoutRef, mobileLayoutRef, rowCountRef]);

    useEffect(() => {
        desktopLayoutRef.current = desktopLayout;
        rowCountRef.current = rowCount;
    }, [desktopLayout, rowCount]);

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

    const moveContentBlock = useCallback((layout: Layout, id: string, x: number, y: number) => {
        if (!canMoveContentBlock(layout, id, x, y)) return;

        switch (layout) {
            case Layout.DESKTOP:
                setDesktopLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.map(block =>
                        block.id === id ? { ...block, x, y } : block,
                    );
                });
                break;
            case Layout.TABLET:
                setTabletLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.map(block =>
                        block.id === id ? { ...block, x, y } : block,
                    );
                });
                break;
            case Layout.MOBILE:
                setMobileLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.map(block =>
                        block.id === id ? { ...block, x, y } : block,
                    );
                });
                break;
        }
    }, [canMoveContentBlock]);

    const resizeContentBlock = useCallback((layout: Layout, id: string, width: number, height: number) => {
        let currentBlock: ContentBlockType | undefined;
        
        switch (layout) {
            case Layout.DESKTOP:
                currentBlock = desktopLayout.find(block => block.id === id);
                break;
            case Layout.TABLET:
                currentBlock = tabletLayout.find(block => block.id === id);
                break;
            case Layout.MOBILE:
                currentBlock = mobileLayout.find(block => block.id === id);
                break;
        }
        
        if (!currentBlock) return;

        const { x, y } = currentBlock;
        if (!canMoveContentBlock(layout, id, x, y, width, height)) return;
        
        switch (layout) {
            case Layout.DESKTOP:
                setDesktopLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.map(block =>
                        block.id === id ? { ...block, width, height } : block,
                    );
                });
                break;
            case Layout.TABLET:
                setTabletLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.map(block =>
                        block.id === id ? { ...block, width, height } : block,
                    );
                });
                break;
            case Layout.MOBILE:
                setMobileLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.map(block =>
                        block.id === id ? { ...block, width, height } : block,
                    );
                });
                break;
        }
    }, [canMoveContentBlock, desktopLayout, tabletLayout, mobileLayout]);

    const addContentBlock = useCallback((layout: Layout, contentBlock: ContentBlockType) => {
        switch (layout) {
            case Layout.DESKTOP:
                setDesktopLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return [...prevBlocks, contentBlock];
                });
                break;
            case Layout.TABLET:
                setTabletLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return [...prevBlocks, contentBlock];
                });
                break;  
            case Layout.MOBILE:
                setMobileLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return [...prevBlocks, contentBlock];
                });
                break;
        }
    }, []);

    const removeContentBlock = useCallback((layout: Layout, id: string) => {
        switch (layout) {
            case Layout.DESKTOP:
                setDesktopLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.filter(block => block.id !== id);
                });
                break;
            case Layout.TABLET:
                setTabletLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.filter(block => block.id !== id);
                });
                break;
            case Layout.MOBILE:
                setMobileLayout(prevBlocks => {
                    updateUndoBuffer(prevBlocks);
                    return prevBlocks.filter(block => block.id !== id);
                });
                break;
        }
    }, []);

    const updateUndoBuffer = (snapshot: ContentBlockType[]) => {
        undoBuffer.push(snapshot);
        setUndoBuffer(undoBuffer);

        setUndoBufferUsedCapacity(undoBuffer.size());
        setRedoBufferUsedCapacity(0);
        setRedoBuffer(new CircularBuffer<ContentBlockType[]>());
    };

    const updateRowCount = useCallback((rows: number) => {
        setRowCount(rows);
    }, []);
    
    const updateColor = useCallback((color: string) => {
        setColor(color);
    }, []);
    
    const selectLayout = useCallback((layout: Layout) => {
        setCurrentLayout(layout);
    }, []);
    
    const updateMinRows = useCallback((rows: number) => {
        setCurrentMinRows(rows);
    }, []);
    
    const layoutContextValue = useMemo(() => ({
        desktopLayout,
        tabletLayout,
        mobileLayout,
        currentLayout,
        selectLayout,
        currentMinRows,
        updateMinRows
    }), [desktopLayout, tabletLayout, mobileLayout, currentLayout, selectLayout, currentMinRows, updateMinRows]);
    
    const editorContextValue = useMemo(() => ({
        moveContentBlock,
        canMoveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
        rowCount,
        updateRowCount,
        color,
        updateColor
    }), [
        moveContentBlock,
        canMoveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
        rowCount,
        updateRowCount,
        color,
        updateColor
    ]);
    
    const editHistoryContextValue = useMemo(() => ({
        undo,
        undoBufferUsedCapacity,
        redo,
        redoBufferUsedCapacity
    }), [undo, undoBufferUsedCapacity, redo, redoBufferUsedCapacity,]);

    return (
        <LayoutContext.Provider value={layoutContextValue}>
            <EditorContext.Provider value={editorContextValue}>
                <EditHistoryContext.Provider value={editHistoryContextValue}>
                    <div className={styles.PageTemplateEditor}>
                        <PageTemplateEditorHeader
                            onUndo={undo}
                            onRedo={redo}
                        />
                        <DndProvider backend={HTML5Backend}>
                            <Grid/>
                        </DndProvider>
                    </div>
                </EditHistoryContext.Provider>
            </EditorContext.Provider>
        </LayoutContext.Provider>
    );
};

export default PageTemplateEditor;
