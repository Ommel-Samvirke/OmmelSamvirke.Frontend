"use client";

import styles from "./styles/PageTemplateEditor.module.scss";

import Grid from '@/app/page-template-editor/Grid';
import PageTemplateEditorHeader from '@/app/page-template-editor/PageTemplateEditorHeader';
import PageTemplateToolMenu from '@/app/page-template-editor/PageTemplateToolMenu';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {canResizeOrMove} from '@/app/page-template-editor/helpers/ContentBlockHelpers';
import {ContentBlockType} from '@/app/page-template-editor/types/ContentBlockType';

const PageTemplateEditor = () => {
    const [contentBlocks, setContentBlocks] = useState<ContentBlockType[]>([]);
    const contentBlocksRef = useRef(contentBlocks);

    useEffect(() => {
        contentBlocksRef.current = contentBlocks;
    }, [contentBlocks]);
    
    const moveContentBlock = useCallback((id: string, x: number, y: number) => {
        setContentBlocks(prevBlocks =>
            prevBlocks.map(block =>
                block.id === id ? { ...block, x, y } : block
            )
        );
    }, []);

    const canMoveContentBlock = useCallback((id: string, x: number, y: number, width?: number, height?: number) => {
        const contentBlock: ContentBlockType | undefined = contentBlocksRef.current.find(block => block.id === id);
        if(!contentBlock) {
            if (!width || !height) return false;
            return canResizeOrMove(width, height, x, y, id, contentBlocksRef.current);
        }

        return canResizeOrMove(contentBlock.width, contentBlock.height, x, y, id, contentBlocksRef.current);
    }, [contentBlocksRef]);

    const resizeContentBlock = useCallback((id: string, width: number, height: number) => {
        setContentBlocks(prevBlocks =>
            prevBlocks.map(block =>
                block.id === id ? { ...block, width, height } : block
            )
        );
    }, []);
    
    const addContentBlock = useCallback((contentBlock: ContentBlockType) => {
        setContentBlocks(prevBlocks => [...prevBlocks, contentBlock]);
    }, []);
    
    const removeContentBlock = useCallback((id: string) => {
        setContentBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
    }, []);
    
    const saveSnapshot = useCallback(() => {
        console.log(contentBlocks);
    }, [contentBlocks]);
    
    const undo = useCallback(() => {
        console.log('undo');
    }, []);
    
    const redo = useCallback(() => {
        console.log('redo');
    }, []);
    
    const contextValue = useMemo(() => ({
        contentBlocks,
        moveContentBlock,
        canMoveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
        saveSnapshot,
        undo,
        redo
    }), [
        contentBlocks,
        moveContentBlock,
        canMoveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
        saveSnapshot,
        undo,
        redo
    ]);
    
    return (
        <GridContext.Provider value={contextValue}>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.PageTemplateEditor}>
                    <PageTemplateEditorHeader />
                    <Grid />
                    <PageTemplateToolMenu />
                </div>
            </DndProvider>
        </GridContext.Provider>
    );
    
};

export default PageTemplateEditor;
