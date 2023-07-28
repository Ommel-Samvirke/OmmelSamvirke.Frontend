import styles from "./styles/HeadlineBlockComponent.module.scss";

import { ForwardedRef, forwardRef, useContext } from "react";

import { roboto } from "@/app/fonts";
import { LayoutContext } from "@/features/pages/context/LayoutContext";
import { HeadlineBlock } from "@/features/pages/models/HeadlineBlock";

interface HeadlineBlockComponentProps {
    headlineBlock: HeadlineBlock;
}

const HeadlineBlockComponent = forwardRef(
    (props: HeadlineBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
        const layoutContext = useContext(LayoutContext);

        return (
            <div
                ref={ref}
                className={styles.headlineContainer}
                style={{ backgroundColor: layoutContext.color }}
            >
                <h1 className={styles.headline + " " + roboto.className}>
                    {props.headlineBlock.headline}
                </h1>
            </div>
        );
    },
);

HeadlineBlockComponent.displayName = "HeadlineBlock";

export default HeadlineBlockComponent;
