import ToggleGridButton from '@/app/page-template-editor/ToggleGridButton';
import styles from './styles/PageTemplateToolMenu.module.scss';
import DraggableToolMenuIcon from '@/app/page-template-editor/DraggableToolMenuIcon';
import { DraggableTypes } from '@/app/page-template-editor/constants/DraggableTypes';
import ManageRowCountButton from '@/app/page-template-editor/ManageRowCountButton';

interface PageTemplateToolMenuProps {
    addRow: () => void;
    removeRow: () => void;
    rowCount: number;
    toggleGrid: () => void;
    isGridVisible: boolean;
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
        <ManageRowCountButton type={'add-row'} tooltip={'Tilføj række'} onClick={props.addRow} rowCount={props.rowCount}/>
        <ManageRowCountButton type={'remove-row'} tooltip={'Fjern række'} onClick={props.removeRow} rowCount={props.rowCount}/>
        <ToggleGridButton onClick={props.toggleGrid} isGridVisible={props.isGridVisible}/>
    </div>;
};

export default PageTemplateToolMenu;
