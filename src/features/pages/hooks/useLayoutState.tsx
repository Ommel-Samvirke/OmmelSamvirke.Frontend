import { useCallback, useState } from 'react';

import { GridConstants } from '@/features/pages/constants/GridConstants';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

export const useLayoutState = () => {
    const [content, setContent] = useState<ContentBlockType[]>([]);
    const [rowCount, setRowCount] = useState<number>(GridConstants.COLUMNS);

    const updateContent = useCallback((updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => {
        setContent(updateFn);
    }, []);

    const incrementRowCount = () => {
        setRowCount((currentRowCount) => currentRowCount + 1);
    };

    const decrementRowCount = () => {
        setRowCount((currentRowCount) => currentRowCount - 1);
    };

    return {
        content,
        rowCount,
        updateContent,
        incrementRowCount,
        decrementRowCount,
    };
};
