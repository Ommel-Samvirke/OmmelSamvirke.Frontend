import React, { useContext } from 'react';

import ConfirmModal from '@/common/components/ConfirmModal';
import { LayoutContext } from '@/features/pages/context/LayoutContext';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';

const DeleteChanges = () => {
    const layoutContext = useContext(LayoutContext);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState<boolean>(false);

    return (
        <>
            <Tooltip title={'Slet ændringer'}>
                <IconButton variant="soft" onClick={() => setIsConfirmModalOpen(true)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <ConfirmModal
                onConfirm={() => layoutContext.updateCurrentLayoutContent((_) => [])}
                title={'Slet ændringer?'}
                description={
                    'Vil du slette de ændringer, du har lavet til dette layout? Ændringer på andre layouts, slettes ikke.'
                }
                isOpen={isConfirmModalOpen}
                cancelLabel={'Annuller'}
                confirmLabel={'Slet'}
                close={() => setIsConfirmModalOpen(false)}
                cancelColor={'neutral'}
                confirmColor={'danger'}
            ></ConfirmModal>
        </>
    );
};

export default DeleteChanges;
