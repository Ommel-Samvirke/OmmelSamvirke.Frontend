"use client";

import styles from "./styles/PageTemplateEditor.module.scss";

import Grid from '@/app/page-template-editor/Grid';
import PageTemplateEditorHeader from '@/app/page-template-editor/PageTemplateEditorHeader';
import PageTemplateToolMenu from '@/app/page-template-editor/PageTemplateToolMenu';

const PageTemplateEditor = () => {
    return (
        <div className={styles.PageTemplateEditor}>
            <PageTemplateEditorHeader />
            <Grid />
            <PageTemplateToolMenu />
        </div>
    )
};

export default PageTemplateEditor;