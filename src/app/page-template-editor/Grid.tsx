import { EditorContext } from '@/app/page-template-editor/context/EditorContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './styles/Grid.module.scss';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { debounce } from '@/util/debounce';
import GridCell, { GridCellProps } from '@/app/page-template-editor/GridCell';
import ContentBlock from '@/app/page-template-editor/ContentBlock';
import { LayoutContext } from '@/app/page-template-editor/context/LayoutContext';
import { DraggableTypes } from '@/app/page-template-editor/constants/DraggableTypes';
import { ImageBlock } from './models/ImageBlock';
import { HeadlineBlock } from './models/HeadlineBlock';
import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import PageTemplateToolMenu from '@/app/page-template-editor/PageTemplateToolMenu';

const minRows = GridConstants.COLUMNS;

const Grid = () => {
    const layoutContext = useContext(LayoutContext);
    const editorContext = useContext(EditorContext);
    const [gridCells, setGridCells] = useState<GridCellProps[]>([]);
    const [gridCellWidth, setGridCellWidth] = useState<number>(0);
    const [cols] = useState<number>(GridConstants.COLUMNS);
    const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>([0, 0]);
    const [selectedContentBlockId, setSelectedContentBlockId] = useState<string | null>(null);
    const [displayGrid, setDisplayGrid] = useState<boolean>(true);
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
        };

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape' || event.key === 'Delete') {
                if (!selectedContentBlockId) return;
                editorContext.removeContentBlock(layoutContext.currentLayout, selectedContentBlockId);
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
        document.addEventListener('keydown', handleKeyPress);
        window.addEventListener('resize', debouncedAdjustGridSize);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
            document.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('resize', debouncedAdjustGridSize);
        };
    }, [cols, layoutContext.desktopLayout, selectedContentBlockId]);

    useEffect(() => {
        setInitialContentBlocks();
        adjustGridSize();
    }, []);
    
    useEffect(() => {
        if (!editorContext.color) return;
        if (!containerRef.current) return;

        containerRef.current.style.backgroundColor = editorContext.color;
    }, [editorContext.color]);

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

        setRows(desiredRowCount);
    };

    const setRows = (rowCount: number) => {
        const newGridCells: GridCellProps[] = [];

        for (let y = 0; y < rowCount; y++) {
            for (let x = 0; x < cols; x++) {
                newGridCells.push({ x, y });
            }
        }

        setGridCells(newGridCells);
        editorContext.updateRowCount(rowCount);
    };

    const addRow = () => {
        const currentRows = gridCells.length / GridConstants.COLUMNS;
        setRows(currentRows + 1);
    };

    const removeRow = () => {
        const currentRows = gridCells.length / GridConstants.COLUMNS;
        setRows(currentRows - 1);
    };

    const setInitialContentBlocks = () => {
        editorContext.addContentBlock(layoutContext.currentLayout, new HeadlineBlock(DraggableTypes.HEADLINE_BLOCK, 0, 0, 8, 1));
        editorContext.addContentBlock(layoutContext.currentLayout, new ImageBlock(DraggableTypes.IMAGE_BLOCK, 0, 3, 6, 6));
    };

    const calculateCurrentGridCell = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { top, left } = containerRef.current.getBoundingClientRect();

        const x = Math.floor((event.clientX - left) / gridCellWidth);
        const y = Math.floor((event.clientY - top) / gridCellWidth);

        setCurrentCoordinate([x, y]);
    };

    return (
        <div className={styles.container} ref={containerRef} id={styles.grid} onMouseMove={calculateCurrentGridCell}>
            <DndProvider backend={HTML5Backend}>
                {gridCells.map((gridCellProps) =>
                    <GridCell
                        x={gridCellProps.x}
                        y={gridCellProps.y}
                        key={`${gridCellProps.x}-${gridCellProps.y}`}
                        setCoordinate={(x: number, y: number) => setCurrentCoordinate([x, y])}
                        displayGrid={displayGrid}
                    />,
                )}
                {layoutContext.desktopLayout.map(block =>
                    <ContentBlock
                        key={block.id}
                        contentBlock={block}
                        gridCellWidth={gridCellWidth}
                        isSelected={block.id === selectedContentBlockId}
                        onSelect={() => setSelectedContentBlockId(block.id)}
                        onDeselect={() => setSelectedContentBlockId(null)}
                        mouseGridX={currentCoordinate[0]}
                        mouseGridY={currentCoordinate[1]}
                        gridContainerLeft={containerRef.current?.getBoundingClientRect().left || 0}
                        gridContainerTop={containerRef.current?.getBoundingClientRect().top || 0}
                    />,
                )}
                <PageTemplateToolMenu
                    addRow={addRow}
                    removeRow={removeRow}
                    rowCount={gridCells.length / GridConstants.COLUMNS}
                    toggleGrid={() => setDisplayGrid(!displayGrid)}
                    isGridVisible={displayGrid}
                    currentXCoordinate={currentCoordinate[0]}
                    currentYCoordinate={currentCoordinate[1]}
                />
            </DndProvider>
        </div>
    );
};

export default Grid;
