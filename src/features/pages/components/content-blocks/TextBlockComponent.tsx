import styles from './styles/TextBlockComponent.module.scss';

import React, { ForwardedRef, forwardRef, useCallback, useContext, useEffect, useState } from 'react';

import { EditHistoryContext } from '@/features/pages/context/EditHistoryContext';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import { HorizontalTextAlignment } from '@/features/pages/enums/HorizontalTextAlignment';
import { VerticalTextAlignment } from '@/features/pages/enums/VerticalTextAlignment';
import { TextBlock } from '@/features/pages/models/TextBlock';
import { Property } from 'csstype';
import AlignItems = Property.AlignItems;
import TextAlign = Property.TextAlign;
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Editor } from 'react-draft-wysiwyg';

import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface TextBlockComponentProps {
    textBlock: TextBlock;
    isSelected: boolean;
    isEditing: boolean;
    disableEditing: () => void;
}

const TextBlockComponent = forwardRef((props: TextBlockComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [verticalTextAlignment, setVerticalTextAlignment] = useState<AlignItems>('start');
    const [horizontalTextAlignment, setHorizontalTextAlignment] = useState<TextAlign>('left');
    const [editorState, setEditorState] = useState(() => {
        const blocksFromHtml = htmlToDraft(props.textBlock.text);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
    });
    const layoutContext = useContext(LayoutContext);
    const editHistoryContext = useContext(EditHistoryContext);

    useEffect(() => {
        switch (props.textBlock.horizontalTextAlignment) {
            case HorizontalTextAlignment.LEFT:
                setHorizontalTextAlignment('left');
                break;
            case HorizontalTextAlignment.CENTER:
                setHorizontalTextAlignment('center');
                break;
            case HorizontalTextAlignment.RIGHT:
                setHorizontalTextAlignment('right');
                break;
            case HorizontalTextAlignment.JUSTIFY:
                setHorizontalTextAlignment('justify');
                break;
        }
    }, [props.textBlock.horizontalTextAlignment]);

    useEffect(() => {
        switch (props.textBlock.verticalTextAlignment) {
            case VerticalTextAlignment.TOP:
                setVerticalTextAlignment('start');
                break;
            case VerticalTextAlignment.CENTER:
                setVerticalTextAlignment('center');
                break;
            case VerticalTextAlignment.BOTTOM:
                setVerticalTextAlignment('end');
                break;
        }
    }, [props.textBlock.verticalTextAlignment]);

    const updateText = useCallback(() => {
        const currentState = layoutContext.getCurrentLayoutContent();

        const blockIndex = currentState.findIndex((block) => block === props.textBlock);

        if (blockIndex === -1) return;

        layoutContext.updateCurrentLayoutContent((prevContent) => {
            const updatedBlock = {
                ...prevContent[blockIndex],
                text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            };

            return [...prevContent.slice(0, blockIndex), updatedBlock, ...prevContent.slice(blockIndex + 1)];
        });

        editHistoryContext.updateBuffers(currentState, layoutContext.currentLayout);
    }, [editHistoryContext, editorState, layoutContext, props.textBlock]);

    useEffect(() => {
        if (!props.isSelected) {
            props.disableEditing();
        }
    }, [props.isSelected]);

    useEffect(() => {
        if (!props.isEditing) {
            updateText();
        }
    }, [props.isEditing]);

    return (
        <div
            ref={props.isEditing ? null : ref}
            className={styles.textContainer}
            style={{
                backgroundColor: layoutContext.color,
                alignItems: verticalTextAlignment,
                paddingTop: `${props.textBlock.topPadding.padding}px`,
                paddingBottom: `${props.textBlock.bottomPadding.padding}px`,
                paddingLeft: `${props.textBlock.leftPadding.padding}px`,
                paddingRight: `${props.textBlock.rightPadding.padding}px`,
            }}
        >
            <>
                {props.isEditing && (
                    <Editor
                        toolbarClassName={styles.toolbar}
                        wrapperClassName={styles.wrapper}
                        editorClassName={styles.editor}
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbar={{
                            options: ['history', 'inline', 'list', 'emoji', 'link'],
                            inline: { options: ['bold', 'italic', 'underline'] },
                            blockType: { options: ['Normal'] },
                            list: { options: ['unordered', 'ordered'] },
                            link: { options: ['link'] },
                            emoji: { options: ['emoji'] },
                            history: { options: ['undo', 'redo'] },
                            textAlign: { options: ['left', 'center', 'right', 'justify'] },
                        }}
                        localization={{
                            locale: 'da',
                        }}
                    />
                )}
                {!props.isEditing && (
                    <div
                        className={styles.textContent}
                        style={{ textAlign: horizontalTextAlignment, color: props.textBlock.color }}
                        dangerouslySetInnerHTML={{ __html: props.textBlock.text }}
                    ></div>
                )}
            </>
        </div>
    );
});

TextBlockComponent.displayName = 'TextBlock';

export default TextBlockComponent;
