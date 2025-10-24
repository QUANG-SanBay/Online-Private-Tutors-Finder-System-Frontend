import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import styles from './Notification.module.scss'

function Notification(){
    return(
        <div className={styles.notification}>
            <div className={styles.notificationIcon}>
                <span className={styles.notificationIconItem}>
                    <FontAwesomeIcon icon={faBell}/>
                </span>
                <span className={styles.notificationNumber}>1</span>
            </div>
        </div>
    )
}
export default Notification;