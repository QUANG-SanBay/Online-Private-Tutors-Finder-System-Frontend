import { useState } from 'react';
import { faAngleDown, faBook, faCheck, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Dropdown from '../dropdown/Dropdown';
import avt from '~/assets/imgs/img.jpg'
import styles from './Avata.module.scss'
import Modal from '~/components/modal/Modal';

function Avata({ className, userType = 'learner' }) {
    const [open, setOpen] = useState(false);
    const menuArr = [
        { label: 'Hồ sơ của bạn', path: '/Profile', icon: faUser },
        { label: 'Lớp đã học', path: '/Classed', icon: faBook},
        { label: 'Yêu cầu đã gửi', path: '/Request', icon: faCheck},
        { label: 'Đăng xuất', path: '/logout', icon: faRightFromBracket },
    ];
    const menuArrTutor = [
        { label: 'Hồ sơ của bạn', path: '/tutor/Profile', icon: faUser },
        { label: 'Đăng xuất', path: '/tutor/logout', icon: faRightFromBracket },
    ];
    return (
        <div className={clsx(styles.account, className)} onClick={() => setOpen(!open)}>
            <div className={styles.accountCtn}>
                <div className={styles.accountAvt}>
                    <div className={styles.accountImg}>
                        <img src={avt} className={styles.accountImgItem}></img>
                    </div>
                    <div className={styles.accountIcon}>
                        <span className={clsx(styles.accountIconItem, open ? styles.rotate : '')}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </div>
                </div>
                {userType === 'learner' ? 
                <Dropdown arr={menuArr} className={clsx(styles.accountDropdown, open ? styles.show : '')} /> 
                : <Dropdown arr={menuArrTutor} className={clsx(styles.accountDropdown, open ? styles.show : '')} />}
                {open && <Modal type='default'></Modal>}
            </div>
        </div>
    )
}
export default Avata;