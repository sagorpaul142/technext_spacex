import React from "react";
import styles from "./SpaceCard.module.scss"
import moment from "moment";
import {Space} from "../../Services/SpaceList.ts";

interface SpaceProps {
  space: Space;
}

const SpaceCard: React.FC<SpaceProps> = ({space}) => {
    return (
        <div className={styles.card}>
            <img loading="lazy" src={space?.links?.mission_patch} alt="SpaceImage" className="img-fluid"/>
            <div className={styles.cardDetails}>
                <div className={styles.lunch}>
                    <span>Launch Date:</span>
                    <span>{moment(space?.launch_date_utc).format('ll')}</span>
                </div>
                <h4 className={styles.missionName}>{space?.mission_name}</h4>
                <p className={styles.rocketName}>{space?.rocket?.rocket_name}</p>

                <div className={styles.lunchStatus}>
                    <h6>Launch Status:</h6>
                    <button className={space?.launch_success ? styles.button_success : styles.button_danger}>
                        {space?.launch_success ? 'Success' : 'Failed'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpaceCard;