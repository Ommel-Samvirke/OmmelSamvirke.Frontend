import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';

interface ToolMenuIconProps {
    type: 'add-row' | 'remove-row' | 'toggle-grid';
    tooltip: string;
    onClick: () => void;
    rowCount: number;
}

const ToolMenuButton = (props: ToolMenuIconProps) => {
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
                props.type === 'remove-row' && props.rowCount > GridConstants.COLUMNS &&
                <Tooltip title={props.tooltip}>
                    <IconButton onClick={props.onClick}>
                        <RemoveIcon/>
                    </IconButton>
                </Tooltip>
            }
            {
                props.type === 'remove-row' && props.rowCount <= GridConstants.COLUMNS &&
                <Tooltip title={'Kan ikke fjerne flere rækker'}>
                    <span style={{ cursor: 'not-allowed' }}>
                        <IconButton disabled={true}>
                            <RemoveIcon/>
                        </IconButton>
                    </span>
                </Tooltip>
            }
            {
                props.type === 'toggle-grid' &&
                <Tooltip title={props.tooltip}>
                    <IconButton onClick={props.onClick}>
                        <Grid4x4Icon/>
                    </IconButton>
                </Tooltip>
            }
        </>
    );
};

export default ToolMenuButton;
