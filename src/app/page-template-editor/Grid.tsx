import styles from "./styles/Grid.module.scss";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {debounce} from '@/util/debounce';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import GridCell, {GridCellProps} from '@/app/page-template-editor/GridCell';
import ContentBlock from '@/app/page-template-editor/ContentBlock';
import IContentBlock from '@/app/page-template-editor/interfaces/IContentBlock';
import {canResizeOrMove} from '@/app/page-template-editor/helpers/ContentBlockHelpers';

const minRows = 25;

const Grid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols] = useState<number>(24);
    const [gridCells, setGridCells] = useState<GridCellProps[]>([]);
    const [contentBlocks, setContentBlocks] = useState<IContentBlock[]>([]);
    const [gridCellWidth, setGridCellWidth] = useState<number>(0);
    const contentBlocksRef = useRef(contentBlocks);

    useEffect(() => {
        const debouncedAdjustGridSize = debounce(adjustGridSize, 150);

        window.addEventListener('resize', debouncedAdjustGridSize);
        return () => window.removeEventListener('resize', debouncedAdjustGridSize);  // Cleanup listener
    }, [cols]);

    useEffect(() => {
        contentBlocksRef.current = contentBlocks;
    }, [contentBlocks]);

    useEffect(() => {
        setInitialContentBlocks();
        adjustGridSize();
    }, []);
    
    const adjustGridSize = () => {
        if (!containerRef.current) return;
        
        const tempCell = document.createElement('div');
        tempCell.className = styles.gridCell;
        containerRef.current.appendChild(tempCell);
        const actualCellWidth = tempCell.getBoundingClientRect().width;
        setGridCellWidth(actualCellWidth);
        containerRef.current.removeChild(tempCell);
        
        const rowsForViewportHeight = Math.ceil(window.innerHeight / actualCellWidth) - 2;
        const desiredRowCount = Math.max(minRows, rowsForViewportHeight);

        addRows(desiredRowCount);
    };

    const addRows = (rowCount: number) => {
        const newGridCells: GridCellProps[] = [];

        for (let y = 0; y < rowCount; y++) {
            for (let x = 0; x < cols; x++) {
                newGridCells.push({ x, y });
            }
        }

        setGridCells(newGridCells);
    };
    
    const setInitialContentBlocks = () => {
        setContentBlocks([
            {
                id: '1',
                x: 0,
                y: 0,
                width: 2,
                height: 1
            },
            {
                id: '2',
                x: 3,
                y: 2,
                width: 1,
                height: 2
            }
        ])
    }

    const moveContentBlock = useCallback((id: string, x: number, y: number) => {
        setContentBlocks(prevBlocks =>
            prevBlocks.map(block =>
                block.id === id ? { ...block, x, y } : block
            )
        );
    }, []);

    const canMoveContentBlock = useCallback((id: string, x: number, y: number) => {
        const contentBlock: IContentBlock | undefined = contentBlocksRef.current.find(block => block.id === id);
        if(!contentBlock) return false;
        
        return canResizeOrMove(contentBlock.width, contentBlock.height, x, y, id, contentBlocks);
    }, [contentBlocks]);

    const resizeContentBlock = useCallback((id: string, width: number, height: number) => {
        setContentBlocks(prevBlocks =>
            prevBlocks.map(block =>
                block.id === id ? { ...block, width, height } : block
            )
        );
    }, []);

    return (
        <GridContext.Provider value={{ contentBlocks, moveContentBlock, canMoveContentBlock, resizeContentBlock }}>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.container} ref={containerRef} id={styles.grid}>
                    {gridCells.map((gridCellProps) =>
                        <GridCell
                            x={gridCellProps.x}
                            y={gridCellProps.y}
                            key={`${gridCellProps.x}-${gridCellProps.y}`} 
                        />
                    )}
                    {contentBlocks.map(block =>
                        <ContentBlock
                            key={block.id}
                            id={block.id}
                            width={block.width}
                            height={block.height}
                            x={block.x}
                            y={block.y}
                            gridCellWidth={gridCellWidth}
                        />
                    )}
                </div>
            </DndProvider>
        </GridContext.Provider>
    );
}

export default Grid;
