import { useCallback, useContext } from 'react';

import { EditHistoryContext } from '@/features/pages/context/EditHistoryContext';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { TextContentBlock } from '@/features/pages/types/TextContentBlock';

const useTextColor = () => {
    const layoutContext = useContext(LayoutContext);
    const editHistoryContext = useContext(EditHistoryContext);

    const updateTextColor = useCallback(
        (contentBlock: TextContentBlock, color: string) => {
            const currentState = layoutContext.getCurrentLayoutContent();

            const blockIndex = currentState.findIndex((block) => block === contentBlock);

            if (blockIndex === -1) return;

            layoutContext.updateCurrentLayoutContent((prevContent) => {
                const updatedBlock = {
                    ...prevContent[blockIndex],
                    color: color,
                };

                return [...prevContent.slice(0, blockIndex), updatedBlock, ...prevContent.slice(blockIndex + 1)];
            });

            editHistoryContext.updateBuffers(currentState, layoutContext.currentLayout);
        },
        [editHistoryContext, layoutContext],
    );

    return {
        updateTextColor,
    };
};

export default useTextColor;
