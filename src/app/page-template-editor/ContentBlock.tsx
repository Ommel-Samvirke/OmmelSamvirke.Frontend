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
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from 'next/image';
import { Box } from '@mui/joy';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper/MobileStepper';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface ContentBlockProps {
    contentBlock: HeadlineBlock | TextBlock | ImageBlock | PdfBlock | VideoBlock | SlideshowBlock,
    gridCellWidth: number,
}

const ContentBlock = (props: ContentBlockProps) => {
    const { resizeContentBlock, contentBlocks } = useContext(GridContext);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const gridContext = useContext(GridContext);
    const [activeStep, setActiveStep] = useState<number>(0);

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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step: number) => {
        setActiveStep(step);
      };

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
                    <h1 ref={drag} className={styles.headline}>Eksempel: Overskrift</h1>
                }
                {
                    props.contentBlock.type === DraggableTypes.IMAGE_BLOCK && 
                    <Image 
                        ref={drag}
                        src={(props.contentBlock as ImageBlock).imageUrl} 
                        alt={"Skabelon af billede"} 
                        className={styles.image}
                        width={600}
                        height={600} 
                    />
                }
                {
                    props.contentBlock.type === DraggableTypes.VIDEO_BLOCK && 
                    <iframe 
                        ref={drag} 
                        className={styles.video}
                        src="https://www.youtube.com/embed/C0DPdy98e4c" 
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    ></iframe>
                }
                {
                    props.contentBlock.type === DraggableTypes.TEXT_BLOCK &&
                    <div ref={drag} className={styles.textContent}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla non enim sed euismod.
                            Nullam tincidunt ullamcorper nulla at laoreet. Donec hendrerit nunc et facilisis condimentum.
                            Pellentesque accumsan ligula a dolor commodo bibendum. Nulla cursus tincidunt dui ac elementum.
                            Maecenas ac congue felis, at pretium nisl. Donec sodales nibh nec lorem scelerisque, non pulvinar quam volutpat.
                            Nam non congue tortor. Aliquam gravida bibendum lorem, eget elementum mi tempus venenatis. Nam ut euismod dolor.
                            Vivamus lacinia arcu ac vehicula rutrum. Nulla consequat pellentesque ipsum at convallis. Morbi quis mollis odio, a pulvinar purus.
                        </p>
                        <p>
                            Praesent ornare mollis ipsum non vulputate. Nullam eleifend lorem purus, vel ullamcorper lectus pellentesque vitae.
                            Nunc ullamcorper rhoncus ipsum sed mollis. Nulla fringilla tortor libero, ac condimentum enim aliquam sit amet. 
                            Aenean ut odio augue. Quisque sagittis auctor imperdiet. Duis in viverra eros, et mattis sem.
                        </p>
                    </div>
                }
                {
                    props.contentBlock.type === DraggableTypes.PDF_BLOCK &&
                    <div ref={drag} className={styles.pdfContent}>
                        <embed 
                            src="/files/test-pdf.pdf"
                            type="application/pdf"
                            width="100%"
                            height="100%"
                        />
                    </div>
                }
                {
                    props.contentBlock.type === DraggableTypes.SLIDESHOW_BLOCK &&
                    <div ref={drag} className={styles.slideshowContainer}>
                        <Box className={styles.slideshowContent}>
                            <SwipeableViews
                                axis={'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                {(props.contentBlock as SlideshowBlock).imageUrls.map((url, index) => (
                                <div key={url}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component="img"
                                        src={url}
                                        alt={`Billedegalleri: Billede nummer ${index + 1}`}
                                    />
                                    ) : null}
                                </div>
                                ))}
                            </SwipeableViews>
                            <MobileStepper
                                steps={(props.contentBlock as SlideshowBlock).imageUrls.length}
                                position="static"
                                activeStep={activeStep}
                                nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === (props.contentBlock as SlideshowBlock).imageUrls.length - 1}
                                >
                                    Næste <KeyboardArrowRight />
                                </Button>
                                }
                                backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    <KeyboardArrowLeft /> Forrige
                                </Button>
                                }
                            />
                        </Box>
                    </div>
                }
            </div>
        </Resizable>
    )
}

export default ContentBlock;
