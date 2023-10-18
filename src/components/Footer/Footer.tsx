import styles from "./Footer.module.scss"
const Footer = () => {
    return (
        <>
            <p className={`text-center ${styles.footerText}`}>Created by the brilliant minds behind SpaceX</p>
        </>
    );
};

export default Footer;