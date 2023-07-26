import styles from './styles/PageTemplateToolMenu.module.scss';
import DraggableToolMenuIcon from '@/app/page-template-editor/DraggableToolMenuIcon';
import { DraggableTypes } from '@/app/page-template-editor/constants/DraggableTypes';
import ToolMenuButton from '@/app/page-template-editor/ToolMenuButton';

interface PageTemplateToolMenuProps {
    addRow: () => void;
    removeRow: () => void;
    rowCount: number;
}

const PageTemplateToolMenu = (props: PageTemplateToolMenuProps) => {
    return <div className={styles.toolMenu}>
        <DraggableToolMenuIcon type={DraggableTypes.HEADLINE_BLOCK} tooltip="Overskrift"/>
        <DraggableToolMenuIcon type={DraggableTypes.TEXT_BLOCK} tooltip="Tekst"/>
        <DraggableToolMenuIcon type={DraggableTypes.IMAGE_BLOCK} tooltip="Billede"/>
        <DraggableToolMenuIcon type={DraggableTypes.PDF_BLOCK} tooltip="PDF"/>
        <DraggableToolMenuIcon type={DraggableTypes.VIDEO_BLOCK} tooltip="Video"/>
        <DraggableToolMenuIcon type={DraggableTypes.SLIDESHOW_BLOCK} tooltip="Galleri"/>
        <div className={styles.separator}></div>
        <ToolMenuButton type={'add-row'} tooltip={'Tilføj række'} onClick={props.addRow} rowCount={props.rowCount}/>
        <ToolMenuButton type={'remove-row'} tooltip={'Fjern række'} onClick={props.removeRow}
                        rowCount={props.rowCount}/>
    </div>;
};

export default PageTemplateToolMenu;
