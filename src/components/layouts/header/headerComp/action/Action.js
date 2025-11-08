import { Link } from "react-router-dom";
import Button from "~/components/button/Button";
import styles from "./Action.module.scss";
function Action() {
    return (
        <div className={styles.action}>
            <Link to="/login">
                <Button variant="text">Đăng nhập</Button>
            </Link>
            <Link to="/register/learner">
                <Button variant="primary">Đăng ký</Button>
            </Link>
        </div>
    );
}

export default Action;