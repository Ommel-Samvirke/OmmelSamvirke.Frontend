import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import { ChangeEvent } from 'react';

import PropertyInput from '@/features/pages/components/property-widget/PropertyInput';
import { Corner } from '@/features/pages/enums/Corner';
import useBorderRadius from '@/features/pages/hooks/useBorderRadius';
import { ImageBlock } from '@/features/pages/models/ImageBlock';

interface BorderRadiusSectionInterface {
    contentBlock: ImageBlock;
}

const BorderRadiusSection = (props: BorderRadiusSectionInterface) => {
    const borderRadius = useBorderRadius();

    return (
        <>
            <div className={styles.Header}>
                Kant-afrunding
                <div className={styles.separator}></div>
            </div>
            <div className={styles.Body}>
                <div className={styles.propertyInputRow}>
                    <PropertyInput
                        label={'Øverst-venstre'}
                        widthPercentage={50}
                        value={props.contentBlock.topLeftBorderRadius.radius}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            borderRadius.setBorderRadius(props.contentBlock, {
                                corner: Corner.TopLeft,
                                radius: +event.target.value,
                            })
                        }
                        minvalue={0}
                        maxvalue={100}
                        placeholder={'Radius'}
                        stepSize={5}
                    />
                    <PropertyInput
                        label={'Øverst-højre'}
                        widthPercentage={50}
                        value={props.contentBlock.topRightBorderRadius.radius}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            borderRadius.setBorderRadius(props.contentBlock, {
                                corner: Corner.TopRight,
                                radius: +event.target.value,
                            })
                        }
                        minvalue={0}
                        maxvalue={100}
                        placeholder={'Radius'}
                        stepSize={5}
                    />
                </div>
                <div className={styles.propertyInputRow}>
                    <PropertyInput
                        label={'Nederst-venstre'}
                        value={props.contentBlock.bottomLeftBorderRadius.radius}
                        widthPercentage={50}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            borderRadius.setBorderRadius(props.contentBlock, {
                                corner: Corner.BottomLeft,
                                radius: +event.target.value,
                            })
                        }
                        minvalue={0}
                        maxvalue={100}
                        placeholder={'Radius'}
                        stepSize={5}
                    />
                    <PropertyInput
                        label={'Nederst-højre'}
                        value={props.contentBlock.bottomRightBorderRadius.radius}
                        widthPercentage={50}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            borderRadius.setBorderRadius(props.contentBlock, {
                                corner: Corner.BottomRight,
                                radius: +event.target.value,
                            })
                        }
                        minvalue={0}
                        maxvalue={100}
                        placeholder={'Radius'}
                        stepSize={5}
                    />
                </div>
            </div>
        </>
    );
};

export default BorderRadiusSection;
