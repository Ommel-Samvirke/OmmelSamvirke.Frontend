import styles from "./styles/PageEditor.module.scss";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Grid from "@/features/pages/components/grid/Grid";
import PageEditorHeader from "@/features/pages/components/page-editor/PageEditorHeader";

const PageEditor = () => {
    return (
        <div className={styles.PageEditor}>
            <PageEditorHeader />
            <DndProvider backend={HTML5Backend}>
                <Grid />
            </DndProvider>
        </div>
    );
};

export default PageEditor;
