import styles from "./styles/PageTemplateEditorHeader.module.scss";
import { roboto } from '../fonts';

import React, { useState, useRef } from 'react';
import Button from '@mui/joy/Button';
import { Input } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Tooltip from '@mui/joy/Tooltip';

interface PageTemplateEditorHeaderProps {
    onUndo: () => void,
    onRedo: () => void
}

const PageTemplateEditorHeader = (props: PageTemplateEditorHeaderProps) => {
    const [templateName, setTemplateName] = useState<string>('Unavngiven skabelon');
    const [isInputHovered, setIsInputHovered] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.pageTemplateEditorHeader}>
            <div className={styles.innerContainer}>
                <div className={styles.leftContainer}>
                    <Tooltip title="Fortryd (Ctrl+Z)">
                        <IconButton variant='soft' onClick={props.onUndo}>
                            <UndoIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Annuller fortryd (Ctrl+Y)">
                        <IconButton variant='soft' onClick={props.onRedo}>
                            <RedoIcon />
                        </IconButton>
                    </Tooltip>
                    <Input
                        ref={inputRef}
                        type="text"
                        variant={isInputHovered ? 'outlined' : 'plain'}
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className={roboto.className + ' ' + (isInputHovered ? '': styles.inputNotHovered) }
                        onMouseEnter={() => setIsInputHovered(true)}
                        onMouseLeave={() => setIsInputHovered(false)}
                    />
                </div>
                
                <div className={styles.rightContainer}>
                    <Tooltip title="Computer">
                        <IconButton variant='soft'>
                            <DesktopWindowsOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tablet">
                        <IconButton>
                            <TabletMacOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Smartphone">
                        <IconButton>
                            <PhoneIphoneOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Button>Gem Skabelon</Button>
                </div>
            </div>
        </div>
    )
};

export default PageTemplateEditorHeader;
