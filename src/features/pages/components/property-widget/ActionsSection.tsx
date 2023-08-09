import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import { ContentBlock } from '@/features/pages/enums/ContentBlock';
import { useContentBlockManager } from '@/features/pages/hooks/useContentBlockManager';
import { ContentBlockType } from '@/features/pages/types/ContentBlockType';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/joy/Button';

interface DeleteSectionInterface {
    contentBlock: ContentBlockType;
    onEdit: () => void;
    isEditing: boolean;
}

const ActionsSection = (props: DeleteSectionInterface) => {
    const contentBlockManager = useContentBlockManager();

    return (
        <div className={styles.Footer}>
            <div className={styles.separator}></div>
            <div className={styles.actionButtons}>
                {props.contentBlock.type === ContentBlock.TEXT_BLOCK && (
                    <Button
                        startDecorator={props.isEditing ? <SaveIcon /> : <EditIcon />}
                        color={props.isEditing ? 'neutral' : 'primary'}
                        onClick={props.onEdit}
                    >
                        {props.isEditing ? 'Gem' : 'Rediger'}
                    </Button>
                )}
                <Button
                    startDecorator={<Delete />}
                    color={'danger'}
                    onClick={() => contentBlockManager.removeContentBlock(props.contentBlock.id)}
                >
                    Slet
                </Button>
            </div>
        </div>
    );
};

export default ActionsSection;
