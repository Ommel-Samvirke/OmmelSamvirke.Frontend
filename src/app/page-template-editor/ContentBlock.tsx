import styles from './styles/ContentBlock.module.scss';
import 'react-resizable/css/styles.css';

import {useDrag} from 'react-dnd';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import {GridContext} from '@/app/page-template-editor/context/GridContext';
import {useContext, useState, useEffect} from 'react';
import {Resizable} from 'react-resizable';
import {canResizeOrMove} from '@/app/page-template-editor/helpers/ContentBlockHelpers';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';
import { HeadlineBlock } from './models/HeadlineBlock';
import { TextBlock } from './models/TextBlock';
import { ImageBlock } from './models/ImageBlock';
import { PdfBlock } from './models/PdfBlock';
import { VideoBlock } from './models/VideoBlock';
import { SlideshowBlock } from './models/SlideshowBlock';
import SlideshowTemplateBlock from '@/components/content-blocks/template-blocks/SlideshowTemplateBlock';
import PdfTemplateBlock from '@/components/content-blocks/template-blocks/PdfTemplateBlock';
import TextTemplateBlock from '@/components/content-blocks/template-blocks/TextTemplateBlock';
import VideoTemplateBlock from '@/components/content-blocks/template-blocks/VideoTemplateBlock';
import ImageTemplateBlock from '@/components/content-blocks/template-blocks/ImageTemplateBlock';
import HeadlineTemplateBlock from '@/components/content-blocks/template-blocks/HeadlineTemplateBlock';

export interface ContentBlockProps {
    contentBlock: HeadlineBlock | TextBlock | ImageBlock | PdfBlock | VideoBlock | SlideshowBlock,
    gridCellWidth: number,
}

const ContentBlock = (props: ContentBlockProps) => {
    const { resizeContentBlock, contentBlocks } = useContext(GridContext);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const gridContext = useContext(GridContext);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Delete' || event.key === 'Backspace' || event.key === 'Escape') {
                if (isSelected) { 
                    gridContext.removeContentBlock(props.contentBlock.id);
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isSelected]);
    
    const [{isDragging}, drag, preview] = useDrag<IDraggableItem, void, { isDragging: boolean }>(() => ({
        type: props.contentBlock.type,
        item: { id: props.contentBlock.id, type: props.contentBlock.type, source: DragSource.CONTENT_BLOCK },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <Resizable
            width={props.contentBlock.width * props.gridCellWidth}
            height={props.contentBlock.height * props.gridCellWidth}
            draggableOpts={{grid: [props.gridCellWidth, props.gridCellWidth]}}
            
            // @ts-ignore
            onResize={(event: MouseEvent) => {
                const boxLeft = props.contentBlock.x * props.gridCellWidth;
                const boxTop = props.contentBlock.y * props.gridCellWidth;

                // Distance moved by the cursor from the starting position of the box
                const deltaX = event.clientX - boxLeft;
                const deltaY = event.clientY - boxTop;

                // Calculate new width and height based on cursor's position
                let newWidth = Math.round(deltaX / props.gridCellWidth) - 1;
                let newHeight = Math.round(deltaY / props.gridCellWidth);

                // Clamping the width and height to be within certain boundaries
                newWidth = Math.min(Math.max(newWidth, 1), 24);
                newHeight = Math.min(Math.max(newHeight, 1), 200);

                if (!canResizeOrMove(newWidth, newHeight, props.contentBlock.x, props.contentBlock.y, props.contentBlock.id, contentBlocks)) {
                    return;
                }

                resizeContentBlock(props.contentBlock.id, newWidth, newHeight);
                setIsSelected(false)
            }}
            onResizeStart={() => setIsSelected(false)}
            resizeHandles={['se']} 
        >
            <div
                ref={preview}
                className={styles.contentBlock + " " + (isSelected ? " " + styles.selected : "")}
                style={{
                    position: 'absolute',
                    left: `${props.contentBlock.x * props.gridCellWidth}px`,
                    top: `${props.contentBlock.y * props.gridCellWidth}px`,
                    width: `${props.contentBlock.width * props.gridCellWidth}px`,
                    height: `${props.contentBlock.height * props.gridCellWidth}px`,
                    opacity: isDragging ? 0.5 : 1
                }}
                onMouseDownCapture={() => setIsSelected(!isSelected)}
                onDragStart={() => setIsSelected(false)}
            >
                {
                    props.contentBlock.type === DraggableTypes.HEADLINE_BLOCK && 
                    <HeadlineTemplateBlock ref={drag} />
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
                    <SlideshowTemplateBlock ref={drag} slideshowBlock={props.contentBlock as SlideshowBlock} />
                }
            </div>
        </Resizable>
    )
}

export default ContentBlock;
