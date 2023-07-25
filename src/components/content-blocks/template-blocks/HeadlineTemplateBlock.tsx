import styles from './styles/HeadlineTemplateBlock.module.scss';

import { forwardRef, ForwardedRef } from 'react';

const HeadlineTemplateBlock = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <h1 ref={ref} className={styles.headline}>Eksempel: Overskrift</h1>
    );
});

export default HeadlineTemplateBlock;
