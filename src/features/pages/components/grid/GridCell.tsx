import styles from "./styles/GridCell.module.scss";

import React, { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";

import DropOverlay from "@/features/pages/components/grid/DropOverlay";
import { DraggableTypes } from "@/features/pages/constants/DraggableTypes";
import { DragSource } from "@/features/pages/constants/DragSource";
import { EditorContext } from "@/features/pages/context/EditorContext";
import { LayoutContext } from "@/features/pages/context/LayoutContext";
import { IDraggableItem } from "@/features/pages/interfaces/IDraggableItem";
import { ContentBlockFactory } from "@/features/pages/models/ContentBlockFactory";
import { HeadlineBlock } from "@/features/pages/models/HeadlineBlock";
import { ImageBlock } from "@/features/pages/models/ImageBlock";
import { PdfBlock } from "@/features/pages/models/PdfBlock";
import { SlideshowBlock } from "@/features/pages/models/SlideshowBlock";
import { TextBlock } from "@/features/pages/models/TextBlock";
import { VideoBlock } from "@/features/pages/models/VideoBlock";

export interface GridCellProps {
    x: number;
    y: number;
    children?: React.ReactNode;
    setCoordinate?: (x: number, y: number) => void;
    displayGrid?: boolean;
}

const GridCell = (props: GridCellProps) => {
    const [gridBorderColor, setGridBorderColor] = useState<string>("#e0e0e0");
    const layoutContext = useContext(LayoutContext);
    const editorContext = useContext(EditorContext);

    useEffect(() => {
        let colorWithoutHash = layoutContext.color;

        if (layoutContext.color.startsWith("#")) {
            colorWithoutHash = layoutContext.color.slice(1);
        }

        let output = "#";
        for (let i = 0; i < 3; i++) {
            let colorComponent = parseInt(
                colorWithoutHash.substring(i * 2, i * 2 + 2),
                16,
            );
            colorComponent = Math.floor(colorComponent * 0.85);

            output += ("0" + colorComponent.toString(16)).slice(-2);
        }

        setGridBorderColor(output);
    }, [layoutContext.color]);

    const setCoordinate = (x: number, y: number) => {
        if (!props.setCoordinate) return;
        props.setCoordinate(x, y);
    };

    const [{ isOver, canDrop }, drop] = useDrop<
        IDraggableItem,
        void,
        { isOver: boolean; canDrop: boolean }
    >(
        () => ({
            accept: [
                DraggableTypes.HEADLINE_BLOCK,
                DraggableTypes.TEXT_BLOCK,
                DraggableTypes.IMAGE_BLOCK,
                DraggableTypes.PDF_BLOCK,
                DraggableTypes.VIDEO_BLOCK,
                DraggableTypes.SLIDESHOW_BLOCK,
            ],
            canDrop: (item: IDraggableItem) => {
                if (item.source === DragSource.TOOL_MENU) {
                    switch (item.type) {
                        case DraggableTypes.HEADLINE_BLOCK:
                            return editorContext.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                HeadlineBlock.defaultWidth,
                                HeadlineBlock.defaultHeight,
                            );
                        case DraggableTypes.TEXT_BLOCK:
                            return editorContext.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                TextBlock.defaultWidth,
                                TextBlock.defaultHeight,
                            );
                        case DraggableTypes.IMAGE_BLOCK:
                            return editorContext.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                ImageBlock.defaultWidth,
                                ImageBlock.defaultHeight,
                            );
                        case DraggableTypes.PDF_BLOCK:
                            return editorContext.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                PdfBlock.defaultWidth,
                                PdfBlock.defaultHeight,
                            );
                        case DraggableTypes.VIDEO_BLOCK:
                            return editorContext.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                VideoBlock.defaultWidth,
                                VideoBlock.defaultHeight,
                            );
                        case DraggableTypes.SLIDESHOW_BLOCK:
                            return editorContext.canMoveContentBlock(
                                item.id,
                                props.x,
                                props.y,
                                SlideshowBlock.defaultWidth,
                                SlideshowBlock.defaultHeight,
                            );
                    }
                }

                return editorContext.canMoveContentBlock(
                    item.id,
                    props.x,
                    props.y,
                );
            },
            drop: (item: IDraggableItem) => {
                if (item.source === DragSource.TOOL_MENU) {
                    editorContext.addContentBlock(
                        ContentBlockFactory.createContentBlock(
                            layoutContext.currentLayout,
                            item.type,
                            props.x,
                            props.y,
                        ),
                    );
                } else if (item.source === DragSource.CONTENT_BLOCK) {
                    editorContext.moveContentBlock(item.id, props.x, props.y);
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [
            props.x,
            props.y,
            layoutContext.currentLayout,
            layoutContext.getCurrentLayoutContent,
        ],
    );

    return (
        <div
            ref={drop}
            className={styles.gridCell}
            onMouseEnter={() => setCoordinate(props.x, props.y)}
            style={{
                border: props.displayGrid
                    ? `1px solid ${gridBorderColor}`
                    : "none",
            }}
        >
            {isOver && canDrop && <DropOverlay color={"yellow"} />}
            {isOver && !canDrop && <DropOverlay color={"red"} />}

            {props.children}
        </div>
    );
};

export default GridCell;
