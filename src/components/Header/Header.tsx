import styles from "./Header.module.scss"
const Header = () => {
    return (
        <div className={`text-sm-start text-md-center ${styles.header_main}`}>
            <h1 className={`${styles.heading_text}`}>Spaceflight details</h1>
            <p className={`${styles.title_text}`}>Find out the elaborate features of all the past big spaceflights.</p>
        </div>
    );
};

export default Header;