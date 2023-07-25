import styles from './styles/HeadlineTemplateBlock.module.scss';

import { forwardRef, ForwardedRef } from 'react';
import { HeadlineBlock } from '@/app/page-template-editor/models/HeadlineBlock';
import { roboto } from '@/app/fonts';

interface HeadlineTemplateBlockProps {
    headlineBlock: HeadlineBlock
}

const HeadlineTemplateBlock = forwardRef((props: HeadlineTemplateBlockProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.headlineContainer}>
            <h1 className={styles.headline + " " + roboto.className}>{props.headlineBlock.headline}</h1>
        </div>
    );
});

export default HeadlineTemplateBlock;
