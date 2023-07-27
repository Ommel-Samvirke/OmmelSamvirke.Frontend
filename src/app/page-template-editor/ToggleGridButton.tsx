import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';

interface ToggleGridButtonProps {
    onClick: () => void;
    isGridVisible: boolean;
}

const ToggleGridButton = (props: ToggleGridButtonProps) => {
    return (
        <>
            <Tooltip title={props.isGridVisible ? 'Skjul gitter' : 'Vis gitter'}>
                <IconButton onClick={props.onClick} color={props.isGridVisible ? 'primary' : 'danger'}>
                    <Grid4x4Icon/>
                </IconButton>
            </Tooltip>
        </>
    );
};

export default ToggleGridButton;
