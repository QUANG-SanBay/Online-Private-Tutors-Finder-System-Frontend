import { useState } from 'react';
import { faAngleDown, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Dropdown from '../dropdown/Dropdown';
import avt from '~/assets/imgs/img.jpg'
import styles from './Avata.module.scss'
import { icon } from '@fortawesome/fontawesome-svg-core';

function Avata({className}){
    const [open, setOpen] = useState(false);
    const menuArr = [
        { label: 'Hồ sơ của bạn', path: '/Profile' , icon: faUser},
        { label: 'Đăng xuất', path: '/logout' , icon: faRightFromBracket},
    ];
    return(
        <div className={clsx(styles.account, className)} onClick={() => setOpen(!open)}>
            <div className={styles.accountAvt}>
                <div className={styles.accountImg}>
                    <img src={avt} className={styles.accountImgItem}></img>
                </div>
                <div className={styles.accountIcon}>
                    <span className={clsx(styles.accountIconItem, open ? styles.rotate : '')}>
                        <FontAwesomeIcon icon={faAngleDown}/>
                    </span>
                </div>
            </div>
            <Dropdown arr={menuArr} className={clsx(styles.accountDropdown, open ? styles.show : '')} />
        </div>
    )    
}
export default Avata;