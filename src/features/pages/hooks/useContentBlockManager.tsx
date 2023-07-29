import { useCallback, useContext } from 'react';

import { EditHistoryContext } from '@/features/pages/context/EditHistoryContext';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { canResizeOrMove } from '@/features/pages/helpers/ContentBlockHelpers';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';

export const useContentBlockManager = () => {
    const editHistoryContext = useContext(EditHistoryContext);
    const layoutContext = useContext(LayoutContext);

    const canMoveContentBlock = useCallback(
        (id: string, x: number, y: number, width?: number, height?: number) => {
            const content = layoutContext.getCurrentLayoutContent();
            const rowCount = layoutContext.getRowCount();
            const contentBlock: ContentBlockType | undefined = content.find((block) => block.id === id);

            if (!contentBlock) {
                if (!width || !height) return false;
                return canResizeOrMove(width, height, x, y, id, content, rowCount);
            }

            return canResizeOrMove(
                width ? width : contentBlock.width,
                height ? height : contentBlock.height,
                x,
                y,
                id,
                content,
                rowCount,
            );
        },
        [layoutContext],
    );

    const moveContentBlock = useCallback(
        (id: string, x: number, y: number) => {
            if (!canMoveContentBlock(id, x, y)) return;

            layoutContext.updateCurrentLayoutContent((prevBlocks) => {
                editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
                return prevBlocks.map((block) => (block.id === id ? { ...block, x, y } : block));
            });
        },
        [canMoveContentBlock, layoutContext, editHistoryContext],
    );

    const resizeContentBlock = useCallback(
        (id: string, width: number, height: number) => {
            const contentBlocks = layoutContext.getCurrentLayoutContent();
            let currentBlock: ContentBlockType | undefined = contentBlocks.find((block) => block.id === id);
            if (!currentBlock) return;

            const { x, y } = currentBlock;
            if (!canMoveContentBlock(id, x, y, width, height)) return;

            layoutContext.updateCurrentLayoutContent((prevBlocks) => {
                editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
                return prevBlocks.map((block) => (block.id === id ? { ...block, width, height } : block));
            });
        },
        [layoutContext, canMoveContentBlock, editHistoryContext],
    );

    const addContentBlock = useCallback(
        (contentBlock: ContentBlockType) => {
            layoutContext.updateCurrentLayoutContent((prevBlocks) => {
                editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
                return [...prevBlocks, contentBlock];
            });
        },
        [layoutContext, editHistoryContext],
    );

    const removeContentBlock = useCallback(
        (id: string) => {
            layoutContext.updateCurrentLayoutContent((prevBlocks) => {
                editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
                return prevBlocks.filter((block) => block.id !== id);
            });
        },
        [layoutContext, editHistoryContext],
    );

    return {
        canMoveContentBlock,
        moveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
    };
};
