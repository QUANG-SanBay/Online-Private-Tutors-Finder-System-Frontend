import clsx from "clsx";
import styles from "./Dropdown.module.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Dropdown({ arr, className }) {
    return (
        <div className={clsx(styles.Dropdown, className)}>
            <ul className={clsx(styles.List)}>
                {arr.map((item, index) => (
                    <li className={clsx(styles.ListItem)}>
                        <Link to={item.path} className={clsx(styles.ListItemLink)} key={index}>
                            <FontAwesomeIcon icon={item.icon} className={clsx(styles.ListItemIcon)} />
                            <div>{item.label}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;