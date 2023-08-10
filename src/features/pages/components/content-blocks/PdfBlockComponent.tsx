import styles from './styles/PdfBlockComponent.module.scss';

import { ChangeEvent, ForwardedRef, forwardRef, useContext, useEffect, useRef, useState } from 'react';

import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { PdfBlock } from '@/features/pages/models/PdfBlock';

interface PdfBlockComponentProps {
    pdfBlock: PdfBlock;
}

const PdfBlockComponent = forwardRef((props: PdfBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const layoutContext = useContext(LayoutContext);
    const [pdfUrl, setPdfUrl] = useState<string>(props.pdfBlock.pdfUrl);

    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPdfUrl(props.pdfBlock.pdfUrl);
    }, [props]);

    const handleDoubleClick = () => {
        if (fileInput.current) fileInput.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (file) handlePdfFileSelect(file);
    };

    const handlePdfFileSelect = (file: File) => {
        props.pdfBlock.pdfUrl = URL.createObjectURL(file);
    };

    return (
        <>
            <input
                type="file"
                accept={'application/pdf'}
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div
                ref={ref}
                className={styles.pdfContent}
                onDoubleClick={handleDoubleClick}
                style={{
                    paddingTop: `${props.pdfBlock.topPadding.padding}px`,
                    paddingBottom: `${props.pdfBlock.bottomPadding.padding}px`,
                    paddingLeft: `${props.pdfBlock.leftPadding.padding}px`,
                    paddingRight: `${props.pdfBlock.rightPadding.padding}px`,
                    backgroundColor: layoutContext.color,
                }}
            >
                <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />
            </div>
        </>
    );
});

PdfBlockComponent.displayName = 'PdfBlock';

export default PdfBlockComponent;
