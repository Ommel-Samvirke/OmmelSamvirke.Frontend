import { useCallback, useState } from "react";

import { GridConstants } from "@/features/pages/constants/GridConstants";
import { ContentBlockType } from "@/features/pages/types/ContentBlockType";

export const useLayoutState = () => {
    const [content, setContent] = useState<ContentBlockType[]>([]);
    const [rowCount, setRowCount] = useState<number>(GridConstants.COLUMNS);

    const updateContent = useCallback(
        (updateFn: (prevContent: ContentBlockType[]) => ContentBlockType[]) => {
            setContent(updateFn);
        },
        [],
    );

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
