import React, { useState, useRef, useEffect } from 'react';
import styles from "./styles/PageTemplateEditorHeader.module.scss";

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
            // Clean up the listener when the component unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className={styles.pageTemplateEditorHeader}>
            {editTemplateNameActive &&
                <input
                    ref={inputRef}
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                />
            }
            {!editTemplateNameActive &&
                <h1 onClick={() => setEditTemplateNameActive(true)}>{templateName}</h1>
            }
            
            <button>Gem Skabelon</button>
        </div>
    )
};

export default PageTemplateEditorHeader;
