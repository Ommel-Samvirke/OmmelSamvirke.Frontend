import { EditorContext } from '@/app/page-template-editor/context/EditorContext';
import styles from './styles/HeadlineTemplateBlock.module.scss';

import { forwardRef, ForwardedRef, useContext } from 'react';
import { HeadlineBlock } from '@/app/page-template-editor/models/HeadlineBlock';
import { roboto } from '@/app/fonts';

interface HeadlineTemplateBlockProps {
    headlineBlock: HeadlineBlock
}

const HeadlineTemplateBlock = forwardRef((props: HeadlineTemplateBlockProps, ref: ForwardedRef<HTMLDivElement>) => {
    const editorContext = useContext(EditorContext);
    
    return (
        <div ref={ref} className={styles.headlineContainer} style={{ backgroundColor: editorContext.color }}>
            <h1 className={styles.headline + " " + roboto.className}>{props.headlineBlock.headline}</h1>
        </div>
    );
});

export default HeadlineTemplateBlock;
