import styles from './styles/CoordinateWidget.module.scss';

import { roboto } from '@/app/fonts';

interface CoordinateWidgetProps {
    x: number;
    y: number;
    hide: boolean;
}

const CoordinateWidget = (props: CoordinateWidgetProps) => {
    return (
        <div className={styles.CoordinateWidget + ' ' + roboto.className + ' ' + (props.hide ? styles.hidden : '')}>
            {props.x}, {props.y}
        </div>
    );
};

export default CoordinateWidget;
