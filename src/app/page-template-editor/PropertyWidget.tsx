import styles from './styles/PropertyWidget.module.scss';
import Button from '@mui/joy/Button';
import { Delete } from '@mui/icons-material';
import { FormControl, FormLabel, Input } from '@mui/joy';
import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import { GridConstants } from '@/app/page-template-editor/constants/GridConstants';

interface PropertyWidgetProps {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    moveContentBlock: (id: string, x: number, y: number) => void,
    resizeContentBlock: (id: string, width: number, height: number) => void,
    deleteContentBlock: (id: string) => void,
}

const PropertyWidget = forwardRef((props: PropertyWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.PropertyWidget + ' content-block-controls'}>
            <div className={styles.Header}>
                Egenskaber
                <div className={styles.separator}></div>
            </div>
            <div className={styles.Body}>
                <div className={styles.propertyInputRow}>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>X-Position</FormLabel>
                        <Input
                            placeholder="X"
                            value={props.x}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 0,
                                    max: GridConstants.COLUMNS - 1,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => props.moveContentBlock(
                                props.id,
                                +event.target.value,
                                props.y
                            )}
                        />
                    </FormControl>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>Y-Position</FormLabel>
                        <Input
                            placeholder="Y"
                            value={props.y}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 0,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => props.moveContentBlock(
                                props.id,
                                props.x,
                                +event.target.value
                            )}
                        />
                    </FormControl>
                </div>
                <div className={styles.propertyInputRow}>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>Bredde</FormLabel>
                        <Input
                            placeholder="Bredde"
                            value={props.width}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 1,
                                    max: GridConstants.COLUMNS,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => props.resizeContentBlock(
                                props.id,
                                +event.target.value,
                                props.height
                            )}
                        />
                    </FormControl>
                    <FormControl className={styles.propertyInput}>
                        <FormLabel>Højde</FormLabel>
                        <Input
                            placeholder="Højde"
                            value={props.height}
                            type={'number'}
                            slotProps={{
                                input: {
                                    min: 1,
                                    max: 100,
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => props.resizeContentBlock(
                                props.id,
                                props.width,
                                +event.target.value
                            )}
                        />
                    </FormControl>
                </div>
            </div>
            <div className={styles.Footer}>
                <div className={styles.separator}></div>
                <Button startDecorator={<Delete/>} color={'danger'} onClick={() => props.deleteContentBlock(props.id)}>
                    Slet
                </Button>
            </div>
        </div>
    );
});

export default PropertyWidget;
