import { VerticalTextAlignment } from '@/features/pages/enums/VerticalTextAlignment';
import styles from './styles/PropertyWidget.module.scss';

import { ChangeEvent, ForwardedRef, forwardRef } from 'react';

import { GridConstants } from '@/features/pages/constants/GridConstants';
import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { HorizontalTextAlignment } from '@/features/pages/enums/HorizontalTextAlignment';
import { useContentBlockManager } from '@/features/pages/hooks/useContentBlockManager';
import UseTextAlign from '@/features/pages/hooks/useTextAlign';
import { TextBlock } from '@/features/pages/models/TextBlock';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';
import {
    Delete,
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight,
    VerticalAlignBottom,
    VerticalAlignCenter,
    VerticalAlignTop,
} from '@mui/icons-material';
import { FormControl, FormLabel, Input } from '@mui/joy';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';

interface PropertyWidgetProps {
    contentBlock: ContentBlockType;
}

const PropertyWidget = forwardRef((props: PropertyWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
    const textAlignment = UseTextAlign();
    const contentBlockManager = useContentBlockManager();

    return (
        <div ref={ref} className={styles.PropertyWidget + ' content-block-controls'}>
            <div className={styles.Header}>
                Egenskaber
                <div className={styles.separator}></div>
            </div>
            <div className={styles.Body}>
                <div className={styles.propertyInputRow}>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>X-Position</FormLabel>
                        <Input
                            placeholder="X"
                            value={props.contentBlock.x}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 0,
                                    max: GridConstants.COLUMNS - 1,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                contentBlockManager.moveContentBlock(
                                    props.contentBlock.id,
                                    +event.target.value,
                                    props.contentBlock.y,
                                )
                            }
                        />
                    </FormControl>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>Y-Position</FormLabel>
                        <Input
                            placeholder="Y"
                            value={props.contentBlock.y}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 0,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                contentBlockManager.moveContentBlock(
                                    props.contentBlock.id,
                                    props.contentBlock.x,
                                    +event.target.value,
                                )
                            }
                        />
                    </FormControl>
                </div>
                <div className={styles.propertyInputRow}>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>Bredde</FormLabel>
                        <Input
                            placeholder="Bredde"
                            value={props.contentBlock.width}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 1,
                                    max: GridConstants.COLUMNS,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                contentBlockManager.resizeContentBlock(
                                    props.contentBlock.id,
                                    +event.target.value,
                                    props.contentBlock.height,
                                )
                            }
                        />
                    </FormControl>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>Højde</FormLabel>
                        <Input
                            placeholder="Højde"
                            value={props.contentBlock.height}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 1,
                                    max: 100,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                contentBlockManager.resizeContentBlock(
                                    props.contentBlock.id,
                                    props.contentBlock.width,
                                    +event.target.value,
                                )
                            }
                        />
                    </FormControl>
                </div>
            </div>
            {(props.contentBlock.type === ContentBlock.HEADLINE_BLOCK ||
                props.contentBlock.type === ContentBlock.TEXT_BLOCK) && (
                <>
                    <div className={styles.Header}>
                        Tekstplacering
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
                                <button style={{ visibility: 'hidden' }}></button> {/* For layout purposes*/}
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className={styles.Footer}>
                <div className={styles.separator}></div>
                <Button
                    startDecorator={<Delete />}
                    color={'danger'}
                    onClick={() => contentBlockManager.removeContentBlock(props.contentBlock.id)}
                >
                    Slet
                </Button>
            </div>
        </div>
    );
});

PropertyWidget.displayName = 'PropertyWidget';

export default PropertyWidget;
