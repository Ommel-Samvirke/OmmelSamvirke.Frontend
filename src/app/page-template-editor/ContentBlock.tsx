import styles from './styles/ContentBlock.module.scss';
import 'react-resizable/css/styles.css';

import {DropTargetMonitor, useDrag, useDrop} from 'react-dnd';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Resizable} from 'react-resizable';
import {canResizeOrMove} from '@/app/page-template-editor/helpers/ContentBlockHelpers';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';
import { HeadlineBlock } from './models/HeadlineBlock';
import { ImageBlock } from './models/ImageBlock';
import { SlideshowBlock } from './models/SlideshowBlock';
import SlideshowTemplateBlock from '@/components/content-blocks/template-blocks/SlideshowTemplateBlock';
import PdfTemplateBlock from '@/components/content-blocks/template-blocks/PdfTemplateBlock';
import TextTemplateBlock from '@/components/content-blocks/template-blocks/TextTemplateBlock';
import VideoTemplateBlock from '@/components/content-blocks/template-blocks/VideoTemplateBlock';
import ImageTemplateBlock from '@/components/content-blocks/template-blocks/ImageTemplateBlock';
import HeadlineTemplateBlock from '@/components/content-blocks/template-blocks/HeadlineTemplateBlock';
import PropertyWidget from '@/app/page-template-editor/PropertyWidget';
import {GridConstants} from '@/app/page-template-editor/constants/GridConstants';
import {ContentBlockType} from '@/app/page-template-editor/types/ContentBlockType';

export interface ContentBlockProps {
    contentBlock: ContentBlockType,
    gridCellWidth: number,
    isSelected: boolean,
    onSelect: (id: string) => void,
    onDeselect: () => void,
    mouseGridX: number,
    mouseGridY: number,
    gridContainerTop: number,
    gridContainerLeft: number,
}

const ContentBlock = (props: ContentBlockProps) => {
    const gridContext = useContext(GridContext);
    const [isSelectionBlocked, setIsSelectionBlocked] = useState<boolean>(false);
    const propertyWidget = useRef(null);
    const resizableRef = useRef(null);
    
    const [{isDragging}, drag, preview] = useDrag<IDraggableItem, void, { isDragging: boolean }>(() => ({
        type: props.contentBlock.type,
        item: { id: props.contentBlock.id, type: props.contentBlock.type, source: DragSource.CONTENT_BLOCK },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Allow dropping content block on a position occupied by itself
    const [_, drop] = useDrop<IDraggableItem>(() => ({
        accept: [
            DraggableTypes.HEADLINE_BLOCK,
            DraggableTypes.TEXT_BLOCK,
            DraggableTypes.IMAGE_BLOCK,
            DraggableTypes.PDF_BLOCK,
            DraggableTypes.VIDEO_BLOCK,
            DraggableTypes.SLIDESHOW_BLOCK,
        ],
        drop: (item: IDraggableItem, monitor: DropTargetMonitor<IDraggableItem, void>) => {
            const clientOffset = monitor.getClientOffset();
            
            if (item.source === DragSource.CONTENT_BLOCK && clientOffset) {
                const gridX = Math.floor((clientOffset.x - props.gridContainerLeft) / props.gridCellWidth);
                const gridY = Math.floor((clientOffset.y - props.gridContainerTop) / props.gridCellWidth);
                if (gridContext.canMoveContentBlock(item.id, gridX, gridY)) {
                    gridContext.moveContentBlock(item.id, gridX, gridY);
                }
            }
        },
    }), [props.mouseGridX, props.mouseGridY]);

    useEffect(() => {
        // Prevent resizing when mouseup is triggered while the mouse is over an iframe or an embed element.
        const handleMouseMove = (event: MouseEvent) => {
            if (event.buttons === 0 && resizableRef.current) {
                document.dispatchEvent(new Event('mouseup'));
            }
        };

        if (resizableRef.current) {
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [resizableRef]);

    return (
        <>
            {
                props.isSelected &&
                <PropertyWidget
                    ref={propertyWidget}
                    id={props.contentBlock.id}
                    x={props.contentBlock.x}
                    y={props.contentBlock.y}
                    width={props.contentBlock.width}
                    height={props.contentBlock.height}
                    moveContentBlock={gridContext.moveContentBlock}
                    resizeContentBlock={gridContext.resizeContentBlock}
                    deleteContentBlock={gridContext.removeContentBlock}
                />
            }
            <Resizable
                width={props.contentBlock.width * props.gridCellWidth}
                height={props.contentBlock.height * props.gridCellWidth}
                draggableOpts={{grid: [props.gridCellWidth, props.gridCellWidth]}}
                ref={resizableRef}
                onResize={() => {
                    let newWidth = props.mouseGridX - props.contentBlock.x + 1;
                    let newHeight = props.mouseGridY - props.contentBlock.y + 1;
                    
                    newWidth = Math.min(Math.max(newWidth, 1), GridConstants.COLUMNS);
                    newHeight = Math.min(Math.max(newHeight, 1), 200);
    
                    if (!canResizeOrMove(
                        newWidth,
                        newHeight,
                        props.contentBlock.x, 
                        props.contentBlock.y, 
                        props.contentBlock.id,
                        gridContext.contentBlocks,
                        gridContext.rowCount
                    )) {
                        return;
                    }

                    gridContext.resizeContentBlock(props.contentBlock.id, newWidth, newHeight);
                }}
                onResizeStart={props.onDeselect} 
                onResizeStop={() => setIsSelectionBlocked(true)}
                resizeHandles={['se']} 
            >
                <div
                    ref={node => {
                       preview(node);
                       drop(node);
                    }}
                    className={styles.contentBlock + " content-block " + (props.isSelected ? " " + styles.selected : "")}
                    style={{
                        position: 'absolute',
                        left: `${props.contentBlock.x * props.gridCellWidth}px`,
                        top: `${props.contentBlock.y * props.gridCellWidth}px`,
                        width: `${props.contentBlock.width * props.gridCellWidth}px`,
                        height: `${props.contentBlock.height * props.gridCellWidth}px`,
                        opacity: isDragging ? 0.5 : 1
                    }}
                    onClick={() => { 
                        if (props.isSelected) {
                            props.onDeselect();
                        } else {
                            if (!isSelectionBlocked) {
                                props.onSelect(props.contentBlock.id);
                            }
                            
                            setIsSelectionBlocked(false);
                        }
                    }}
                >
                    {
                        props.contentBlock.type === DraggableTypes.HEADLINE_BLOCK && 
                        <HeadlineTemplateBlock ref={drag} headlineBlock={props.contentBlock as HeadlineBlock} />
                    }
                    {
                        props.contentBlock.type === DraggableTypes.IMAGE_BLOCK && 
                        <ImageTemplateBlock ref={drag} imageBlock={props.contentBlock as ImageBlock} />
                    }
                    {
                        props.contentBlock.type === DraggableTypes.VIDEO_BLOCK && 
                        <VideoTemplateBlock ref={drag} />
                    }
                    {
                        props.contentBlock.type === DraggableTypes.TEXT_BLOCK &&
                        <TextTemplateBlock ref={drag} />
                    }
                    {
                        props.contentBlock.type === DraggableTypes.PDF_BLOCK &&
                        <PdfTemplateBlock ref={drag} />
                    }
                    {
                        props.contentBlock.type === DraggableTypes.SLIDESHOW_BLOCK &&
                        <SlideshowTemplateBlock 
                            ref={drag} 
                            slideshowBlock={props.contentBlock as SlideshowBlock} 
                            onSwipe={() => setIsSelectionBlocked(true)} 
                        />
                    }
                </div>
            </Resizable>
        </>
    )
}

export default ContentBlock;
