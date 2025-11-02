import clsx from "clsx";
import HeaderMiniProfile from "./headerMiniProfile/HeaderMiniProfile";
import BodyMiniProfile from "./bodyMiniProfile/BodyMiniProfile";
import styles from "./MiniProfile.module.scss";
function MiniProfile({ className }) {
    return (
        <div className={clsx(styles.miniProfile, className)}>
            <div className={styles.miniProfileCtn}>
                <HeaderMiniProfile></HeaderMiniProfile>
                <BodyMiniProfile></BodyMiniProfile>
            </div>
        </div>
    );
}

export default MiniProfile;