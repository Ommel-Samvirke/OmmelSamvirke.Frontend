import styles from './styles/ToolMenu.module.scss';

import React from 'react';

import CoordinateWidget from '@/features/pages/components/tool-menu/CoordinateWidget';
import DeleteChanges from '@/features/pages/components/tool-menu/DeleteChanges';
import DraggableToolMenuIcon from '@/features/pages/components/tool-menu/DraggableToolMenuIcon';
import ManageRowCountButton from '@/features/pages/components/tool-menu/ManageRowCountButton';
import ToggleGridButton from '@/features/pages/components/tool-menu/ToggleGridButton';
import { ContentBlock } from '@/features/pages/enums/ContentBlock';

interface ToolMenuProps {
    addRow: () => void;
    removeRow: () => void;
    rowCount: number;
    toggleGrid: () => void;
    isGridVisible: boolean;
    currentXCoordinate: number;
    currentYCoordinate: number;
    minRows: number;
}

const ToolMenu = (props: ToolMenuProps) => {
    return (
        <>
            <div className={styles.toolMenu}>
                <DraggableToolMenuIcon type={ContentBlock.HEADLINE_BLOCK} tooltip="Overskrift" />
                <DraggableToolMenuIcon type={ContentBlock.TEXT_BLOCK} tooltip="Tekst" />
                <DraggableToolMenuIcon type={ContentBlock.IMAGE_BLOCK} tooltip="Billede" />
                <DraggableToolMenuIcon type={ContentBlock.PDF_BLOCK} tooltip="PDF" />
                <DraggableToolMenuIcon type={ContentBlock.VIDEO_BLOCK} tooltip="Video" />
                <DraggableToolMenuIcon type={ContentBlock.SLIDESHOW_BLOCK} tooltip="Galleri" />
                <div className={styles.separator}></div>
                <ManageRowCountButton
                    type={'add-row'}
                    tooltip={'Tilføj række'}
                    onClick={props.addRow}
                    rowCount={props.rowCount}
                    minRows={props.minRows}
                />
                <ManageRowCountButton
                    type={'remove-row'}
                    tooltip={'Fjern række'}
                    onClick={props.removeRow}
                    rowCount={props.rowCount}
                    minRows={props.minRows}
                />
                <ToggleGridButton onClick={props.toggleGrid} isGridVisible={props.isGridVisible} />
                <DeleteChanges />
            </div>
            <CoordinateWidget x={props.currentXCoordinate} y={props.currentYCoordinate} />
        </>
    );
};

export default ToolMenu;
