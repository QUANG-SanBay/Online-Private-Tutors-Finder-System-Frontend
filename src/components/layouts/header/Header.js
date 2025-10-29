import {Logo, Notification, Avata, Navbar} from './headerComp'
import styles from './Header.module.scss'
function Header(){

    return(
        <header className={styles.header}>
            <div className={styles.headerCtn}>
                <div className={styles.headerTop}>
                    <Logo></Logo>
                    {/* <Search></Search> */}
                    <Navbar></Navbar>
                    <div className={styles.action}>
                        <Notification></Notification>
                        <Avata></Avata>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;