import styles from './styles/PdfBlockComponent.module.scss';

import { ForwardedRef, forwardRef } from 'react';

import { PdfBlock } from '@/features/pages/models/PdfBlock';

interface PdfBlockComponentProps {
    pdfBlock: PdfBlock;
}

const PdfBlockComponent = forwardRef((props: PdfBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div
            ref={ref}
            className={styles.pdfContent}
            style={{
                paddingTop: `${props.pdfBlock.topPadding.padding}px`,
                paddingBottom: `${props.pdfBlock.bottomPadding.padding}px`,
                paddingLeft: `${props.pdfBlock.leftPadding.padding}px`,
                paddingRight: `${props.pdfBlock.rightPadding.padding}px`,
            }}
        >
            <embed src="/files/test-pdf.pdf" type="application/pdf" width="100%" height="100%" />
        </div>
    );
});

PdfBlockComponent.displayName = 'PdfBlock';

export default PdfBlockComponent;
