import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import { ChangeEvent } from 'react';

import PropertyInput from '@/features/pages/components/property-widget/PropertyInput';
import { GridConstants } from '@/features/pages/constants/GridConstants';
import { useContentBlockManager } from '@/features/pages/hooks/useContentBlockManager';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

interface PositionPropertiesSectionInterface {
    contentBlock: ContentBlockType;
    rowCount: number;
}

const PositionPropertiesSection = (props: PositionPropertiesSectionInterface) => {
    const contentBlockManager = useContentBlockManager();

    return (
        <>
            <div className={styles.Header}>
                Position
                <div className={styles.separator}></div>
            </div>
            <div className={styles.Body}>
                <div className={styles.propertyInputRow}>
                    <PropertyInput
                        label={'X-Position'}
                        widthPercentage={50}
                        value={props.contentBlock.x}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            contentBlockManager.moveContentBlock(
                                props.contentBlock.id,
                                +event.target.value,
                                props.contentBlock.y,
                                props.rowCount,
                            )
                        }
                        minvalue={0}
                        maxvalue={GridConstants.COLUMNS - 1}
                        placeholder={'X'}
                    />
                    <PropertyInput
                        label={'Y-Position'}
                        widthPercentage={50}
                        value={props.contentBlock.y}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            contentBlockManager.moveContentBlock(
                                props.contentBlock.id,
                                props.contentBlock.x,
                                +event.target.value,
                                props.rowCount,
                            )
                        }
                        minvalue={0}
                        placeholder={'Y'}
                    />
                </div>
                <div className={styles.propertyInputRow}>
                    <PropertyInput
                        label={'Bredde'}
                        value={props.contentBlock.width}
                        widthPercentage={50}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            contentBlockManager.resizeContentBlock(
                                props.contentBlock.id,
                                +event.target.value,
                                props.contentBlock.height,
                                props.rowCount
                            )
                        }
                        minvalue={1}
                        maxvalue={GridConstants.COLUMNS}
                        placeholder={'Bredde'}
                    />
                    <PropertyInput
                        label={'Højde'}
                        value={props.contentBlock.height}
                        widthPercentage={50}
                        contentBlock={props.contentBlock}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            contentBlockManager.resizeContentBlock(
                                props.contentBlock.id,
                                props.contentBlock.width,
                                +event.target.value,
                                props.rowCount
                            )
                        }
                        minvalue={1}
                        maxvalue={100}
                        placeholder={'Højde'}
                    />
                </div>
            </div>
        </>
    );
};

export default PositionPropertiesSection;
