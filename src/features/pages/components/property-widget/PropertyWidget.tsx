import styles from './styles/PropertyWidget.module.scss';

import { ForwardedRef, forwardRef } from 'react';

import ActionsSection from '@/features/pages/components/property-widget/ActionsSection';
import BorderRadiusSection from '@/features/pages/components/property-widget/BorderRadiusSection';
import PaddingSection from '@/features/pages/components/property-widget/PaddingSection';
import PositionPropertiesSection from '@/features/pages/components/property-widget/PositionPropertiesSection';
import TextPropertiesSection from '@/features/pages/components/property-widget/TextPropertiesSection';
import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { ImageBlock } from '@/features/pages/models/ImageBlock';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

interface PropertyWidgetProps {
    contentBlock: ContentBlockType;
    onEdit: () => void;
    isEditing: boolean;
}

const PropertyWidget = forwardRef((props: PropertyWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.PropertyWidget + ' content-block-controls'}>
            <PositionPropertiesSection contentBlock={props.contentBlock} />
            <PaddingSection contentBlock={props.contentBlock} />
            {(props.contentBlock.type === ContentBlock.HEADLINE_BLOCK ||
                props.contentBlock.type === ContentBlock.TEXT_BLOCK) && (
                <TextPropertiesSection contentBlock={props.contentBlock} />
            )}
            {props.contentBlock.type === ContentBlock.IMAGE_BLOCK && (
                <BorderRadiusSection contentBlock={props.contentBlock as ImageBlock} />
            )}
            {props.contentBlock.type === ContentBlock.SLIDESHOW_BLOCK && <></>}
            {props.contentBlock.type === ContentBlock.VIDEO_BLOCK && <></>}
            {props.contentBlock.type === ContentBlock.PDF_BLOCK && <></>}
            <ActionsSection contentBlock={props.contentBlock} onEdit={props.onEdit} isEditing={props.isEditing} />
        </div>
    );
});

PropertyWidget.displayName = 'PropertyWidget';

export default PropertyWidget;
