import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import { useState, useCallback } from 'react';

export const useLayoutState = () => {
    const [content, setContent] = useState<ContentBlockType[]>([]);
    const [rowCount, setRowCount] = useState<number>(GridConstants.COLUMNS);

    const updateContent = useCallback((updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => {
        setContent(updateFn);
    }, []);

    const updateRowCount = useCallback((newRowCount: number) => {
        setRowCount(newRowCount);
    }, []);

    return {
        content,
        rowCount,
        updateContent,
        updateRowCount,
    };
};
