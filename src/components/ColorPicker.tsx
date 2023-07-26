import { GridContext } from '@/app/page-template-editor/context/GridContext';
import Tooltip from '@mui/joy/Tooltip';
import styles from './styles/ColorPicker.module.scss';

import { useContext, useEffect, useRef, useState } from 'react';

const ColorPicker = () => {
    const [color, setColor] = useState('#ffffff');
    const colorDisplayRef = useRef<HTMLDivElement>(null);
    const gridContext = useContext(GridContext);

    useEffect(() => {
        gridContext.updateColor(color);
        
        if (!colorDisplayRef.current) return;
        colorDisplayRef.current.style.backgroundColor = color;
    }, [color]);

    return (
        <label htmlFor="colorPicker" className={styles.colorPickerWrapper}>
            <Tooltip title={'Baggrundsfarve'}>
                <span>
                    <div ref={colorDisplayRef} className={styles.colorDisplay}></div>
                    <input
                        className={styles.colorPickerInput}
                        type="color"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                    />
                </span>
            </Tooltip>
        </label>
    );
};

export default ColorPicker;
