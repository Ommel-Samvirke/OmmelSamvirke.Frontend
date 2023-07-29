import styles from './styles/ColorPicker.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import Tooltip from '@mui/joy/Tooltip';

interface ColorPickerProps {
    toolTip: string;
    onChange: (color: string) => void;
    initialColor?: string;
}

const ColorPicker = (props: ColorPickerProps) => {
    const [color, setColor] = useState(props.initialColor || '#ffffff');
    const colorDisplayRef = useRef<HTMLDivElement>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        props.onChange(color);

        if (!colorDisplayRef.current) return;
        colorDisplayRef.current.style.backgroundColor = color;
    }, [color, props]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedColor = e.target.value;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            setColor(selectedColor);
        }, 50);
    };

    return (
        <label htmlFor="colorPicker" className={styles.colorPickerWrapper}>
            <Tooltip title={props.toolTip}>
                <span>
                    <div ref={colorDisplayRef} className={styles.colorDisplay}></div>
                    <input
                        className={styles.colorPickerInput}
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </span>
            </Tooltip>
        </label>
    );
};

export default ColorPicker;
