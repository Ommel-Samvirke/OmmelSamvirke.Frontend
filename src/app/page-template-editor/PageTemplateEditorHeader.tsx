import { EditHistoryContext } from '@/app/page-template-editor/context/EditHistoryContext';
import styles from './styles/PageTemplateEditorHeader.module.scss';
import { roboto } from '../fonts';

import React, { useState, useRef, useContext } from 'react';
import ColorPicker from '@/components/ColorPicker';
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
    const [templateName, setTemplateName] = useState<string>('Unavngiven Side');
    const [isInputHovered, setIsInputHovered] = useState<boolean>(false);
    const editHistoryContext = useContext(EditHistoryContext);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.pageTemplateEditorHeader}>
            <div className={styles.innerContainer}>
                <div className={styles.leftContainer}>
                    {
                        editHistoryContext.undoBufferUsedCapacity > 0 &&
                        <Tooltip title="Fortryd (Ctrl+Z)">
                            <IconButton variant="soft" onClick={props.onUndo}>
                                <UndoIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        editHistoryContext.undoBufferUsedCapacity == 0 &&
                        <Tooltip title="Fortryd (Ctrl+Z)">
                            <span style={{ cursor: 'not-allowed' }}>
                                <IconButton variant="soft" disabled={true}>
                                    <UndoIcon/>
                                </IconButton>
                            </span>
                        </Tooltip>
                    }
                    {
                        editHistoryContext.redoBufferUsedCapacity > 0 &&
                        <Tooltip title="Annuller fortryd (Ctrl+Y)">
                            <IconButton variant="soft" onClick={props.onRedo}>
                                <RedoIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        editHistoryContext.redoBufferUsedCapacity == 0 &&
                        <Tooltip title="Annuller fortryd (Ctrl+Y)">
                            <span style={{ cursor: 'not-allowed' }}>
                                <IconButton variant="soft" disabled={true}>
                                    <RedoIcon/>
                                </IconButton>
                            </span>
                        </Tooltip>
                    }

                    <Input
                        ref={inputRef}
                        type="text"
                        variant={isInputHovered ? 'outlined' : 'plain'}
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className={roboto.className + ' ' + (isInputHovered ? '' : styles.inputNotHovered)}
                        onMouseEnter={() => setIsInputHovered(true)}
                        onMouseLeave={() => setIsInputHovered(false)}
                    />
                </div>

                <div className={styles.rightContainer}>
                    <ColorPicker/>
                    <Tooltip title="Computer (1920px)">
                        <IconButton variant="soft">
                            <DesktopWindowsOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tablet (820px)">
                        <IconButton>
                            <TabletMacOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Smartphone(360px)">
                        <IconButton>
                            <PhoneIphoneOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Button>Gem Side</Button>
                </div>
            </div>
        </div>
    );
};

export default PageTemplateEditorHeader;
