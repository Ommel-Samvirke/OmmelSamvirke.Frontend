import styles from './styles/TextBlockComponent.module.scss';

import React, { ForwardedRef, forwardRef, useContext, useEffect, useState } from 'react';

import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { HorizontalTextAlignment } from '@/features/pages/enums/HorizontalTextAlignment';
import { VerticalTextAlignment } from '@/features/pages/enums/VerticalTextAlignment';
import { TextBlock } from '@/features/pages/models/TextBlock';
import { Property } from 'csstype';
import AlignItems = Property.AlignItems;
import TextAlign = Property.TextAlign;

interface TextBlockComponentProps {
    textBlock: TextBlock;
}

const TextBlockComponent = forwardRef((props: TextBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [verticalTextAlignment, setVerticalTextAlignment] = useState<AlignItems>('start');
    const [horizontalTextAlignment, setHorizontalTextAlignment] = useState<TextAlign>('left');
    const [text, setText] = useState('Tekstindhold, lorem ipsum dolor sit...');
    const layoutContext = useContext(LayoutContext);

    useEffect(() => {
        switch (props.textBlock.horizontalTextAlignment) {
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
    }, [props.textBlock.horizontalTextAlignment]);

    useEffect(() => {
        switch (props.textBlock.verticalTextAlignment) {
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
    }, [props.textBlock.verticalTextAlignment]);

    return (
        <div
            ref={ref}
            className={styles.textContainer}
            style={{
                backgroundColor: layoutContext.color,
                alignItems: verticalTextAlignment,
                paddingTop: `${props.textBlock.topPadding.padding}px`,
                paddingBottom: `${props.textBlock.bottomPadding.padding}px`,
                paddingLeft: `${props.textBlock.leftPadding.padding}px`,
                paddingRight: `${props.textBlock.rightPadding.padding}px`,
            }}
        >
            <div
                className={styles.textContent}
                style={{ textAlign: horizontalTextAlignment, color: props.textBlock.color }}
            >
                {text}
            </div>
        </div>
    );
});

TextBlockComponent.displayName = 'TextBlock';

export default TextBlockComponent;
