import Grid from '@/app/page-template-editor/Grid';
import PageTemplateEditorHeader from '@/app/page-template-editor/PageTemplateEditorHeader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './styles/PageTemplateEditor.module.scss';

const PageTemplateEditor = () => {
    return (
        <div className={styles.PageTemplateEditor}>
            <PageTemplateEditorHeader/>
            <DndProvider backend={HTML5Backend}>
                <Grid/>
            </DndProvider>
        </div>
    );
};

export default PageTemplateEditor;
