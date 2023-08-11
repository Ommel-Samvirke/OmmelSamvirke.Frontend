import { useCallback, useState } from 'react';

import { Layout } from '@/features/pages/enums/Layouts';

export const useLayout = (initialLayout: Layout) => {
    const [layout, setLayout] = useState<Layout>(initialLayout);
    const [color, setColor] = useState<string>('#ffffff');

    const updateLayout = useCallback((newLayout: Layout) => {
        setLayout(newLayout);
    }, []);

    const updateColor = useCallback((newColor: string) => {
        setColor(newColor);
    }, []);

    return {
        layout,
        updateLayout,
        color,
        updateColor,
    };
};
