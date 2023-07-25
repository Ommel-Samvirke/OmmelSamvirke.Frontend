import styles from './styles/ImageTemplateBlock.module.scss';

import { ImageBlock } from "@/app/page-template-editor/models/ImageBlock";
import { forwardRef, ForwardedRef } from "react";
import Image from 'next/image';

interface ImageTemplateBlockProps {
    imageBlock: ImageBlock,
}

const ImageTemplateBlock = forwardRef((props: ImageTemplateBlockProps, ref: ForwardedRef<HTMLImageElement>) => {
    return (
        <Image 
            ref={ref}
            src={props.imageBlock.imageUrl} 
            alt={"Skabelon af billede"} 
            className={styles.image}
            width={600}
            height={600} 
        />
    )
});

export default ImageTemplateBlock;
