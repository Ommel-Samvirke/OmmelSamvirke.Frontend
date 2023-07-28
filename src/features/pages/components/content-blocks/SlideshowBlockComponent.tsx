import styles from "./styles/SlideshowBlockComponent.module.scss";

import React, { ForwardedRef, forwardRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";

import { SlideshowBlock } from "@/features/pages/models/SlideshowBlock";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box } from "@mui/joy";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper/MobileStepper";

interface SlideshowBlockComponentProps {
    slideshowBlock: SlideshowBlock;
    onSwipe: () => void;
}

const SlideshowBlockComponent = forwardRef(
    (
        props: SlideshowBlockComponentProps,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        const [activeStep, setActiveStep] = useState<number>(0);

        const handleNext = (event: React.MouseEvent) => {
            event.stopPropagation();
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = (event: React.MouseEvent) => {
            event.stopPropagation();
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleStepChange = (step: number) => {
            props.onSwipe();
            setActiveStep(step);
        };

        return (
            <div ref={ref} className={styles.slideshowContainer}>
                <Box className={styles.slideshowContent}>
                    <SwipeableViews
                        axis={"x"}
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
                                        alt={`Billedgalleri: Billede nummer ${
                                            index + 1
                                        }`}
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
                                disabled={
                                    activeStep ===
                                    props.slideshowBlock.imageUrls.length - 1
                                }
                            >
                                Næste <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                <KeyboardArrowLeft /> Forrige
                            </Button>
                        }
                    />
                </Box>
            </div>
        );
    },
);

SlideshowBlockComponent.displayName = "SlideshowBlock";

export default SlideshowBlockComponent;
