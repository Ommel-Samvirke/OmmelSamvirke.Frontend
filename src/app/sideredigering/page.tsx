'use client';

import { EditHistoryContextProvider } from '@/features/pages/context/EditHistoryContext';
import { LayoutContextProvider } from '@/features/pages/context/LayoutContext';
import dynamic from 'next/dynamic';

const DynamicPageEditor = dynamic(() => import('@/features/pages/components/page-editor/PageEditor'), { ssr: false });

const PageEditorPage = () => {
    return (
        <>
            <LayoutContextProvider>
                <EditHistoryContextProvider>
                    <DynamicPageEditor />
                </EditHistoryContextProvider>
            </LayoutContextProvider>
        </>
    );
};

export default PageEditorPage;
