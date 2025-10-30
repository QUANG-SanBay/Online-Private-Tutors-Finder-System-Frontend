import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './RegisterLearner.module.scss';
import HeaderForm from '../headerform/HeaderForm';
import ReisterFormLearner from './resgisterLearnerForm/ResgisterLearnerForm';
function RegisterLearner() {
    return ( 
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.formContainer)}>
                <HeaderForm/>
                <ReisterFormLearner/>
            <div className={styles.redirect}>
                <p className={styles.text}>Bạn đã có tài khoản? <Link to="/Login" className={styles.link}>Đăng nhập</Link></p>
                <p className={styles.text}>Bạn Muốn đăng ký với tư cách người dạy? <Link to="/RegisterTutor" className={styles.link}>Đăng ký(Người dạy)</Link></p>
            </div>
            </div>
        </div>
     );
}

export default RegisterLearner;