import { useContext } from 'react';

import { LayoutContext } from '@/features/pages/context/LayoutContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';

interface ManageRowCountButtonProps {
    type: 'add-row' | 'remove-row';
    tooltip: string;
    onClick: () => void;
    rowCount: number;
    minRows: number;
}

const ManageRowCountButton = (props: ManageRowCountButtonProps) => {
    const layoutContext = useContext(LayoutContext);

    return (
        <>
            {props.type === 'add-row' && (
                <Tooltip title={props.tooltip}>
                    <IconButton onClick={props.onClick}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
            {props.type === 'remove-row' && props.rowCount > props.minRows && (
                <Tooltip title={props.tooltip}>
                    <IconButton onClick={props.onClick}>
                        <RemoveIcon />
                    </IconButton>
                </Tooltip>
            )}
            {props.type === 'remove-row' && props.rowCount <= props.minRows && (
                <Tooltip title={'Kan ikke fjerne flere rækker'}>
                    <span style={{ cursor: 'not-allowed' }}>
                        <IconButton disabled={true}>
                            <RemoveIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            )}
        </>
    );
};

export default ManageRowCountButton;
