import { Logo } from "~/components/layouts/header/headerComp";
import styles from './HeaderForm.module.scss';
function HeaderForm() {
    return ( 
        <div className={styles.headerForm}>
            <span className={styles.logo}> <Logo /> </span>
            <h2 className={styles.title}>Đăng ký làm gia sư</h2>
            <p className={styles.description}>Hãy điền thông tin bên dưới để đăng ký làm gia sư</p>
        </div>
     );
}

export default HeaderForm;