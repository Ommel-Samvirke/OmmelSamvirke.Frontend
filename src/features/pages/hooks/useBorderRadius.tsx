import { useCallback, useContext } from 'react';

import { EditHistoryContext } from '@/features/pages/context/EditHistoryContext';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { Corner } from '@/features/pages/enums/Corner';
import { ImageBlock } from '@/features/pages/models/ImageBlock';
import { BorderRadius } from '@/features/pages/types/BorderRadius';

const useBorderRadius = () => {
    const layoutContext = useContext(LayoutContext);
    const editHistoryContext = useContext(EditHistoryContext);

    const setBorderRadius = useCallback(
        (imageBlock: ImageBlock, borderRadius: BorderRadius) => {
            const currentState = layoutContext.getCurrentLayoutContent();

            const blockIndex = currentState.findIndex((block) => block === imageBlock);

            if (blockIndex === -1) return;

            layoutContext.updateCurrentLayoutContent((prevContent) => {
                const updatedBlock = {
                    ...prevContent[blockIndex],
                };

                switch (borderRadius.corner) {
                    case Corner.TopLeft:
                        (updatedBlock as ImageBlock).topLeftBorderRadius = borderRadius;
                        break;
                    case Corner.TopRight:
                        (updatedBlock as ImageBlock).topRightBorderRadius = borderRadius;
                        break;
                    case Corner.BottomLeft:
                        (updatedBlock as ImageBlock).bottomLeftBorderRadius = borderRadius;
                        break;
                    case Corner.BottomRight:
                        (updatedBlock as ImageBlock).bottomRightBorderRadius = borderRadius;
                        break;
                }

                return [...prevContent.slice(0, blockIndex), updatedBlock, ...prevContent.slice(blockIndex + 1)];
            });

            editHistoryContext.updateBuffers(currentState, layoutContext.currentLayout);
        },
        [editHistoryContext, layoutContext],
    );

    return {
        setBorderRadius,
    };
};

export default useBorderRadius;
