import styles from "./styles/Grid.module.scss";

import React, {useContext, useEffect, useRef, useState} from 'react';
import {debounce} from '@/util/debounce';
import GridCell, {GridCellProps} from '@/app/page-template-editor/GridCell';
import ContentBlock from '@/app/page-template-editor/ContentBlock';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import { ImageBlock } from "./models/ImageBlock";
import { HeadlineBlock } from "./models/HeadlineBlock";
import CoordinateWidget from '@/app/page-template-editor/CoordinateWidget';
import {GridConstants} from '@/app/page-template-editor/constants/GridConstants';

const minRows = GridConstants.COLUMNS;

const Grid = () => {
    const gridContext = useContext(GridContext);
    const [gridCells, setGridCells] = useState<GridCellProps[]>([]);
    const [gridCellWidth, setGridCellWidth] = useState<number>(0);
    const [cols] = useState<number>(GridConstants.COLUMNS);
    const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>([0,0]);
    const [selectedContentBlockId, setSelectedContentBlockId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const debouncedAdjustGridSize = debounce(adjustGridSize, 150);
        const handleDocumentClick = (event: MouseEvent) => {
            const target = event.target as Element;

            if (target.closest('.content-block-controls')) {
                return;
            }

            if (target.closest('.content-block')) {
                return;
            }
            
            setSelectedContentBlockId(null);
        }
        
        const handleKeyPress = (event: KeyboardEvent) => {
            console.log(selectedContentBlockId)
            if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Delete') {
                if (!selectedContentBlockId) return;
                gridContext.removeContentBlock(selectedContentBlockId);
            }
        };
        
        document.addEventListener('mousedown', handleDocumentClick);
        document.addEventListener('keydown', handleKeyPress);
        window.addEventListener('resize', debouncedAdjustGridSize);
        
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
            document.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('resize', debouncedAdjustGridSize);
        }
    }, [cols, gridContext.contentBlocks, selectedContentBlockId]);

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
        gridContext.addContentBlock(new HeadlineBlock(DraggableTypes.HEADLINE_BLOCK, 0, 0, 8, 1));
        gridContext.addContentBlock(new ImageBlock( DraggableTypes.IMAGE_BLOCK, 0, 3, 6, 6));
    }

    const calculateCurrentGridCell = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;  
        const { top, left } = containerRef.current.getBoundingClientRect();
        
        const x = Math.floor((event.clientX - left) / gridCellWidth);
        const y = Math.floor((event.clientY - top) / gridCellWidth);

        setCurrentCoordinate([x, y]);
    }

    return (
        <div className={styles.container} ref={containerRef} id={styles.grid} onMouseMove={calculateCurrentGridCell}>
            {gridCells.map((gridCellProps) =>
                <GridCell
                    x={gridCellProps.x}
                    y={gridCellProps.y}
                    key={`${gridCellProps.x}-${gridCellProps.y}`}
                    setCoordinate={(x: number, y: number) => setCurrentCoordinate([x, y])}
                />
            )}
            {gridContext.contentBlocks.map(block =>
                <ContentBlock
                    key={block.id}
                    contentBlock={block}
                    gridCellWidth={gridCellWidth}
                    isSelected={block.id === selectedContentBlockId}
                    onSelect={() => setSelectedContentBlockId(block.id)}
                    onDeselect={() => setSelectedContentBlockId(null)}
                />
            )}
            <CoordinateWidget x={currentCoordinate[0]} y={currentCoordinate[1]} />
        </div>
    );
}

export default Grid;
