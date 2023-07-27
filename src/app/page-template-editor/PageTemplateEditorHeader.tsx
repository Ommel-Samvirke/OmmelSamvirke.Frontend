import { Layout } from '@/app/page-template-editor/constants/Layouts';
import { EditHistoryContext } from '@/app/page-template-editor/context/EditHistoryContext';
import { LayoutContext } from '@/app/page-template-editor/context/LayoutContext';
import ColorPicker from '@/components/ColorPicker';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import RedoIcon from '@mui/icons-material/Redo';
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { Input } from '@mui/joy';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';

import React, { useContext, useRef, useState } from 'react';
import { roboto } from '../fonts';
import styles from './styles/PageTemplateEditorHeader.module.scss';

interface PageTemplateEditorHeaderProps {
    onUndo: () => void,
    onRedo: () => void
}

const PageTemplateEditorHeader = (props: PageTemplateEditorHeaderProps) => {
    const [templateName, setTemplateName] = useState<string>('Unavngiven Side');
    const [isInputHovered, setIsInputHovered] = useState<boolean>(false);
    const editHistoryContext = useContext(EditHistoryContext);
    const layoutContext = useContext(LayoutContext);

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
                        <IconButton 
                            color={layoutContext.currentLayout == Layout.DESKTOP ? 'primary' : 'neutral'}
                            onClick={() => layoutContext.selectLayout(Layout.DESKTOP)}
                        >
                            <DesktopWindowsOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tablet (820px)">
                        <IconButton
                            color={layoutContext.currentLayout == Layout.TABLET ? 'primary' : 'neutral'}
                            onClick={() => layoutContext.selectLayout(Layout.TABLET)}
                        >
                            <TabletMacOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Smartphone(360px)">
                        <IconButton
                            color={layoutContext.currentLayout == Layout.MOBILE ? 'primary' : 'neutral'}
                            onClick={() => layoutContext.selectLayout(Layout.MOBILE)}
                        >
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
