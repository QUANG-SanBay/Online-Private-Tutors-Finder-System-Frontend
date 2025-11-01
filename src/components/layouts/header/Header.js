import { Link } from 'react-router-dom';
import { Logo, Notification, Avata, Navbar } from './headerComp'
import styles from './Header.module.scss'
function Header({ showNavbar = true, showNotification = true, userType = 'learner' }) {

    return (
        <header className={styles.header}>
            <div className={styles.headerCtn}>
                <div className={styles.headerTop}>
                    {userType === 'learner' ?
                        <Link to={'/'}><Logo></Logo></Link>
                        : <Link to={'/tutor/home'}><Logo></Logo></Link>}
                    {/* <Search></Search> */}
                    {showNavbar && <Navbar userType={userType}></Navbar>}
                    <div className={styles.action}>
                        {showNotification &&
                            <Notification></Notification>
                        }
                        <Avata userType={userType}></Avata>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;