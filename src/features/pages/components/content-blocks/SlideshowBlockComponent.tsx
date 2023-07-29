import styles from './styles/SlideshowBlockComponent.module.scss';

import React, { ForwardedRef, forwardRef, useContext, useState } from 'react';

import 'swiper/css';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { SlideshowBlock } from '@/features/pages/models/SlideshowBlock';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box } from '@mui/joy';
import Button from '@mui/material/Button';
import { Swiper as SwiperClass } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SlideshowBlockComponentProps {
    slideshowBlock: SlideshowBlock;
    onSwipe: () => void;
}

const SlideshowBlockComponent = forwardRef((props: SlideshowBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const layoutContext = useContext(LayoutContext);

    const handleButtonClick = () => {
        if (swiper) {
            swiper.slideTo(activeStep);
        }
    };

    return (
        <div
            ref={ref}
            className={styles.slideshowContainer}
            style={{
                paddingTop: `${props.slideshowBlock.topPadding.padding}px`,
                paddingBottom: `${props.slideshowBlock.bottomPadding.padding}px`,
                paddingLeft: `${props.slideshowBlock.leftPadding.padding}px`,
                paddingRight: `${props.slideshowBlock.rightPadding.padding}px`,
                backgroundColor: layoutContext.color,
            }}
        >
            <Box className={styles.slideshowContent}>
                <Swiper
                    modules={[Navigation]}
                    onSlideChange={(swiper) => {
                        props.onSwipe();
                        setActiveStep(swiper.activeIndex);
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSwiper={(swiper) => setSwiper(swiper)} // Save the Swiper instance to state
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    {props.slideshowBlock.imageUrls.map((url, index) => (
                        <SwiperSlide key={url}>
                            <Box component="img" src={url} alt={`Billedgalleri: Billede nummer ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <div className={styles.slideshowButtons}>
                <div className="swiper-button-prev" onClick={handleButtonClick}>
                    {' '}
                    <Button size="small" disabled={activeStep === 0}>
                        <KeyboardArrowLeft /> Forrige
                    </Button>
                </div>
                <div className="swiper-button-next" onClick={handleButtonClick}>
                    {' '}
                    <Button size="small" disabled={activeStep === props.slideshowBlock.imageUrls.length - 1}>
                        Næste <KeyboardArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    );
});

SlideshowBlockComponent.displayName = 'SlideshowBlock';

export default SlideshowBlockComponent;
