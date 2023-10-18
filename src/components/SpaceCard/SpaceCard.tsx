import styles from "./SpaceCard.module.scss"
import SpaceImage from "../../assets/spacexImage.png"
const SpaceCard = () => {
    return (
        <div className={styles.card}>
            <img src={SpaceImage} alt="SpaceImage" className="img-fluid"/>
            <div className={styles.cardDetails}>
                <div className={styles.lunch}>
                    <span>Launch Date:</span>
                    <span>25 Feb, 2006</span>
                </div>
                <h4 className={styles.missionName}>FalconSat</h4>
                <p className={styles.rocketName}>Falcon 1</p>

                <div className={styles.lunchStatus}>
                    <h6>Launch Status:</h6>
                    <button className={styles.button_danger}>Failed</button>
                </div>
            </div>
        </div>
    );
};

export default SpaceCard;