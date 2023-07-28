import styles from "./styles/PdfBlockComponent.module.scss";

import { ForwardedRef, forwardRef } from "react";

const PdfBlockComponent = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
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

PdfBlockComponent.displayName = "PdfBlock";

export default PdfBlockComponent;
