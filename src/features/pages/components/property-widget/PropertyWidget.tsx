﻿import styles from './styles/PropertyWidget.module.scss';

import { ForwardedRef, forwardRef } from 'react';

import ActionsSection from '@/features/pages/components/property-widget/ActionsSection';
import BorderRadiusSection from '@/features/pages/components/property-widget/BorderRadiusSection';
import PaddingSection from '@/features/pages/components/property-widget/PaddingSection';
import PositionPropertiesSection from '@/features/pages/components/property-widget/PositionPropertiesSection';
import SlideShowImagesSection from '@/features/pages/components/property-widget/SlideShowImagesSection';
import TextPropertiesSection from '@/features/pages/components/property-widget/TextPropertiesSection';
import VideoLinkSection from '@/features/pages/components/property-widget/VideoLinkSection';
import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { ImageBlock } from '@/features/pages/models/ImageBlock';
import { SlideshowBlock } from '@/features/pages/models/SlideshowBlock';
import { VideoBlock } from '@/features/pages/models/VideoBlock';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

interface PropertyWidgetProps {
    contentBlock: ContentBlockType;
    onEdit: () => void;
    isEditing: boolean;
    rowCount: number;
}

const PropertyWidget = forwardRef((props: PropertyWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.PropertyWidget + ' content-block-controls'}>
            <PositionPropertiesSection contentBlock={props.contentBlock} rowCount={props.rowCount} />
            <PaddingSection contentBlock={props.contentBlock} />
            {(props.contentBlock.type === ContentBlock.HEADLINE_BLOCK ||
                props.contentBlock.type === ContentBlock.TEXT_BLOCK) && (
                <TextPropertiesSection contentBlock={props.contentBlock} />
            )}
            {props.contentBlock.type === ContentBlock.IMAGE_BLOCK && (
                <BorderRadiusSection contentBlock={props.contentBlock as ImageBlock} />
            )}
            {props.contentBlock.type === ContentBlock.SLIDESHOW_BLOCK && (
                <SlideShowImagesSection slideshowBlock={props.contentBlock as SlideshowBlock} />
            )}
            {props.contentBlock.type === ContentBlock.VIDEO_BLOCK && (
                <VideoLinkSection contentBlock={props.contentBlock as VideoBlock} />
            )}
            <ActionsSection contentBlock={props.contentBlock} onEdit={props.onEdit} isEditing={props.isEditing} />
        </div>
    );
});

PropertyWidget.displayName = 'PropertyWidget';

export default PropertyWidget;
