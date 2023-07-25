import styles from './styles/PdfTemplateBlock.module.scss';

import {forwardRef, ForwardedRef} from 'react';

const PdfTemplateBlock = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.pdfContent}>
            <embed 
                src="/files/test-pdf.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
            />
        </div>
    );
});

export default PdfTemplateBlock;
