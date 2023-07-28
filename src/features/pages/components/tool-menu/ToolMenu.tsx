import styles from "./styles/ToolMenu.module.scss";

import React from "react";

import CoordinateWidget from "./CoordinateWidget";
import DraggableToolMenuIcon from "./DraggableToolMenuIcon";
import ManageRowCountButton from "./ManageRowCountButton";
import ToggleGridButton from "./ToggleGridButton";

import { ContentBlock } from "@/features/pages/enums/ContentBlock";

interface ToolMenuProps {
    addRow: () => void;
    removeRow: () => void;
    rowCount: number;
    toggleGrid: () => void;
    isGridVisible: boolean;
    currentXCoordinate: number;
    currentYCoordinate: number;
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
                    type={"add-row"}
                    tooltip={"Tilføj række"}
                    onClick={props.addRow}
                    rowCount={props.rowCount}
                />
                <ManageRowCountButton
                    type={"remove-row"}
                    tooltip={"Fjern række"}
                    onClick={props.removeRow}
                    rowCount={props.rowCount}
                />
                <ToggleGridButton onClick={props.toggleGrid} isGridVisible={props.isGridVisible} />
            </div>
            <CoordinateWidget x={props.currentXCoordinate} y={props.currentYCoordinate} />
        </>
    );
};

export default ToolMenu;
