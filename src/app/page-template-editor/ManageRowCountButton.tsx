import { LayoutContext } from '@/app/page-template-editor/context/LayoutContext';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import { useContext } from 'react';

interface ManageRowCountButtonProps {
    type: 'add-row' | 'remove-row';
    tooltip: string;
    onClick: () => void;
    rowCount: number;
}

const ManageRowCountButton = (props: ManageRowCountButtonProps) => {
    const layoutContext = useContext(LayoutContext);
    
    return (
        <>
            {
                props.type === 'add-row' &&
                <Tooltip title={props.tooltip}>
                    <IconButton onClick={props.onClick}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            }
            {
                props.type === 'remove-row' && props.rowCount > layoutContext.currentMinRows &&
                <Tooltip title={props.tooltip}>
                    <IconButton onClick={props.onClick}>
                        <RemoveIcon/>
                    </IconButton>
                </Tooltip>
            }
            {
                props.type === 'remove-row' && props.rowCount <= layoutContext.currentMinRows &&
                <Tooltip title={'Kan ikke fjerne flere rækker'}>
                    <span style={{ cursor: 'not-allowed' }}>
                        <IconButton disabled={true}>
                            <RemoveIcon/>
                        </IconButton>
                    </span>
                </Tooltip>
            }
        </>
    );
};

export default ManageRowCountButton;
