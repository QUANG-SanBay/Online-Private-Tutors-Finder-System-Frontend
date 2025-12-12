import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { faAngleDown, faBook, faCheck, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Dropdown from '../dropdown/Dropdown';
import avt from '~/assets/imgs/img.jpg'
import styles from './Avata.module.scss'
import Modal from '~/components/modal/Modal';
import { logout } from '~/api/services/logoutAPI';

function Avata({ className, userType = 'learner' }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    let menuArr = [];
    const menuLearnerArr = [
        { label: 'Hồ sơ của bạn', action: 'Profile', icon: faUser },
        { label: 'Lớp đã học', action: 'Classed', icon: faBook},
        { label: 'Yêu cầu đã gửi', action: 'Request', icon: faCheck},
        { label: 'Đăng xuất', action: 'logout', icon: faRightFromBracket },
    ];
    const menuArrTutor = [
        { label: 'Hồ sơ của bạn', action: 'tutor/Profile', icon: faUser },
        { label: 'Đăng xuất', action: 'logout', icon: faRightFromBracket },
    ];
    
    const menuArrAdmin = [
        { label: 'Hồ sơ của bạn', action: 'admin/Profile', icon: faUser },
        { label: 'Đăng xuất', action: 'logout', icon: faRightFromBracket },
    ];
    if (userType === 'learner') {
        menuArr = menuLearnerArr;
    } else if (userType === 'tutor') {
        menuArr = menuArrTutor;
    } else if (userType === 'admin') {
        menuArr = menuArrAdmin;
    }

    const handleLogout = async () => {
        try {
            await logout(); // gọi API

            // Xóa token FE
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Logout error:", err);
            navigate("/login", { replace: true });
        }
    };

    return (
        <div className={clsx(styles.account, className)} onClick={() => setOpen(!open)}>
            <div className={styles.accountCtn}>
                <div className={styles.accountAvt}>
                    <div className={styles.accountImg}>
                        <img src={avt} className={styles.accountImgItem} alt='avata'></img>
                    </div>
                    <div className={styles.accountIcon}>
                        <span className={clsx(styles.accountIconItem, open ? styles.rotate : '')}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </div>
                </div>
            
                <Dropdown 
                    arr={menuArr} 
                    onLogout={handleLogout}
                    className={clsx(styles.accountDropdown, open ? styles.show : '')} /> 
                {open && <Modal type='default'></Modal>}
            </div>
        </div>
    )
}
export default Avata;