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
    const [gridSquares, setGridSquares] = useState<GridCellProps[]>([]);
    const [contentBlocks, setContentBlocks] = useState<IContentBlock[]>([]);

    const adjustGridSize = () => {
        if (!containerRef.current) return;
        
        const tempSquare = document.createElement('div');
        tempSquare.className = styles.gridSquare;
        containerRef.current.appendChild(tempSquare);
        const actualSquareWidth = tempSquare.offsetWidth;
        containerRef.current.removeChild(tempSquare);
        
        const rowsForViewportHeight = Math.ceil(window.innerHeight / actualSquareWidth);
        const desiredRowCount = Math.max(minRows, rowsForViewportHeight);
        const containerHeight = actualSquareWidth * desiredRowCount;

        if (desiredRowCount <= rowsForViewportHeight) {
            containerRef.current.style.height = `${containerHeight}px`;
            containerRef.current.style.overflowY = 'hidden';
        } else {
            containerRef.current.style.height = 'auto';
            containerRef.current.style.overflowY = 'scroll';
        }

        addRows(desiredRowCount);
    };

    const addRows = (rowCount: number) => {
        const newGridSquares: GridCellProps[] = [];

        for (let y = 0; y < rowCount; y++) {
            for (let x = 0; x < cols; x++) {
                newGridSquares.push({ x, y });
            }
        }

        setGridSquares(newGridSquares);
    };

    useEffect(() => {
        adjustGridSize();

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
                y: 0
            },
            {
                id: '2',
                x: 3,
                y: 2
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
        const contentBlockAt = findContentBlockAt(x, y);
        return !contentBlockAt || contentBlockAt.id === id;
    }, [contentBlocks]);
    
    useEffect(() => {
        setInitialContentBlocks();
    }, []);

    return (
        <GridContext.Provider value={{ contentBlocks, moveContentBlock, canMoveContentBlock }}>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.container} ref={containerRef} id={styles.grid}>
                    {gridSquares.map((gridSquareProps) =>
                        <GridCell x={gridSquareProps.x} y={gridSquareProps.y} key={`${gridSquareProps.x}-${gridSquareProps.y}`}>
                            {
                                findContentBlockAt(gridSquareProps.x, gridSquareProps.y) &&
                                <ContentBlock id={findContentBlockAt(gridSquareProps.x, gridSquareProps.y)!.id} />
                            }
                        </GridCell>
                    )}
                </div>
            </DndProvider>
        </GridContext.Provider>
    );
}

export default Grid;
