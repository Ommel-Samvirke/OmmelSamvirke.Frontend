import styles from './styles/GridCell.module.scss';

import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import DropOverlay from '@/features/pages/components/grid/DropOverlay';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { DragSource } from '@/features/pages/enums/DragSource';
import { useContentBlockManager } from '@/features/pages/hooks/useContentBlockManager';
import { IDraggableItem } from '@/features/pages/interfaces/IDraggableItem';
import { ContentBlockFactory } from '@/features/pages/models/ContentBlockFactory';
import { HeadlineBlock } from '@/features/pages/models/HeadlineBlock';
import { ImageBlock } from '@/features/pages/models/ImageBlock';
import { PdfBlock } from '@/features/pages/models/PdfBlock';
import { SlideshowBlock } from '@/features/pages/models/SlideshowBlock';
import { TextBlock } from '@/features/pages/models/TextBlock';
import { VideoBlock } from '@/features/pages/models/VideoBlock';

export interface GridCellProps {
    x: number;
    y: number;
    children?: React.ReactNode;
    setCoordinate?: (x: number, y: number) => void;
    displayGrid?: boolean;
}

const GridCell = (props: GridCellProps) => {
    const [gridBorderColor, setGridBorderColor] = useState<string>('#e0e0e0');
    const layoutContext = useContext(LayoutContext);
    const contentBlockManager = useContentBlockManager();

    useEffect(() => {
        let colorWithoutHash = layoutContext.color;

        if (layoutContext.color.startsWith('#')) {
            colorWithoutHash = layoutContext.color.slice(1);
        }

        let output = '#';
        for (let i = 0; i < 3; i++) {
            let colorComponent = parseInt(colorWithoutHash.substring(i * 2, i * 2 + 2), 16);
            colorComponent = Math.floor(colorComponent * 0.85);

            output += ('0' + colorComponent.toString(16)).slice(-2);
        }

        setGridBorderColor(output);
    }, [layoutContext.color]);

    const setCoordinate = (x: number, y: number) => {
        if (!props.setCoordinate) return;
        props.setCoordinate(x, y);
    };

    const [{ isOver, canDrop }, drop] = useDrop<IDraggableItem, void, { isOver: boolean; canDrop: boolean }>(
        () => ({
            accept: [
                ContentBlock.HEADLINE_BLOCK,
                ContentBlock.TEXT_BLOCK,
                ContentBlock.IMAGE_BLOCK,
                ContentBlock.PDF_BLOCK,
                ContentBlock.VIDEO_BLOCK,
                ContentBlock.SLIDESHOW_BLOCK,
            ],
            canDrop: (item: IDraggableItem) => {
                const rowCount = layoutContext.getRowCount();
                if (item.source === DragSource.TOOL_MENU) {
                    switch (item.type) {
                        case ContentBlock.HEADLINE_BLOCK:
                            return contentBlockManager.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                rowCount,
                                HeadlineBlock.defaultWidth,
                                HeadlineBlock.defaultHeight,
                            );
                        case ContentBlock.TEXT_BLOCK:
                            return contentBlockManager.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                rowCount,
                                TextBlock.defaultWidth,
                                TextBlock.defaultHeight,
                            );
                        case ContentBlock.IMAGE_BLOCK:
                            return contentBlockManager.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                rowCount,
                                ImageBlock.defaultWidth,
                                ImageBlock.defaultHeight,
                            );
                        case ContentBlock.PDF_BLOCK:
                            return contentBlockManager.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                rowCount,
                                PdfBlock.defaultWidth,
                                PdfBlock.defaultHeight,
                            );
                        case ContentBlock.VIDEO_BLOCK:
                            return contentBlockManager.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                rowCount,
                                VideoBlock.defaultWidth,
                                VideoBlock.defaultHeight,
                            );
                        case ContentBlock.SLIDESHOW_BLOCK:
                            return contentBlockManager.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                rowCount,
                                SlideshowBlock.defaultWidth,
                                SlideshowBlock.defaultHeight,
                            );
                    }
                }

                return contentBlockManager.canMoveContentBlock(item.id, props.x, props.y, rowCount);
            },
            drop: (item: IDraggableItem) => {
                if (item.source === DragSource.TOOL_MENU) {
                    contentBlockManager.addContentBlock(
                        ContentBlockFactory.createContentBlock(
                            layoutContext.currentLayout,
                            item.type,
                            props.x,
                            props.y,
                        ),
                    );
                } else if (item.source === DragSource.CONTENT_BLOCK) {
                    contentBlockManager.moveContentBlock(item.id, props.x, props.y, layoutContext.getRowCount());
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [
            props.x,
            props.y,
            layoutContext.currentLayout,
            layoutContext.getCurrentLayoutContent,
            layoutContext.getRowCount,
        ],
    );

    return (
        <div
            ref={drop}
            className={styles.gridCell}
            onMouseEnter={() => setCoordinate(props.x, props.y)}
            style={{
                border: props.displayGrid ? `1px solid ${gridBorderColor}` : 'none',
            }}
        >
            {isOver && canDrop && <DropOverlay color={'yellow'} />}
            {isOver && !canDrop && <DropOverlay color={'red'} />}

            {props.children}
        </div>
    );
};

export default GridCell;
