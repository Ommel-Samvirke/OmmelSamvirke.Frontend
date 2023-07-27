import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import { useState, useCallback } from 'react';
import { Layout } from '@/app/page-template-editor/constants/Layouts';

export const useLayout = (initialLayout: Layout) => {
    const [layout, setLayout] = useState<Layout>(initialLayout);
    const [color, setColor] = useState<string>('#ffffff');
    const [minRows, setMinRows] = useState<number>(GridConstants.COLUMNS);
    
    const updateLayout = useCallback((newLayout: Layout) => {
        setLayout(newLayout);
    }, []);
    
    const updateColor = useCallback((newColor: string) => {
        setColor(newColor);
    }, []);
    
    const updateMinRows = useCallback((newMinRows: number) => {
        setMinRows(newMinRows);
    }, []);

    return {
        layout,
        updateLayout,
        minRows,
        color,
        updateColor,
        updateMinRows
    };
};
