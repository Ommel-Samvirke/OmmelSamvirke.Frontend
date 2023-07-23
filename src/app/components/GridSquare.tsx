import styles from "./GridSquare.module.scss";

export interface GridSquareProps {
    x: number,
    y: number
}

const GridSquare = (props: GridSquareProps) => {
    
    return (
        <div className={styles.gridSquare}>
            {props.x}-{props.y}
        </div>
    )
}

export default GridSquare;