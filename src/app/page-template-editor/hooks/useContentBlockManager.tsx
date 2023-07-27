import { LayoutContext } from '@/app/page-template-editor/context/LayoutContext';
import { canResizeOrMove } from '@/app/page-template-editor/helpers/ContentBlockHelpers';
import { ContentBlockType } from '@/app/page-template-editor/types/ContentBlockType';
import { EditHistoryContext } from '@/app/page-template-editor/context/EditHistoryContext';
import { useCallback, useContext } from 'react';

export const useContentBlockManager = () => {
    const editHistoryContext = useContext(EditHistoryContext);
    const layoutContext = useContext(LayoutContext);
    
    const canMoveContentBlock = useCallback((id: string, x: number, y: number, width?: number, height?: number) => {
        const content = layoutContext.getCurrentLayoutContent();
        const rowCount = layoutContext.getRowCount();
        const contentBlock : ContentBlockType | undefined = content.find(block => block.id === id);
        
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
    }, [layoutContext.getCurrentLayoutContent, layoutContext.getRowCount]);

    const moveContentBlock = useCallback((id: string, x: number, y: number) => {
        if (!canMoveContentBlock(id, x, y)) return;

        layoutContext.updateCurrentLayoutContent(prevBlocks => {
            editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
            return prevBlocks.map(block =>
                block.id === id ? { ...block, x, y } : block,
            );
        });
    }, [
        canMoveContentBlock,
        layoutContext.updateCurrentLayoutContent,
        editHistoryContext.updateBuffers
    ]);

    const resizeContentBlock = useCallback((id: string, width: number, height: number) => {
        const contentBlocks = layoutContext.getCurrentLayoutContent();
        let currentBlock: ContentBlockType | undefined = contentBlocks.find(block => block.id === id);
        if (!currentBlock) return;

        const { x, y } = currentBlock;
        if (!canMoveContentBlock(id, x, y, width, height)) return;
        
        layoutContext.updateCurrentLayoutContent(prevBlocks => {
            editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
            return prevBlocks.map(block =>
                block.id === id ? { ...block, width, height } : block,
            );
        });
        
    }, [
        canMoveContentBlock, 
        layoutContext.getCurrentLayoutContent,
        layoutContext.updateCurrentLayoutContent,
        editHistoryContext.updateBuffers
    ]);

    const addContentBlock = useCallback((contentBlock: ContentBlockType) => {
        layoutContext.updateCurrentLayoutContent(prevBlocks => {
            editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
            return [...prevBlocks, contentBlock];
        });
    }, [layoutContext.updateCurrentLayoutContent, editHistoryContext.updateBuffers]);

    const removeContentBlock = useCallback((id: string) => {
        layoutContext.updateCurrentLayoutContent(prevBlocks => {
            editHistoryContext.updateBuffers(prevBlocks, layoutContext.currentLayout);
            return prevBlocks.filter(block => block.id !== id);
        });
    }, [layoutContext.updateCurrentLayoutContent, editHistoryContext.updateBuffers]);
    
    return {
        canMoveContentBlock,
        moveContentBlock,
        resizeContentBlock,
        addContentBlock,
        removeContentBlock,
    };
};
