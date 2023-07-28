"use client";

import PageEditor from "@/features/pages/components/page-editor/PageEditor";
import { EditHistoryContextProvider } from "@/features/pages/context/EditHistoryContext";
import { EditorContextProvider } from "@/features/pages/context/EditorContext";
import { LayoutContextProvider } from "@/features/pages/context/LayoutContext";

const PageEditorPage = () => {
    return (
        <>
            <LayoutContextProvider>
                <EditHistoryContextProvider>
                    <EditorContextProvider>
                        <PageEditor />
                    </EditorContextProvider>
                </EditHistoryContextProvider>
            </LayoutContextProvider>
        </>
    );
};

export default PageEditorPage;
