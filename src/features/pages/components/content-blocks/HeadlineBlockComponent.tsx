import styles from './styles/HeadlineBlockComponent.module.scss';

import { ForwardedRef, forwardRef, useContext, useEffect, useState } from 'react';

import { roboto } from '@/app/fonts';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { HorizontalTextAlignment } from '@/features/pages/enums/HorizontalTextAlignment';
import { VerticalTextAlignment } from '@/features/pages/enums/VerticalTextAlignment';
import { HeadlineBlock } from '@/features/pages/models/HeadlineBlock';
import { Property } from 'csstype';
import AlignItems = Property.AlignItems;
import TextAlign = Property.TextAlign;

interface HeadlineBlockComponentProps {
    headlineBlock: HeadlineBlock;
}

const HeadlineBlockComponent = forwardRef((props: HeadlineBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [verticalTextAlignment, setVerticalTextAlignment] = useState<AlignItems>('start');
    const [horizontalTextAlignment, setHorizontalTextAlignment] = useState<TextAlign>('left');
    const layoutContext = useContext(LayoutContext);

    useEffect(() => {
        switch (props.headlineBlock.horizontalTextAlignment) {
            case HorizontalTextAlignment.LEFT:
                setHorizontalTextAlignment('left');
                break;
            case HorizontalTextAlignment.CENTER:
                setHorizontalTextAlignment('center');
                break;
            case HorizontalTextAlignment.RIGHT:
                setHorizontalTextAlignment('right');
                break;
            case HorizontalTextAlignment.JUSTIFY:
                setHorizontalTextAlignment('justify');
                break;
        }
    }, [props.headlineBlock.horizontalTextAlignment]);

    useEffect(() => {
        switch (props.headlineBlock.verticalTextAlignment) {
            case VerticalTextAlignment.TOP:
                setVerticalTextAlignment('start');
                break;
            case VerticalTextAlignment.CENTER:
                setVerticalTextAlignment('center');
                break;
            case VerticalTextAlignment.BOTTOM:
                setVerticalTextAlignment('end');
                break;
        }
    }, [props.headlineBlock.verticalTextAlignment]);

    return (
        <div
            ref={ref}
            className={styles.headlineContainer}
            style={{
                backgroundColor: layoutContext.color,
                alignItems: verticalTextAlignment,
                paddingTop: `${props.headlineBlock.topPadding.padding}px`,
                paddingBottom: `${props.headlineBlock.bottomPadding.padding}px`,
                paddingLeft: `${props.headlineBlock.leftPadding.padding}px`,
                paddingRight: `${props.headlineBlock.rightPadding.padding}px`,
            }}
        >
            <h1
                className={styles.headline + ' ' + roboto.className + ' '}
                style={{ textAlign: horizontalTextAlignment, color: props.headlineBlock.color }}
            >
                {props.headlineBlock.headline}
            </h1>
        </div>
    );
});

HeadlineBlockComponent.displayName = 'HeadlineBlock';

export default HeadlineBlockComponent;
