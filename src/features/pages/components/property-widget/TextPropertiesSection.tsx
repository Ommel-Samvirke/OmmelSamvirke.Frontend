import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import ColorPicker from '@/features/pages/components/color-picker/ColorPicker';
import { HorizontalTextAlignment } from '@/features/pages/enums/HorizontalTextAlignment';
import { VerticalTextAlignment } from '@/features/pages/enums/VerticalTextAlignment';
import UseTextAlign from '@/features/pages/hooks/useTextAlign';
import useTextColor from '@/features/pages/hooks/useTextColor';
import { TextBlock } from '@/features/pages/models/TextBlock';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';
import {
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight,
    VerticalAlignBottom,
    VerticalAlignCenter,
    VerticalAlignTop,
} from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';

interface TextPropertiesSectionInterface {
    contentBlock: ContentBlockType;
}

const TextPropertiesSection = (props: TextPropertiesSectionInterface) => {
    const textAlignment = UseTextAlign();
    const textColor = useTextColor();

    return (
        <>
            <div className={styles.Header}>
                Tekst
                <div className={styles.separator}></div>
            </div>
            <div className={styles.Body}>
                <div className={styles.propertyInputRow}>
                    <div className={styles.buttonGroup}>
                        <Tooltip title={'Venstre'}>
                            <IconButton
                                color={
                                    (props.contentBlock as TextBlock).horizontalTextAlignment ===
                                    HorizontalTextAlignment.LEFT
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={() =>
                                    textAlignment.alignHorizontalAxis(
                                        props.contentBlock as TextBlock,
                                        HorizontalTextAlignment.LEFT,
                                    )
                                }
                            >
                                <FormatAlignLeft />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Centreret'}>
                            <IconButton
                                color={
                                    (props.contentBlock as TextBlock).horizontalTextAlignment ===
                                    HorizontalTextAlignment.CENTER
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={() =>
                                    textAlignment.alignHorizontalAxis(
                                        props.contentBlock as TextBlock,
                                        HorizontalTextAlignment.CENTER,
                                    )
                                }
                            >
                                <FormatAlignJustify />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Højre'}>
                            <IconButton
                                color={
                                    (props.contentBlock as TextBlock).horizontalTextAlignment ===
                                    HorizontalTextAlignment.RIGHT
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={() =>
                                    textAlignment.alignHorizontalAxis(
                                        props.contentBlock as TextBlock,
                                        HorizontalTextAlignment.RIGHT,
                                    )
                                }
                            >
                                <FormatAlignRight />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Lige margener'}>
                            <IconButton
                                color={
                                    (props.contentBlock as TextBlock).horizontalTextAlignment ===
                                    HorizontalTextAlignment.JUSTIFY
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={() =>
                                    textAlignment.alignHorizontalAxis(
                                        props.contentBlock as TextBlock,
                                        HorizontalTextAlignment.JUSTIFY,
                                    )
                                }
                            >
                                <FormatAlignJustify />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className={styles.propertyInputRow}>
                    <div className={styles.buttonGroup + ' ' + styles.threeButtons}>
                        <Tooltip title={'Øverst'}>
                            <IconButton
                                color={
                                    (props.contentBlock as TextBlock).verticalTextAlignment ===
                                    VerticalTextAlignment.TOP
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={() =>
                                    textAlignment.alignVerticalAxis(
                                        props.contentBlock as TextBlock,
                                        VerticalTextAlignment.TOP,
                                    )
                                }
                            >
                                <VerticalAlignTop />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Midten'}>
                            <IconButton
                                color={
                                    (props.contentBlock as TextBlock).verticalTextAlignment ===
                                    VerticalTextAlignment.CENTER
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={() =>
                                    textAlignment.alignVerticalAxis(
                                        props.contentBlock as TextBlock,
                                        VerticalTextAlignment.CENTER,
                                    )
                                }
                            >
                                <VerticalAlignCenter />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Nederst'}>
                            <IconButton
                                color={
                                    (props.contentBlock as TextBlock).verticalTextAlignment ===
                                    VerticalTextAlignment.BOTTOM
                                        ? 'primary'
                                        : 'neutral'
                                }
                                onClick={() =>
                                    textAlignment.alignVerticalAxis(
                                        props.contentBlock as TextBlock,
                                        VerticalTextAlignment.BOTTOM,
                                    )
                                }
                            >
                                <VerticalAlignBottom />
                            </IconButton>
                        </Tooltip>
                        <ColorPicker
                            toolTip={'Vælg Tekstfarve'}
                            onChange={(color: string) => {
                                if ((props.contentBlock as TextBlock).color !== color) {
                                    textColor.updateTextColor(props.contentBlock as TextBlock, color);
                                }
                            }}
                            initialColor={(props.contentBlock as TextBlock).color}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextPropertiesSection;
