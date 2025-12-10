import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import clsx from "clsx";

function Navbar({userType, onLinkClick, isMobile = false}) {
  const location = useLocation();
  const defaultMenu = [
    { title: "Trang chủ", path: "/" },
    { title: "Gia sư", path: "/Tutor" },
    { title: "E-Books", path: "/EBooks" },
    { title: "Liên hệ", path: "/Contact" },
  ];

  const learnerMenu = [
    { title: "Trang chủ", path: "/" },
    { title: "Gia sư", path: "/Tutor" },
    { title: "Lịch học", path: "/schedule" },
    { title: "E-Books", path: "/EBooks" },
    { title: "Liên hệ", path: "/Contact" },
  ];

  const adminMenu = [
    { title: "Dashboard", path: "/admin/dashboard" },
    { title: "Người học", path: "/admin/learner-management" },
    { title: "Gia sư", path: "/admin/tutor-management" },
    { title: "E-Books", path: "/admin/e-books" },
  ];
  let menu = defaultMenu;
  if (userType === "learner") {
    menu = learnerMenu;
  } else if (userType === "admin") {
    menu = adminMenu;
  }

  return (
    <nav className={clsx(styles.navbar, { [styles.mobile]: isMobile })}>
      <ul className={styles.navMenu}>
        {menu.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <Link
              to={item.path}
              className={clsx(styles.navLink, {
                [styles.active]: location.pathname === item.path,
              })}
              onClick={onLinkClick}
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
