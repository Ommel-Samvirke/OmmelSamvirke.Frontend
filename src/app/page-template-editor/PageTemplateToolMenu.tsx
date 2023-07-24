import styles from "./styles/PageTemplateToolMenu.module.scss";
import ToolMenuIcon from '@/app/page-template-editor/ToolMenuIcon';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';

const PageTemplateToolMenu = () => {
    return <div className={styles.pageTemplateEditorSidebar}>
        <ToolMenuIcon type={DraggableTypes.HEADLINE_BLOCK} />
        <ToolMenuIcon type={DraggableTypes.TEXT_BLOCK} />
        <ToolMenuIcon type={DraggableTypes.IMAGE_BLOCK} />
    </div>
};

export default PageTemplateToolMenu;
