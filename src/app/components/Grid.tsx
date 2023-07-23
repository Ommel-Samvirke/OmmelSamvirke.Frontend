"use client";

import styles from "./Grid.module.scss";

import React, {useEffect, useRef, useState} from 'react';
import GridCell, {GridCellProps} from '@/app/components/GridCell';
import {debounce} from '@/util/debounce';

const minRows = 0;

const Grid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols] = useState<number>(24);
    const [gridSquares, setGridSquares] = useState<GridCellProps[]>([]);

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
            containerRef.current.style.overflowY = 'hidden';  // Ensure no scrolling
        } else {
            containerRef.current.style.height = 'auto';  // Let it grow beyond viewport
            containerRef.current.style.overflowY = 'scroll';  // Enable scrolling
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

    return (
        <div className={styles.container} ref={containerRef} id={styles.grid}>
            {gridSquares.map((gridSquareProps) =>
                <GridCell x={gridSquareProps.x} y={gridSquareProps.y} key={`${gridSquareProps.x}-${gridSquareProps.y}`}/>
            )}
        </div>
    );
}

export default Grid;
