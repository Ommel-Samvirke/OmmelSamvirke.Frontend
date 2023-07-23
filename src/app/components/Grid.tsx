"use client";

import styles from "./Grid.module.scss";

import React, {useEffect, useRef, useState} from 'react';
import GridSquare, {GridSquareProps} from '@/app/components/GridSquare';

const Grid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols] = useState<number>(24);
    const [gridSquares, setGridSquares] = useState<GridSquareProps[]>([]);

    const computeRows = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const squareWidth = containerWidth / cols;
            const viewportHeight = window.innerHeight;
            return Math.ceil(viewportHeight / squareWidth);
        }
        
        return cols;
    };

    const addRows = (rowCount: number) => {
        let newGridSquares: GridSquareProps[] = [];

        for (let y = 0; y < rowCount; y++) {
            for (let x = 0; x < cols; x++) {
                newGridSquares.push({ x, y });
            }
        }

        setGridSquares(prev => [...prev, ...newGridSquares]);
    };
    
    useEffect(() => {
        const initialRowCount = computeRows();
        addRows(initialRowCount);
    }, [cols]);
    
    
    return (
        <div className={styles.container} ref={containerRef}>
            {gridSquares.map((gridSquareProps) =>
                <GridSquare x={gridSquareProps.x} y={gridSquareProps.y} key={`${gridSquareProps.x}-${gridSquareProps.y}`}/>
            )}
        </div>
    );
}

export default Grid;
