import styles from './Footer.module.scss'
function Footer(){
    return(
        <div className={styles.footer}>
            <div className={styles.footerCtn}>
                <psan className={styles.text}>&copy;2025 TutorFinder | Được thiết kế dành cho phụ huynh/học sinh và gia sư</psan>
            </div>
        </div>
    )
}
export default Footer;