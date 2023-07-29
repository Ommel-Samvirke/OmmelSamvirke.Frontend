﻿import styles from './styles/PropertyWidget.module.scss';

import { ForwardedRef, forwardRef } from 'react';

import DeleteSection from '@/features/pages/components/property-widget/DeleteSection';
import PositionPropertiesSection from '@/features/pages/components/property-widget/PositionPropertiesSection';
import TextPropertiesSection from '@/features/pages/components/property-widget/TextPropertiesSection';
import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

interface PropertyWidgetProps {
    contentBlock: ContentBlockType;
}

const PropertyWidget = forwardRef((props: PropertyWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.PropertyWidget + ' content-block-controls'}>
            <PositionPropertiesSection contentBlock={props.contentBlock} />
            {(props.contentBlock.type === ContentBlock.HEADLINE_BLOCK ||
                props.contentBlock.type === ContentBlock.TEXT_BLOCK) && (
                <TextPropertiesSection contentBlock={props.contentBlock} />
            )}
            <DeleteSection contentBlock={props.contentBlock} />
        </div>
    );
});

PropertyWidget.displayName = 'PropertyWidget';

export default PropertyWidget;
