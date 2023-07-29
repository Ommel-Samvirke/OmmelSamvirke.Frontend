import styles from '@/features/pages/components/property-widget/styles/PropertyWidget.module.scss';

import { ChangeEvent } from 'react';

import { ContentBlockType } from '@/features/pages/types/ContentBlockType';
import { FormControl, FormLabel, Input } from '@mui/joy';

interface PropertyInputInterface {
    widthPercentage: number;
    contentBlock: ContentBlockType;
    value: string | number | readonly string[] | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    minvalue?: number;
    maxvalue?: number;
    placeholder: string;
    label: string;
}

const PropertyInput = (props: PropertyInputInterface) => {
    return (
        <FormControl className={styles.propertyInput} style={{ width: `calc(${props.widthPercentage}% - 1rem)` }}>
            <FormLabel>{props.label}</FormLabel>
            <Input
                placeholder={props.placeholder}
                value={props.value}
                type={'number'}
                slotProps={{
                    input: {
                        min: props.minvalue,
                        max: props.maxvalue,
                    },
                }}
                onChange={props.onChange}
            />
        </FormControl>
    );
};

export default PropertyInput;
