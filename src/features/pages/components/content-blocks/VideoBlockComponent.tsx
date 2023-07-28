import styles from "./styles/VideoBlockComponent.module.scss";

import { ForwardedRef, forwardRef } from "react";

const VideoBlockComponent = forwardRef(
    (_, ref: ForwardedRef<HTMLIFrameElement>) => {
        return (
            <iframe
                ref={ref}
                className={styles.video}
                src="https://www.youtube.com/embed/C0DPdy98e4c"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
        );
    },
);

VideoBlockComponent.displayName = "VideoBlock";

export default VideoBlockComponent;
