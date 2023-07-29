import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import { ChangeEvent } from 'react';

import PropertyInput from '@/features/pages/components/property-widget/PropertyInput';
import { Side } from '@/features/pages/enums/Side';
import usePadding from '@/features/pages/hooks/usePadding';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

interface PaddingSectionInterface {
    contentBlock: ContentBlockType;
}

const PaddingSection = (props: PaddingSectionInterface) => {
    const padding = usePadding();

    return (
        <>
            <div className={styles.Header}>
                Polstring
                <div className={styles.separator}></div>
            </div>
            <div className={styles.Body}>
                <div className={styles.propertyInputRow}>
                    <PropertyInput
                        label={'Top'}
                        widthPercentage={50}
                        value={props.contentBlock.topPadding.padding}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            padding.updatePadding(props.contentBlock, {
                                side: Side.Top,
                                padding: +event.target.value,
                            })
                        }
                        minvalue={props.contentBlock.minPadding}
                        maxvalue={40}
                        placeholder={'Polstring'}
                        stepSize={1}
                    />
                    <PropertyInput
                        label={'Bund'}
                        widthPercentage={50}
                        value={props.contentBlock.bottomPadding.padding}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            padding.updatePadding(props.contentBlock, {
                                side: Side.Bottom,
                                padding: +event.target.value,
                            })
                        }
                        minvalue={props.contentBlock.minPadding}
                        maxvalue={40}
                        placeholder={'Polstring'}
                        stepSize={1}
                    />
                </div>
                <div className={styles.propertyInputRow}>
                    <PropertyInput
                        label={'Venstre'}
                        value={props.contentBlock.leftPadding.padding}
                        widthPercentage={50}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            padding.updatePadding(props.contentBlock, {
                                side: Side.Left,
                                padding: +event.target.value,
                            })
                        }
                        minvalue={props.contentBlock.minPadding}
                        maxvalue={40}
                        placeholder={'Polstring'}
                        stepSize={1}
                    />
                    <PropertyInput
                        label={'Højre'}
                        value={props.contentBlock.rightPadding.padding}
                        widthPercentage={50}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            padding.updatePadding(props.contentBlock, {
                                side: Side.Right,
                                padding: +event.target.value,
                            })
                        }
                        minvalue={props.contentBlock.minPadding}
                        maxvalue={40}
                        placeholder={'Polstring'}
                        stepSize={1}
                    />
                </div>
            </div>
        </>
    );
};

export default PaddingSection;
