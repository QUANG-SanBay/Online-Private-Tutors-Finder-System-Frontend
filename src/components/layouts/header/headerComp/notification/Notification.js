import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import styles from './Notification.module.scss'
import NotifiDropdown from "~/components/dropdown/notifiDropdown/NotifiDropdown";

function Notification(){
    const [isOpenNotifi, setIsOpenNotifi] = useState(false);
    const listNotifi = [
        { title: 'Thông báo 1', content: 'Nội dung thông báo 1', isRead: false },
        { title: 'Thông báo 2', content: 'Nội dung thông báo 2', isRead: true },
    ];
    const handleClick = () => {
        setIsOpenNotifi(!isOpenNotifi);
    }
    return(
        <div className={styles.notification} onClick={handleClick}>
            <div className={styles.notificationIcon}>
                <span className={styles.notificationIconItem}>
                    <FontAwesomeIcon icon={faBell}/>
                </span>
                <span className={styles.notificationNumber}>{listNotifi.length}</span>
            </div>
            {isOpenNotifi && <NotifiDropdown listNotifi={listNotifi} className={styles.notificationDropdown} />}
        </div>
    )
}
export default Notification;