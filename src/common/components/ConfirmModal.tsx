import { ButtonPropsColorOverrides, ColorPaletteProp, ModalDialog, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { OverridableStringUnion } from '@mui/types';

interface ConfirmModalProps {
    isOpen: boolean;
    close: () => void;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: OverridableStringUnion<ColorPaletteProp, ButtonPropsColorOverrides>;
    cancelColor?: OverridableStringUnion<ColorPaletteProp, ButtonPropsColorOverrides>;
}

const ConfirmModal = (props: ConfirmModalProps) => {
    return (
        <Modal open={props.isOpen} onClose={props.close}>
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ maxWidth: 500 }}
            >
                <Typography id="basic-modal-dialog-title" component="h2">
                    {props.title}
                </Typography>
                <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
                    {props.description}
                </Typography>

                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Button
                        onClick={() => {
                            props.onConfirm();
                            props.close();
                        }}
                        style={{ marginRight: '0.5rem' }}
                        color={props.confirmColor || 'primary'}
                    >
                        {props.confirmLabel || 'Bekræft'}
                    </Button>
                    <Button onClick={props.close} color={props.cancelColor || 'danger'}>
                        {props.cancelLabel || 'Annuller'}
                    </Button>
                </div>
            </ModalDialog>
        </Modal>
    );
};

export default ConfirmModal;
