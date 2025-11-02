import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import clsx from "clsx";

function Navbar() {
  const location = useLocation();
  const learnerMenu = [
    { title: "Trang chủ", path: "/" },
    { title: "Gia sư", path: "/Tutor" },
    { title: "Lịch học", path: "/schedule" },
    { title: "E-Books", path: "/EBooks" },
    { title: "Liên hệ", path: "/Contact" },
  ];

  const menu = [...learnerMenu];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navMenu}>
        {menu.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <Link
              to={item.path}
              className={clsx(styles.navLink, {
                [styles.active]: location.pathname === item.path,
              })}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
