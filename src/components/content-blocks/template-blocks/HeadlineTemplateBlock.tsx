import { LayoutContext } from '@/app/page-template-editor/context/LayoutContext';
import styles from './styles/HeadlineTemplateBlock.module.scss';

import { forwardRef, ForwardedRef, useContext } from 'react';
import { HeadlineBlock } from '@/app/page-template-editor/models/HeadlineBlock';
import { roboto } from '@/app/fonts';

interface HeadlineTemplateBlockProps {
    headlineBlock: HeadlineBlock
}

const HeadlineTemplateBlock = forwardRef((props: HeadlineTemplateBlockProps, ref: ForwardedRef<HTMLDivElement>) => {
    const layoutContext = useContext(LayoutContext);
    
    return (
        <div ref={ref} className={styles.headlineContainer} style={{ backgroundColor: layoutContext.color }}>
            <h1 className={styles.headline + " " + roboto.className}>{props.headlineBlock.headline}</h1>
        </div>
    );
});

export default HeadlineTemplateBlock;
