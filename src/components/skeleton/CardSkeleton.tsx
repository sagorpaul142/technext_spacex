import styles from "./CardSkeleton.module.scss"
// import SpaceImage from "../../assets/spacexImage.png"
const CardSkeleton = () => {
    return (
        <div className={styles.card}>

            <div className={` ${styles.loading} ${styles.image}`}>
            </div>

            <div className={styles.cardDetails}>
                <div className={`${styles.lunch} ${styles.loading}`}></div>
                <h4 className={`${styles.missionName} ${styles.loading}`}></h4>
                <p className={`${styles.rocketName} ${styles.loading}`}></p>

                <div className={styles.lunchStatus}>
                    <h6 className={styles.loading}></h6>
                    <button className={`${styles.button_danger} ${styles.loading}`}></button>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;