"use client";

import { EditHistoryContextProvider } from '@/app/page-template-editor/context/EditHistoryContext';
import { EditorContextProvider } from '@/app/page-template-editor/context/EditorContext';
import { LayoutContextProvider } from '@/app/page-template-editor/context/LayoutContext';
import React from 'react';
import PageTemplateEditor from '@/app/page-template-editor/PageTemplateEditor';

export default function Home() {
    return (
        <>
            <LayoutContextProvider>
                <EditHistoryContextProvider>
                    <EditorContextProvider>
                        <PageTemplateEditor/>
                    </EditorContextProvider>
                </EditHistoryContextProvider>
            </LayoutContextProvider>
        </>
    );
}
