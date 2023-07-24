"use client";

import styles from "./styles/PageTemplateEditor.module.scss";

import Grid from '@/app/page-template-editor/Grid';
import PageTemplateEditorHeader from '@/app/page-template-editor/PageTemplateEditorHeader';
import PageTemplateToolMenu from '@/app/page-template-editor/PageTemplateToolMenu';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import {useCallback, useEffect, useRef, useState} from 'react';
import IContentBlock from '@/app/page-template-editor/interfaces/IContentBlock';
import {canResizeOrMove} from '@/app/page-template-editor/helpers/ContentBlockHelpers';

const PageTemplateEditor = () => {
    const [contentBlocks, setContentBlocks] = useState<IContentBlock[]>([]);
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
        const contentBlock: IContentBlock | undefined = contentBlocksRef.current.find(block => block.id === id);
        if(!contentBlock) {
            if (!width || !height) return false;
            return canResizeOrMove(width, height, x, y, id, contentBlocksRef.current);
        }

        return canResizeOrMove(contentBlock.width, contentBlock.height, x, y, id, contentBlocksRef.current);
    }, [contentBlocks]);

    const resizeContentBlock = useCallback((id: string, width: number, height: number) => {
        setContentBlocks(prevBlocks =>
            prevBlocks.map(block =>
                block.id === id ? { ...block, width, height } : block
            )
        );
    }, []);
    
    const addContentBlock = useCallback((contentBlock: IContentBlock) => {
        setContentBlocks(prevBlocks => [...prevBlocks, contentBlock]);
    }, []);
    
    const removeContentBlock = useCallback((id: string) => {
        setContentBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
    }, []);
    
    return (
        <GridContext.Provider value={{ contentBlocks, moveContentBlock, canMoveContentBlock, resizeContentBlock, addContentBlock, removeContentBlock }}>
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
