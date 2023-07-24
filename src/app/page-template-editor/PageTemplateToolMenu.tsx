import styles from "./styles/PageTemplateToolMenu.module.scss";

const PageTemplateToolMenu = () => {
    return <div className={styles.pageTemplateEditorSidebar}>
        <span>Headline</span>
        <span>Video</span>
        <span>Pdf</span>
    </div>
};

export default PageTemplateToolMenu;