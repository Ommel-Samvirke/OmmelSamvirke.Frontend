import styles from './styles/ImageBlockComponent.module.scss';

import { ForwardedRef, forwardRef } from 'react';

import { ImageBlock } from '@/features/pages/models/ImageBlock';
import Image from 'next/image';

interface ImageBlockProps {
    imageBlock: ImageBlock;
}

const ImageBlockComponent = forwardRef((props: ImageBlockProps, ref: ForwardedRef<HTMLImageElement>) => {
    return (
        <Image
            ref={ref}
            src={props.imageBlock.imageUrl}
            alt={'Skabelon af billede'}
            className={styles.image}
            width={1600}
            height={1200}
            priority={true}
            style={{
                borderTopLeftRadius: `${props.imageBlock.topLeftBorderRadius.radius}%`,
                borderTopRightRadius: `${props.imageBlock.topRightBorderRadius.radius}%`,
                borderBottomLeftRadius: `${props.imageBlock.bottomLeftBorderRadius.radius}%`,
                borderBottomRightRadius: `${props.imageBlock.bottomRightBorderRadius.radius}%`,
            }}
        />
    );
});

ImageBlockComponent.displayName = 'ImageBlock';

export default ImageBlockComponent;
