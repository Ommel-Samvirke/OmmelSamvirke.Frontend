import {useDrag} from 'react-dnd';
import {IDraggableItem} from '@/app/page-template-editor/interfaces/IDraggableItem';
import {DragSource} from '@/app/page-template-editor/constants/DragSource';
import {DraggableTypes} from '@/app/page-template-editor/constants/DraggableTypes';
import IconButton from '@mui/joy/IconButton';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import Tooltip from '@mui/joy/Tooltip';

interface ToolMenuIconProps {
    type: string;
    tooltip: string
}

const DraggableToolMenuIcon = (props: ToolMenuIconProps) => {
    const [, drag] = useDrag<IDraggableItem>(() => ({
        type: props.type,
        item: { id: '', type: props.type, source: DragSource.TOOL_MENU},
    }));
    
    return (
        <>
            <Tooltip title={props.tooltip}>
                <IconButton ref={drag} >
                    { props.type === DraggableTypes.HEADLINE_BLOCK && <AbcOutlinedIcon /> }
                    { props.type === DraggableTypes.TEXT_BLOCK && <NotesOutlinedIcon /> }
                    { props.type === DraggableTypes.IMAGE_BLOCK && <ImageOutlinedIcon /> }
                    { props.type === DraggableTypes.PDF_BLOCK && <PictureAsPdfOutlinedIcon /> }
                    { props.type === DraggableTypes.VIDEO_BLOCK && <VideoCameraBackOutlinedIcon /> }
                    { props.type === DraggableTypes.SLIDESHOW_BLOCK && <CollectionsOutlinedIcon /> }
                </IconButton>
            </Tooltip>
        </>
    );
};

export default DraggableToolMenuIcon;
