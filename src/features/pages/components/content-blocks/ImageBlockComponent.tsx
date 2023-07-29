import styles from './styles/ImageBlockComponent.module.scss';

import { ForwardedRef, forwardRef, useContext } from 'react';

import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { ImageBlock } from '@/features/pages/models/ImageBlock';
import Image from 'next/image';

interface ImageBlockProps {
    imageBlock: ImageBlock;
}

const ImageBlockComponent = forwardRef((props: ImageBlockProps, ref: ForwardedRef<HTMLImageElement>) => {
    const layoutContext = useContext(LayoutContext);

    return (
        <div style={{ backgroundColor: layoutContext.color, width: '100%', height: '100%' }}>
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
                    paddingTop: `${props.imageBlock.topPadding.padding}px`,
                    paddingBottom: `${props.imageBlock.bottomPadding.padding}px`,
                    paddingLeft: `${props.imageBlock.leftPadding.padding}px`,
                    paddingRight: `${props.imageBlock.rightPadding.padding}px`,
                }}
            />
        </div>
    );
});

ImageBlockComponent.displayName = 'ImageBlock';

export default ImageBlockComponent;
