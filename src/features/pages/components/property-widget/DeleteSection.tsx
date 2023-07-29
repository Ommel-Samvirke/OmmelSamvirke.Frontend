import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import { useContentBlockManager } from '@/features/pages/hooks/useContentBlockManager';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';
import { Delete } from '@mui/icons-material';
import Button from '@mui/joy/Button';

interface DeleteSectionInterface {
    contentBlock: ContentBlockType;
}

const DeleteSection = (props: DeleteSectionInterface) => {
    const contentBlockManager = useContentBlockManager();

    return (
        <div className={styles.Footer}>
            <div className={styles.separator}></div>
            <Button
                startDecorator={<Delete />}
                color={'danger'}
                onClick={() => contentBlockManager.removeContentBlock(props.contentBlock.id)}
            >
                Slet
            </Button>
        </div>
    );
};

export default DeleteSection;
