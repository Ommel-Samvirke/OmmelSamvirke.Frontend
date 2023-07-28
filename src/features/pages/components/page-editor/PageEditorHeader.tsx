import styles from "./styles/PageEditorHeader.module.scss";

import React, { useContext, useEffect, useRef, useState } from "react";

import { roboto } from "@/app/fonts";
import ColorPicker from "@/features/pages/components/color-picker/ColorPicker";
import { EditHistoryContext } from "@/features/pages/context/EditHistoryContext";
import { LayoutContext } from "@/features/pages/context/LayoutContext";
import { Layout } from "@/features/pages/enums/Layouts";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import RedoIcon from "@mui/icons-material/Redo";
import TabletMacOutlinedIcon from "@mui/icons-material/TabletMacOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import { Input } from "@mui/joy";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";

const PageEditorHeader = () => {
    const [Name, setName] = useState<string>("Unavngiven Side");
    const [isInputHovered, setIsInputHovered] = useState<boolean>(false);
    const editHistoryContext = useContext(EditHistoryContext);
    const layoutContext = useContext(LayoutContext);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "z") {
                editHistoryContext.undo();
            } else if ((event.ctrlKey || event.metaKey) && event.key === "y") {
                editHistoryContext.redo();
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [editHistoryContext, layoutContext.currentLayout]);

    return (
        <div className={styles.pageEditorHeader}>
            <div className={styles.innerContainer}>
                <div className={styles.leftContainer}>
                    {!editHistoryContext.isUndoCapacityEmpty(
                        layoutContext.currentLayout,
                    ) && (
                        <Tooltip title="Fortryd (Ctrl+Z)">
                            <IconButton
                                variant="soft"
                                onClick={() => editHistoryContext.undo()}
                            >
                                <UndoIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {editHistoryContext.isUndoCapacityEmpty(
                        layoutContext.currentLayout,
                    ) && (
                        <Tooltip title="Fortryd (Ctrl+Z)">
                            <span style={{ cursor: "not-allowed" }}>
                                <IconButton variant="soft" disabled={true}>
                                    <UndoIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}
                    {!editHistoryContext.isRedoCapacityEmpty(
                        layoutContext.currentLayout,
                    ) && (
                        <Tooltip title="Annuller fortryd (Ctrl+Y)">
                            <IconButton
                                variant="soft"
                                onClick={() => editHistoryContext.redo()}
                            >
                                <RedoIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {editHistoryContext.isRedoCapacityEmpty(
                        layoutContext.currentLayout,
                    ) && (
                        <Tooltip title="Annuller fortryd (Ctrl+Y)">
                            <span style={{ cursor: "not-allowed" }}>
                                <IconButton variant="soft" disabled={true}>
                                    <RedoIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}
                    <Input
                        ref={inputRef}
                        type="text"
                        variant={isInputHovered ? "outlined" : "plain"}
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className={
                            roboto.className +
                            " " +
                            (isInputHovered ? "" : styles.inputNotHovered)
                        }
                        onMouseEnter={() => setIsInputHovered(true)}
                        onMouseLeave={() => setIsInputHovered(false)}
                        name={"pageName"}
                        id={"pageName"}
                    />
                </div>

                <div className={styles.rightContainer}>
                    <ColorPicker />
                    <Tooltip title="Computer (1920px)">
                        <IconButton
                            color={
                                layoutContext.currentLayout == Layout.DESKTOP
                                    ? "primary"
                                    : "neutral"
                            }
                            onClick={() =>
                                layoutContext.selectLayout(Layout.DESKTOP)
                            }
                        >
                            <DesktopWindowsOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tablet (820px)">
                        <IconButton
                            color={
                                layoutContext.currentLayout == Layout.TABLET
                                    ? "primary"
                                    : "neutral"
                            }
                            onClick={() =>
                                layoutContext.selectLayout(Layout.TABLET)
                            }
                        >
                            <TabletMacOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Smartphone(360px)">
                        <IconButton
                            color={
                                layoutContext.currentLayout == Layout.MOBILE
                                    ? "primary"
                                    : "neutral"
                            }
                            onClick={() =>
                                layoutContext.selectLayout(Layout.MOBILE)
                            }
                        >
                            <PhoneIphoneOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Button>Gem Side</Button>
                </div>
            </div>
        </div>
    );
};

export default PageEditorHeader;
