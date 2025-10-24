import { Link } from "react-router-dom";
import styles from './Navbar.module.scss'
import clsx from "clsx";
import { useState } from "react";

function Navbar(){
    const [active, setActive] = useState(0)//chưa xử lý active
    let menu = [];
    const  learnerMenu = [
        {
            title: 'Trang chủ',
            path: '/'
        },
        {
            title: 'Gia sư',
            path: '/search'
        },
        {
            title: 'Lớp học của tôi',
            path: '/myClass'
        },
        {
            title: 'lịch học',
            path: '/schedule'
        },
        {
            title: 'E-Books',
            path: '/EBooks'
        },
    ]
    if(true){
        menu = [...learnerMenu]
    }
    return(
        <nav className={styles.navbar}>
            <ul className={styles.navMenu}>
                {menu.map((item, index)=>(
                    <li key={index} className={styles.navItem}>
                        <Link to={item.path} className={clsx(styles.navLink, {
                            [styles.active]: active===index
                        })}>
                            {
                                item.title
                            }
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Navbar;