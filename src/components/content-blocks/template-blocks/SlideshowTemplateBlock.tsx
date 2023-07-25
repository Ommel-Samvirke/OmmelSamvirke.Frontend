import styles from './styles/SlideshowTemplateBlock.module.scss';

import { Box } from '@mui/joy';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper/MobileStepper';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { SlideshowBlock } from '@/app/page-template-editor/models/SlideshowBlock';
import { useState, forwardRef, ForwardedRef } from 'react';

interface SlideshowTemplateBlockProps { 
    slideshowBlock: SlideshowBlock,
}

const SlideshowTemplateBlock = forwardRef((props: SlideshowTemplateBlockProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [activeStep, setActiveStep] = useState<number>(0);

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
        <div ref={ref} className={styles.slideshowContainer}>

            <Box className={styles.slideshowContent}>
                <SwipeableViews
                    axis={'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {props.slideshowBlock.imageUrls.map((url, index) => (
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
                    steps={props.slideshowBlock.imageUrls.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === props.slideshowBlock.imageUrls.length - 1}
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
    );
});

export default SlideshowTemplateBlock;
