import clsx from "clsx";
import HeaderForm from "./headerform/HeaderForm";
import RegisterForm from "./registerForm/RegisterForm";
import styles from "./Register.module.scss";
function Register(){
    return(
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.background)}></div>
            <div className={clsx(styles.formContainer)}>
                <HeaderForm />
                <RegisterForm />
            </div>
        </div>  
    )
}
export default Register;