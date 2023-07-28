"use client";

import PageEditor from "@/features/pages/components/page-editor/PageEditor";
import { EditHistoryContextProvider } from "@/features/pages/context/EditHistoryContext";
import { LayoutContextProvider } from "@/features/pages/context/LayoutContext";

const PageEditorPage = () => {
    return (
        <>
            <LayoutContextProvider>
                <EditHistoryContextProvider>
                    <PageEditor />
                </EditHistoryContextProvider>
            </LayoutContextProvider>
        </>
    );
};

export default PageEditorPage;
