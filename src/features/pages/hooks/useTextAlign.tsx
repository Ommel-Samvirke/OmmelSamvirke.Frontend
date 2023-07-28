import { useCallback, useContext } from "react";

import { EditHistoryContext } from "@/features/pages/context/EditHistoryContext";
import { LayoutContext } from "@/features/pages/context/LayoutContext";
import { HorizontalTextAlignment } from "@/features/pages/enums/HorizontalTextAlignment";
import { VerticalTextAlignment } from "@/features/pages/enums/VerticalTextAlignment";
import { TextContentBlock } from "@/features/pages/types/TextContentBlock";

interface useTextAlignProps {
    textContentBlock: TextContentBlock;
}

const useTextAlign = (props: useTextAlignProps) => {
    const layoutContext = useContext(LayoutContext);
    const editHistoryContext = useContext(EditHistoryContext);

    const alignVerticalAxis = useCallback(
        (alignment: VerticalTextAlignment) => {
            const currentState = layoutContext.getCurrentLayoutContent();

            const blockIndex = currentState.findIndex(
                (block) => block === props.textContentBlock,
            );

            if (blockIndex === -1) return;

            layoutContext.updateCurrentLayoutContent((prevContent) => {
                const updatedBlock = {
                    ...prevContent[blockIndex],
                    verticalTextAlignment: alignment,
                };

                return [
                    ...prevContent.slice(0, blockIndex),
                    updatedBlock,
                    ...prevContent.slice(blockIndex + 1),
                ];
            });

            editHistoryContext.updateBuffers(
                currentState,
                layoutContext.currentLayout,
            );
        },
        [props.textContentBlock, editHistoryContext, layoutContext],
    );

    const alignHorizontalAxis = useCallback(
        (alignment: HorizontalTextAlignment) => {
            const currentState = layoutContext.getCurrentLayoutContent();

            const blockIndex = currentState.findIndex(
                (block) => block === props.textContentBlock,
            );

            if (blockIndex === -1) return;

            layoutContext.updateCurrentLayoutContent((prevContent) => {
                const updatedBlock = {
                    ...prevContent[blockIndex],
                    horizontalTextAlignment: alignment,
                };

                return [
                    ...prevContent.slice(0, blockIndex),
                    updatedBlock,
                    ...prevContent.slice(blockIndex + 1),
                ];
            });

            editHistoryContext.updateBuffers(
                currentState,
                layoutContext.currentLayout,
            );
        },
        [props.textContentBlock, editHistoryContext, layoutContext],
    );

    return {
        alignVerticalAxis,
    };
};

export default useTextAlign;
