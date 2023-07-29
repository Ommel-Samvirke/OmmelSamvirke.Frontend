import styles from './styles/ToolMenu.module.scss';

import React, { useState } from 'react';

import CoordinateWidget from '@/features/pages/components/tool-menu/CoordinateWidget';
import DeleteChanges from '@/features/pages/components/tool-menu/DeleteChanges';
import DraggableToolMenuIcon from '@/features/pages/components/tool-menu/DraggableToolMenuIcon';
import ManageRowCountButton from '@/features/pages/components/tool-menu/ManageRowCountButton';
import ToggleGridButton from '@/features/pages/components/tool-menu/ToggleGridButton';
import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { KeyboardArrowDown } from '@mui/icons-material';

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
    const [isVisible, setIsVisible] = React.useState<boolean>(true);
    const [animate, setAnimate] = useState(false);
    const [allowAnimation, setAllowAnimation] = useState(false);
    const handleMouseOver = () => {
        setAllowAnimation(true);
    };

    const handleClick = () => {
        if (allowAnimation) {
            setAnimate(true);
        }
    };

    return (
        <>
            <div className={styles.toolMenu + ' ' + (isVisible ? '' : styles.hidden)}>
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
            <CoordinateWidget x={props.currentXCoordinate} y={props.currentYCoordinate} hide={!isVisible} />
            <div
                className={
                    styles.toggleToolMenu + ' ' + (isVisible ? '' : styles.open) + ' ' + (animate ? styles.animate : '')
                }
                onMouseOver={handleMouseOver}
                onClick={() => {
                    handleClick();
                    setIsVisible(!isVisible);
                }}
            >
                <KeyboardArrowDown />
            </div>
        </>
    );
};

export default ToolMenu;
