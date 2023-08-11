import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import { useRef, useState } from 'react';

import { VideoBlock } from '@/features/pages/models/VideoBlock';
import { FormControl, FormLabel, Input } from '@mui/joy';

interface VideoLinkSectionInterface {
    contentBlock: VideoBlock;
}

const VideoLinkSection = (props: VideoLinkSectionInterface) => {
    const [value, setValue] = useState(props.contentBlock.videoUrl);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateVideoLink = () => {
        props.contentBlock.videoUrl = convertToEmbedLink(value);
    };

    const convertToEmbedLink = (url: string) => {
        // If the link is already an embed link, return it
        const embedMatch = url.match(/https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch && embedMatch[1]) {
            return url;
        }

        // If the link is a normal link, convert it to an embed link
        const match = url.match(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }

        alert('Linket er ikke gyldigt');
        return props.contentBlock.videoUrl;
    };

    return (
        <>
            <div className={styles.Header}>
                Video
                <div className={styles.separator}></div>
            </div>
            <div className={styles.Body}>
                <div className={styles.propertyInputRow}>
                    <FormControl className={styles.propertyInput} style={{ width: `calc(100% - 1rem)` }}>
                        <FormLabel>Link</FormLabel>
                        <Input
                            slotProps={{
                                input: {
                                    ref: inputRef,
                                },
                            }}
                            placeholder={'Video link'}
                            value={value}
                            type={'text'}
                            onChange={(event) => setValue(event.target.value)}
                            onBlur={updateVideoLink}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    inputRef.current?.blur();
                                }
                            }}
                        />
                    </FormControl>
                </div>
            </div>
        </>
    );
};

export default VideoLinkSection;
