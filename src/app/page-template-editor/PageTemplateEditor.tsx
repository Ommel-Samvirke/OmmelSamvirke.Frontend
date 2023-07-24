"use client";

import styles from "./styles/PageTemplateEditor.module.scss";

import Grid from '@/app/page-template-editor/Grid';
import PageTemplateEditorHeader from '@/app/page-template-editor/PageTemplateEditorHeader';

const PageTemplateEditor = () => {
    return (
        <div className={styles.PageTemplateEditor}>
            <PageTemplateEditorHeader />
            <Grid />
        </div>
    )
};

export default PageTemplateEditor;