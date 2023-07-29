import styles from './styles/Grid.module.scss';

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ContentBlockComponent from '@/features/pages/components/content-blocks/ContentBlockComponent';
import GridCell, { GridCellProps } from '@/features/pages/components/grid/GridCell';
import ToolMenu from '@/features/pages/components/tool-menu/ToolMenu';
import { GridConstants } from '@/features/pages/constants/GridConstants';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { Layout } from '@/features/pages/enums/Layouts';
import { useContentBlockManager } from '@/features/pages/hooks/useContentBlockManager';
import { debounce } from '@/util/debounce';
import classNames from 'classnames';

const Grid = () => {
    const layoutContext = useContext(LayoutContext);
    const contentBlockManager = useContentBlockManager();
    const [gridCells, setGridCells] = useState<GridCellProps[]>([]);
    const [gridCellWidth, setGridCellWidth] = useState<number>(0);
    const [cols] = useState<number>(GridConstants.COLUMNS);
    const [currentCoordinate, setCurrentCoordinate] = useState<[number, number]>([0, 0]);
    const [selectedContentBlockId, setSelectedContentBlockId] = useState<string | null>(null);
    const [displayGrid, setDisplayGrid] = useState<boolean>(true);
    const [minRows, setMinRows] = useState<number>(GridConstants.COLUMNS);
    const [didLayoutChange, setDidLayoutChange] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const addRow = useCallback(() => {
        layoutContext.updateRowCount(layoutContext.getRowCount() + 1);
    }, [layoutContext]);

    const removeRow = useCallback(() => {
        layoutContext.updateRowCount(layoutContext.getRowCount() - 1);
    }, [layoutContext]);

    const calculateGridCellWidth = useCallback(() => {
        if (!containerRef.current) return;

        const tempCell = document.createElement('div');
        tempCell.className = styles.gridCell;
        containerRef.current.appendChild(tempCell);
        const actualCellWidth = tempCell.getBoundingClientRect().width;
        setGridCellWidth(actualCellWidth);
        containerRef.current.removeChild(tempCell);
    }, []);

    useEffect(() => {
        const newGridCells: GridCellProps[] = [];

        for (let y = 0; y < layoutContext.getRowCount(); y++) {
            for (let x = 0; x < cols; x++) {
                newGridCells.push({ x, y });
            }
        }

        setGridCells(() => newGridCells);
    }, [cols, layoutContext]);

    useEffect(() => {
        let lowestRowWithContent = 0;

        layoutContext.getCurrentLayoutContent().forEach((contentBlock) => {
            if (contentBlock.y + contentBlock.height > lowestRowWithContent) {
                lowestRowWithContent = contentBlock.y + contentBlock.height;
            }
        });

        if (didLayoutChange && lowestRowWithContent < minRows) {
            layoutContext.updateRowCount(minRows);
        }

        if (didLayoutChange && lowestRowWithContent >= minRows) {
            layoutContext.updateRowCount(lowestRowWithContent);
        }

        setDidLayoutChange(false);
    }, [gridCells, layoutContext, minRows, layoutContext.currentLayout, didLayoutChange]);

    useEffect(() => {
        calculateGridCellWidth();
        setDidLayoutChange(true);
    }, [layoutContext.currentLayout, calculateGridCellWidth]);

    useEffect(() => {
        calculateGridCellWidth();
    }, [calculateGridCellWidth]);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            const target = event.target as Element;

            if (target.closest('.content-block-controls')) {
                return;
            }

            if (target.closest('.content-block')) {
                return;
            }

            if (target.closest('.MuiTooltip-root')) {
                return;
            }

            setSelectedContentBlockId(null);
        };

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedContentBlockId(null);
            }

            if (event.key === 'Delete') {
                if (!selectedContentBlockId) return;
                contentBlockManager.removeContentBlock(selectedContentBlockId);
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [cols, layoutContext, contentBlockManager, selectedContentBlockId]);

    useEffect(() => {
        const debouncedAdjustGridSize = debounce(() => {
            if (layoutContext.getRowCount() < layoutContext.currentMinRows) {
                layoutContext.updateRowCount(layoutContext.currentMinRows);
            }
        }, 150);
        window.addEventListener('resize', debouncedAdjustGridSize);

        return () => {
            window.removeEventListener('resize', debouncedAdjustGridSize);
        };
    }, [layoutContext]);

    useEffect(() => {
        if (layoutContext.getRowCount() < layoutContext.currentMinRows) {
            layoutContext.updateRowCount(layoutContext.currentMinRows);
        }
    }, [layoutContext]);

    useEffect(() => {
        let columnMultiplier: number = 1;

        switch (layoutContext.currentLayout) {
            case Layout.DESKTOP:
                columnMultiplier = 0.85;
                break;
            case Layout.TABLET:
                columnMultiplier = 1.5;
                break;
            case Layout.MOBILE:
                columnMultiplier = 3;
                break;
        }

        setMinRows(() => Math.floor(GridConstants.COLUMNS * columnMultiplier));
        layoutContext.updateMinRows(Math.floor(GridConstants.COLUMNS * columnMultiplier));
    }, [layoutContext]);

    useEffect(() => {
        if (!layoutContext.color) return;
        if (!containerRef.current) return;

        containerRef.current.style.backgroundColor = layoutContext.color;
    }, [layoutContext.color]);

    const calculateCurrentGridCell = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { top, left } = containerRef.current.getBoundingClientRect();

        const x = Math.floor((event.clientX - left) / gridCellWidth);
        const y = Math.floor((event.clientY - top) / gridCellWidth);

        setCurrentCoordinate([x, y]);
    };

    const className = classNames(styles.container, {
        [styles.desktop]: layoutContext.currentLayout === Layout.DESKTOP,
        [styles.tablet]: layoutContext.currentLayout === Layout.TABLET,
        [styles.mobile]: layoutContext.currentLayout === Layout.MOBILE,
    });

    return (
        <div className={className} ref={containerRef} id={styles.grid} onMouseMove={calculateCurrentGridCell}>
            <DndProvider backend={HTML5Backend}>
                {gridCells.map((gridCellProps) => (
                    <GridCell
                        x={gridCellProps.x}
                        y={gridCellProps.y}
                        key={`${gridCellProps.x}-${gridCellProps.y}`}
                        setCoordinate={(x: number, y: number) => setCurrentCoordinate([x, y])}
                        displayGrid={displayGrid}
                    />
                ))}
                {layoutContext.currentLayout === Layout.DESKTOP &&
                    layoutContext.desktopLayout?.map((block) => (
                        <ContentBlockComponent
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
                        />
                    ))}
                {layoutContext.currentLayout === Layout.TABLET &&
                    layoutContext.tabletLayout.map((block) => (
                        <ContentBlockComponent
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
                        />
                    ))}
                {layoutContext.currentLayout === Layout.MOBILE &&
                    layoutContext.mobileLayout.map((block) => (
                        <ContentBlockComponent
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
                        />
                    ))}
                <ToolMenu
                    addRow={addRow}
                    removeRow={removeRow}
                    rowCount={gridCells.length / GridConstants.COLUMNS}
                    toggleGrid={() => setDisplayGrid(!displayGrid)}
                    isGridVisible={displayGrid}
                    currentXCoordinate={currentCoordinate[0]}
                    currentYCoordinate={currentCoordinate[1]}
                    minRows={minRows}
                />
            </DndProvider>
        </div>
    );
};

export default Grid;
