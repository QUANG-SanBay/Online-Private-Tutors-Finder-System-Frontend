import { Link } from 'react-router-dom';
import { Logo, Notification, Avata, Navbar, Action } from './headerComp'
import styles from './Header.module.scss'
function Header({ showNavbar = true, showHeaderUser = true, userType = false }) {

    const headerLinks = [
        { path: '/', element: <Logo />, userType: false },
        { path: '/', element: <Logo />, userType: 'learner' },
        { path: '/tutor/home', element: <Logo />, userType: 'tutor' },
        { path: '/admin/dashboard', element: <Logo />, userType: 'admin' }
    ]
    return (
        <header className={styles.header}>
            <div className={styles.headerCtn}>
                <div className={styles.headerTop}>
                    {/* this is logo */}
                    {headerLinks.map((link, index) => (
                        link.userType === userType && (
                            <Link key={index} to={link.path}>
                                {link.element}
                            </Link>
                        )
                    ))}
                    {/* this is navbar */}
                    {showNavbar && <Navbar userType={userType}></Navbar>}
                    {/* this is action */}
                    {userType === false ?
                        <Action></Action>
                        :
                        (
                            showHeaderUser &&
                            <div className={styles.headerUser}>
                                {/* this is notification */}
                                <Notification></Notification>
                                {/* this is avatar */}
                                <Avata userType={userType}></Avata>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}
export default Header;