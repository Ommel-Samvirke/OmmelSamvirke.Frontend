import styles from './styles/VideoBlockComponent.module.scss';

import { ForwardedRef, forwardRef, useContext, useEffect, useState } from 'react';

import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { VideoBlock } from '@/features/pages/models/VideoBlock';

interface VideoBlockComponentProps {
    videoBlock: VideoBlock;
}

const VideoBlockComponent = forwardRef((props: VideoBlockComponentProps, ref: ForwardedRef<HTMLIFrameElement>) => {
    const [src, setSrc] = useState(props.videoBlock.videoUrl);
    const layoutContext = useContext(LayoutContext);

    useEffect(() => {
        setSrc(props.videoBlock.videoUrl);
    }, [props]);

    return (
        <iframe
            ref={ref}
            className={styles.video}
            src={src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
                paddingTop: `${props.videoBlock.topPadding.padding}px`,
                paddingBottom: `${props.videoBlock.bottomPadding.padding}px`,
                paddingLeft: `${props.videoBlock.leftPadding.padding}px`,
                paddingRight: `${props.videoBlock.rightPadding.padding}px`,
                backgroundColor: layoutContext.color,
            }}
        ></iframe>
    );
});

VideoBlockComponent.displayName = 'VideoBlock';

export default VideoBlockComponent;
