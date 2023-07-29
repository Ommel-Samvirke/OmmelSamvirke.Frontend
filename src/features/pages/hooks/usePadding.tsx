import { useCallback, useContext } from 'react';

import { EditHistoryContext } from '@/features/pages/context/EditHistoryContext';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { Side } from '@/features/pages/enums/Side';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';
import { Padding } from '@/features/pages/types/Padding';

const usePadding = () => {
    const layoutContext = useContext(LayoutContext);
    const editHistoryContext = useContext(EditHistoryContext);

    const updatePadding = useCallback(
        (contentBlock: ContentBlockType, padding: Padding) => {
            const currentState = layoutContext.getCurrentLayoutContent();

            const blockIndex = currentState.findIndex((block) => block === contentBlock);

            if (blockIndex === -1) return;

            layoutContext.updateCurrentLayoutContent((prevContent) => {
                const updatedBlock = {
                    ...prevContent[blockIndex],
                };

                switch (padding.side) {
                    case Side.Top:
                        updatedBlock.topPadding.padding = padding.padding;
                        break;
                    case Side.Right:
                        updatedBlock.rightPadding.padding = padding.padding;
                        break;
                    case Side.Bottom:
                        updatedBlock.bottomPadding.padding = padding.padding;
                        break;
                    case Side.Left:
                        updatedBlock.leftPadding.padding = padding.padding;
                        break;
                }

                return [...prevContent.slice(0, blockIndex), updatedBlock, ...prevContent.slice(blockIndex + 1)];
            });

            editHistoryContext.updateBuffers(currentState, layoutContext.currentLayout);
        },
        [editHistoryContext, layoutContext],
    );

    return {
        updatePadding,
    };
};

export default usePadding;
