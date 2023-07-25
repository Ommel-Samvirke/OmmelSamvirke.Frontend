import styles from "./styles/PageTemplateToolMenu.module.scss";
import ToolMenuIcon from '@/app/page-template-editor/ToolMenuIcon';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';

const PageTemplateToolMenu = () => {
    return <div className={styles.pageTemplateEditorSidebar}>
        <ToolMenuIcon type={DraggableTypes.HEADLINE_BLOCK} tooltip="Overskrift"/>
        <ToolMenuIcon type={DraggableTypes.TEXT_BLOCK} tooltip="Tekst" />
        <ToolMenuIcon type={DraggableTypes.IMAGE_BLOCK} tooltip="Billede" />
        <ToolMenuIcon type={DraggableTypes.PDF_BLOCK} tooltip="PDF" />
        <ToolMenuIcon type={DraggableTypes.VIDEO_BLOCK} tooltip="Video" />
        <ToolMenuIcon type={DraggableTypes.SLIDESHOW_BLOCK} tooltip="Galleri" />
    </div>
};

export default PageTemplateToolMenu;
