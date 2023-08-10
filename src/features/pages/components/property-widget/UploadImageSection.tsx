import { ChangeEvent, useRef } from 'react';

import Button from '@mui/joy/Button';

interface UploadImageSectionProps {
    onFileSelect: (file: File) => void;
}

const UploadImageSection = (props: UploadImageSectionProps) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInput.current) fileInput.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (file) props.onFileSelect(file);
    };

    return (
        <>
            <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
            <Button color="primary" onClick={handleButtonClick}>
                Skift Billede
            </Button>
        </>
    );
};

export default UploadImageSection;
