import styles from "./styles/Grid.module.scss";

import React, {useContext, useEffect, useRef, useState} from 'react';
import {debounce} from '@/util/debounce';
import GridCell, {GridCellProps} from '@/app/page-template-editor/GridCell';
import ContentBlock from '@/app/page-template-editor/ContentBlock';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';

const minRows = 25;

const Grid = () => {
    const [gridCells, setGridCells] = useState<GridCellProps[]>([]);
    const [gridCellWidth, setGridCellWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols] = useState<number>(24);
    const gridContext = useContext(GridContext);

    useEffect(() => {
        const debouncedAdjustGridSize = debounce(adjustGridSize, 150);

        window.addEventListener('resize', debouncedAdjustGridSize);
        return () => window.removeEventListener('resize', debouncedAdjustGridSize);  // Cleanup listener
    }, [cols]);

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
        
        gridContext.addContentBlock({
            id: '1',
            x: 0,
            y: 0,
            width: 8,
            height: 1
        });
        
        gridContext.addContentBlock({
            id: '2',
            x: 0,
            y: 6,
            width: 8,
            height: 2
        });
    }

    return (
        <div className={styles.container} ref={containerRef} id={styles.grid}>
            {gridCells.map((gridCellProps) =>
                <GridCell
                    x={gridCellProps.x}
                    y={gridCellProps.y}
                    key={`${gridCellProps.x}-${gridCellProps.y}`} 
                />
            )}
            {gridContext.contentBlocks.map(block =>
                <ContentBlock
                    key={block.id}
                    id={block.id}
                    width={block.width}
                    height={block.height}
                    x={block.x}
                    y={block.y}
                    gridCellWidth={gridCellWidth}
                    type={DraggableTypes.HEADLINE_BLOCK}
                />
            )}
        </div>
    );
}

export default Grid;
