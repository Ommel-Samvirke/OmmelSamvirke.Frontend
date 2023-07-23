import styles from "./GridCell.module.scss";

export interface GridCellProps {
    x: number,
    y: number
}

const GridCell = (props: GridCellProps) => {
    
    return (
        <div className={styles.gridCell}>
            
        </div>
    )
}

export default GridCell;