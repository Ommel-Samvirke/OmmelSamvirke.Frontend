import styles from "./styles/CoordinateWidget.module.scss";
import {roboto} from '@/app/fonts';

interface CoordinateWidgetProps {
    x: number,
    y: number
}

const CoordinateWidget = (props: CoordinateWidgetProps) => {
    return (
        <div className={styles.CoordinateWidget + " " + roboto.className}>
            {props.x}, {props.y}
        </div>
    )
};

export default CoordinateWidget;