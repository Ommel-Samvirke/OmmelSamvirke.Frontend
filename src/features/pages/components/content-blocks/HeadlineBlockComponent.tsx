import styles from './styles/HeadlineBlockComponent.module.scss';

import React, { ForwardedRef, forwardRef, useContext, useEffect, useState } from 'react';

import { roboto } from '@/app/fonts';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { HorizontalTextAlignment } from '@/features/pages/enums/HorizontalTextAlignment';
import { VerticalTextAlignment } from '@/features/pages/enums/VerticalTextAlignment';
import { HeadlineBlock } from '@/features/pages/models/HeadlineBlock';
import Input from '@mui/joy/Input';
import { Property } from 'csstype';
import AlignItems = Property.AlignItems;
import TextAlign = Property.TextAlign;

interface HeadlineBlockComponentProps {
    headlineBlock: HeadlineBlock;
    isSelected: boolean;
}

const HeadlineBlockComponent = forwardRef((props: HeadlineBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [verticalTextAlignment, setVerticalTextAlignment] = useState<AlignItems>('start');
    const [horizontalTextAlignment, setHorizontalTextAlignment] = useState<TextAlign>('left');
    const [isInputFocused, setInputFocus] = useState(false);
    const [headline, setHeadline] = useState('');
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

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeadline(event.target.value);
    };

    const handleInputFocus = () => {
        setInputFocus(true);
    };

    const handleInputBlur = () => {
        setInputFocus(false);
    };

    return (
        <div
            ref={isInputFocused ? null : ref}
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
            {props.isSelected && (
                <Input
                    className={styles.headline + ' ' + styles.headlineEditable + ' ' + roboto.className}
                    value={headline}
                    placeholder={props.headlineBlock.placeholderText}
                    autoFocus={true}
                    onChange={handleContentChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    sx={{
                        '& input': {
                            textAlign: horizontalTextAlignment,
                        },
                    }}
                />
            )}
            {!props.isSelected && (
                <h1
                    className={styles.headline + ' ' + roboto.className}
                    style={{ textAlign: horizontalTextAlignment, color: props.headlineBlock.color }}
                >
                    {headline.length > 0 ? headline : props.headlineBlock.placeholderText}
                </h1>
            )}
        </div>
    );
});

HeadlineBlockComponent.displayName = 'HeadlineBlock';

export default HeadlineBlockComponent;
