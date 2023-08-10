import styles from './styles/ImageBlockComponent.module.scss';

import { ChangeEvent, ForwardedRef, forwardRef, useContext, useRef } from 'react';

import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { ImageBlock } from '@/features/pages/models/ImageBlock';
import Image from 'next/image';

interface ImageBlockProps {
    imageBlock: ImageBlock;
}

const ImageBlockComponent = forwardRef((props: ImageBlockProps, ref: ForwardedRef<HTMLImageElement>) => {
    const layoutContext = useContext(LayoutContext);
    const fileInput = useRef<HTMLInputElement>(null);

    const handleDoubleClick = () => {
        if (fileInput.current) fileInput.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (file) handleFileSelect(file);
    };

    const handleFileSelect = (file: File) => {
        props.imageBlock.imageUrl = URL.createObjectURL(file);
    };

    return (
        <div style={{ backgroundColor: layoutContext.color, width: '100%', height: '100%' }}>
            <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
            <Image
                ref={ref}
                src={props.imageBlock.imageUrl}
                alt={'Skabelon af billede'}
                className={styles.image}
                width={1600}
                height={1200}
                priority={true}
                onDoubleClick={handleDoubleClick}
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
