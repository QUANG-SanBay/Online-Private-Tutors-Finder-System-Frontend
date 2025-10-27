import styles from './Footer.module.scss'
function Footer(){
    return(
        <div className={styles.footer}>
            <div className={styles.footerCtn}>
                <span className={styles.text}>&copy;2025 TutorFinder | Được thiết kế dành cho phụ huynh/học sinh và gia sư</span>
            </div>
        </div>
    )
}
export default Footer;