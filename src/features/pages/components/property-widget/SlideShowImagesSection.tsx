import parentStyles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';
import styles from '@/features/pages/components/property-widget/styles/SlideShowImageSection.module.scss';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { SlideshowBlock } from '@/features/pages/models/SlideshowBlock';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/joy/Button';

interface SlideSowImagesSectionProps {
    slideshowBlock: SlideshowBlock;
}

const SlideShowImagesSection = (props: SlideSowImagesSectionProps) => {
    const newImageInput = useRef<HTMLInputElement>(null);
    const imageToUpdate = useRef<number | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>(props.slideshowBlock.imageUrls || []);
    const [images, setImages] = useState<File[] | undefined>(undefined);

    async function blobUrlToFile(blobUrl: string) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], 'billede.jpg', { type: blob.type, lastModified: new Date().getTime() });
    }

    useEffect(() => {
        const convertImageUrlsToFiles = async (imageUrls: string[]) => {
            const files = await Promise.all(imageUrls.map(blobUrlToFile));
            setImages(files);
        };
        convertImageUrlsToFiles(imageUrls).then(() => (props.slideshowBlock.imageUrls = imageUrls));
    }, [imageUrls, props.slideshowBlock]);

    const handleAddImageClicked = () => {
        if (newImageInput.current) newImageInput.current.click();
    };

    const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);

            if (imageToUpdate.current !== null) {
                const updatedImageUrls = [...imageUrls];
                updatedImageUrls[imageToUpdate.current] = newImageUrl;
                setImageUrls(updatedImageUrls);
                imageToUpdate.current = null;
            } else {
                setImageUrls((prevImageUrls) => [...prevImageUrls, newImageUrl]);
            }
        }
    };

    const updateImage = (index: number) => {
        imageToUpdate.current = index;
        if (newImageInput.current) newImageInput.current.click();
    };

    const deleteImage = (index: number) => {
        const newImageUrls = [...imageUrls];
        newImageUrls.splice(index, 1);
        setImageUrls(newImageUrls);
    };

    return (
        <>
            <div className={parentStyles.Header}>
                Billeder
                <div className={parentStyles.separator}></div>
            </div>
            <div className={parentStyles.Body}>
                {images && (
                    <div className={styles.imageLinkContainer}>
                        {images.map((image, index) => {
                            return (
                                <div className={styles.imageLinks} key={index}>
                                    <Button onClick={() => updateImage(index)}>Billede {index + 1}</Button>
                                    <Button
                                        startDecorator={<DeleteIcon />}
                                        color={'danger'}
                                        onClick={() => deleteImage(index)}
                                    >
                                        Slet
                                    </Button>
                                </div>
                            );
                        })}
                        <input
                            type="file"
                            accept={'image/*'}
                            ref={newImageInput}
                            style={{ display: 'none' }}
                            onChange={handleAddImage}
                        />
                        <Button className={styles.addImage} onClick={handleAddImageClicked}>
                            Tilføj billede
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SlideShowImagesSection;
