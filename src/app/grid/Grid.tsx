"use client";

import styles from "./Grid.module.scss";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {debounce} from '@/util/debounce';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {GridContext} from '@/app/grid/context/GridContext';
import GridCell, {GridCellProps} from '@/app/grid/GridCell';
import ContentBlock from '@/app/grid/ContentBlock';
import IContentBlock from '@/app/grid/interfaces/IContentBlock';

const minRows = 0;

const Grid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols] = useState<number>(24);
    const [gridCells, setGridCells] = useState<GridCellProps[]>([]);
    const [contentBlocks, setContentBlocks] = useState<IContentBlock[]>([]);
    const [gridCellWidth, setGridCellWidth] = useState<number>(0);
    
    const adjustGridSize = () => {
        if (!containerRef.current) return;
        
        const tempCell = document.createElement('div');
        tempCell.className = styles.gridCell;
        containerRef.current.appendChild(tempCell);
        const actualCellWidth = tempCell.getBoundingClientRect().width;
        setGridCellWidth(actualCellWidth);
        containerRef.current.removeChild(tempCell);
        
        const rowsForViewportHeight = Math.ceil(window.innerHeight / actualCellWidth);
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

    useEffect(() => {
        const debouncedAdjustGridSize = debounce(adjustGridSize, 150);
        
        window.addEventListener('resize', debouncedAdjustGridSize);
        return () => window.removeEventListener('resize', debouncedAdjustGridSize);  // Cleanup listener
    }, [cols]);

    const findContentBlockAt = (x: number, y: number) => {
        return contentBlocks.find(
            (contentBlock) => contentBlock.x === x && contentBlock.y === y
        );
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

    const canMoveContentBlock = useCallback((id: string, x: number, y: number, width: number, height: number) => {
        for(let i = 0; i < width; i++){
            for(let j = 0; j < height; j++){
                const contentBlockAt = findContentBlockAt(x + i, y + j);
                if(contentBlockAt && contentBlockAt.id !== id){
                    return false;
                }
            }
        }
        return true;
    }, [contentBlocks]);

    useEffect(() => {
        setInitialContentBlocks();
        adjustGridSize();
    }, []);

    return (
        <GridContext.Provider value={{ contentBlocks, moveContentBlock, canMoveContentBlock }}>
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
