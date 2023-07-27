import { EditorContext } from '@/app/page-template-editor/context/EditorContext';
import styles from './styles/GridCell.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { DraggableTypes } from '@/app/page-template-editor/constants/DraggableTypes';
import { useDrop } from 'react-dnd';
import { LayoutContext } from '@/app/page-template-editor/context/LayoutContext';
import DropOverlay from '@/app/page-template-editor/DropOverlay';
import { IDraggableItem } from '@/app/page-template-editor/interfaces/IDraggableItem';
import { DragSource } from '@/app/page-template-editor/constants/DragSource';
import { HeadlineBlock } from './models/HeadlineBlock';
import { TextBlock } from './models/TextBlock';
import { ImageBlock } from './models/ImageBlock';
import { PdfBlock } from './models/PdfBlock';
import { VideoBlock } from './models/VideoBlock';
import { SlideshowBlock } from './models/SlideshowBlock';
import { ContentBlockFactory } from './models/ContentBlockFactory';

export interface GridCellProps {
    x: number,
    y: number,
    children?: React.ReactNode,
    setCoordinate?: (x: number, y: number) => void
    displayGrid?: boolean;
}

const GridCell = (props: GridCellProps) => {
    const [gridBorderColor, setGridBorderColor] = useState<string>('#e0e0e0');
    const layoutContext = useContext(LayoutContext);
    const editorContext = useContext(EditorContext);

    useEffect(() => {
        let colorWithoutHash = editorContext.color;
        
        if (editorContext.color.startsWith("#")) {
            colorWithoutHash = editorContext.color.slice(1);
        }
        
        let output = "#";
        for (let i = 0; i < 3; i++) {
            let colorComponent = parseInt(colorWithoutHash.substring(i * 2, i * 2 + 2), 16);
            colorComponent = Math.floor(colorComponent * 0.85);
            
            output += ("0" + colorComponent.toString(16)).slice(-2);
        }

        setGridBorderColor(output);
    }, [editorContext.color])
    
    const setCoordinate = (x: number, y: number) => {
        if (!props.setCoordinate) return;
        props.setCoordinate(x, y);
    };

    const [{ isOver, canDrop }, drop] = useDrop<IDraggableItem, void, { isOver: boolean, canDrop: boolean }>(() => ({
        accept: [
            DraggableTypes.HEADLINE_BLOCK,
            DraggableTypes.TEXT_BLOCK,
            DraggableTypes.IMAGE_BLOCK,
            DraggableTypes.PDF_BLOCK,
            DraggableTypes.VIDEO_BLOCK,
            DraggableTypes.SLIDESHOW_BLOCK,
        ],
        canDrop: (item: IDraggableItem) => {
            if (item.source === DragSource.TOOL_MENU) {
                switch (item.type) {
                    case DraggableTypes.HEADLINE_BLOCK:
                        return editorContext.canMoveContentBlock(layoutContext.currentLayout, item.id, props.x, props.y, HeadlineBlock.defaultWidth, HeadlineBlock.defaultHeight);
                    case DraggableTypes.TEXT_BLOCK:
                        return editorContext.canMoveContentBlock(layoutContext.currentLayout, item.id, props.x, props.y, TextBlock.defaultWidth, TextBlock.defaultHeight);
                    case DraggableTypes.IMAGE_BLOCK:
                        return editorContext.canMoveContentBlock(layoutContext.currentLayout, item.id, props.x, props.y, ImageBlock.defaultWidth, ImageBlock.defaultHeight);
                    case DraggableTypes.PDF_BLOCK:
                        return editorContext.canMoveContentBlock(layoutContext.currentLayout, item.id, props.x, props.y, PdfBlock.defaultWidth, PdfBlock.defaultHeight);
                    case DraggableTypes.VIDEO_BLOCK:
                        return editorContext.canMoveContentBlock(layoutContext.currentLayout, item.id, props.x, props.y, VideoBlock.defaultWidth, VideoBlock.defaultHeight);
                    case DraggableTypes.SLIDESHOW_BLOCK:
                        return editorContext.canMoveContentBlock(layoutContext.currentLayout, item.id, props.x, props.y, SlideshowBlock.defaultWidth, SlideshowBlock.defaultHeight);
                }
            }

            return editorContext.canMoveContentBlock(layoutContext.currentLayout,item.id, props.x, props.y);
        },
        drop: (item: IDraggableItem) => {
            if (item.source === DragSource.TOOL_MENU) {
                editorContext.addContentBlock(layoutContext.currentLayout, ContentBlockFactory.createContentBlock(item.type, props.x, props.y));
            } else if (item.source === DragSource.CONTENT_BLOCK) {
                editorContext.moveContentBlock(layoutContext.currentLayout, item.id, props.x, props.y);
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }),
    [props.x, props.y]);

    return (
        <div
            ref={drop}
            className={styles.gridCell}
            onMouseEnter={() => setCoordinate(props.x, props.y)}
            style={{ border: props.displayGrid ? `1px solid ${gridBorderColor}` : 'none' }}
        >
            {isOver && canDrop && <DropOverlay color={'yellow'}/>}
            {isOver && !canDrop && <DropOverlay color={'red'}/>}

            {props.children}
        </div>
    );
};

export default GridCell;
