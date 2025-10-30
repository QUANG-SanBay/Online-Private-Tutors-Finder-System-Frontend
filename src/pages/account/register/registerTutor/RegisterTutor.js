import clsx from "clsx";
import HeaderForm from "../headerform/HeaderForm";
import RegisterForm from "./registerForm/RegisterForm";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
function Register(){
    return(
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.formContainer)}>
                <HeaderForm />
                <RegisterForm />
            <div className={styles.redirect}>
                <p className={styles.text}>Bạn đã có tài khoản? <Link to="/Login" className={styles.link}>Đăng nhập</Link></p>
                <p className={styles.text}>Bạn Muốn đăng ký với tư cách người học? <Link to="/RegisterLearner" className={styles.link}>Đăng ký(Người học)</Link></p>
            </div>
            </div>
        </div>  
    )
} 
export default Register;