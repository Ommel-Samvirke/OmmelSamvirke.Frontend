import React, { useState, useRef, useEffect } from 'react';
import styles from "./styles/PageTemplateEditorHeader.module.scss";
import Button from '@mui/joy/Button';
import { Input } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import Tooltip from '@mui/joy/Tooltip';

const PageTemplateEditorHeader = () => {
    const [templateName, setTemplateName] = useState<string>('Unavngiven skabelon');
    const [editTemplateNameActive, setEditTemplateNameActive] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setEditTemplateNameActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className={styles.pageTemplateEditorHeader}>
            <div className={styles.innerContainer}>
                <div>
                    {editTemplateNameActive &&
                        <Input
                            ref={inputRef}
                            type="text"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setEditTemplateNameActive(false);
                                }
                            }}
                        />
                    }
                    {!editTemplateNameActive &&
                        <h1 onClick={() => setEditTemplateNameActive(true)}>{templateName}</h1>
                    }
                </div>
                
                <div className={styles.buttonContainer}>
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
