import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Logo, Notification, Avata, Navbar, Action } from './headerComp'
import styles from './Header.module.scss'

function Header({ showNavbar = true, showHeaderUser = true, userType = false }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Mock user data - replace with actual data from context/Redux
    const userData = {
        fullName: 'Nguyễn Văn An',
        avatarUrl: '' // Empty for default icon
    };

    const headerLinks = [
        { path: '/', element: <Logo />, userType: false },
        { path: '/', element: <Logo />, userType: 'learner' },
        { path: '/tutor/home', element: <Logo />, userType: 'tutor' },
        { path: '/admin/dashboard', element: <Logo />, userType: 'admin' }
    ];

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        // TODO: Call logout API and clear auth state
        closeMobileMenu();
        navigate('/login');
    };

    const getProfilePath = () => {
        if (userType === 'tutor') return '/tutor/profile';
        if (userType === 'learner') return '/profile';
        return '/';
    };

    return (
        <header className={`${styles.header} ${userType === 'tutor' ? styles.tutorHeader : ''}`}>
            <div className={styles.headerCtn}>
                <div className={styles.headerTop}>
                    {/* Logo */}
                    {headerLinks.map((link, index) => (
                        link.userType === userType && (
                            <Link key={index} to={link.path} className={styles.logoLink}>
                                {link.element}
                            </Link>
                        )
                    ))}

                    {/* Desktop Navigation - Hidden for tutor */}
                    {userType !== 'tutor' && (
                        <div className={styles.desktopNav}>
                            {showNavbar && <Navbar userType={userType} />}
                        </div>
                    )}

                    {/* Desktop User Section / Actions */}
                    <div className={styles.desktopActions}>
                        {userType === false ? (
                            <Action />
                        ) : (
                            showHeaderUser && (
                                <div className={styles.headerUser}>
                                    <Notification />
                                    <Avata userType={userType} />
                                </div>
                            )
                        )}
                    </div>

                    {/* Mobile Right Section - Hidden for tutor */}
                    {userType !== 'tutor' && (
                        <div className={styles.mobileRight}>
                            {/* Notification - visible on mobile for logged-in users */}
                            {userType !== false && showHeaderUser && (
                                <div className={styles.mobileNotification}>
                                    <Notification />
                                </div>
                            )}

                            {/* Hamburger Menu Toggle */}
                            <button
                                className={styles.hamburger}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Slide-in Menu - Hidden for tutor */}
            {userType !== 'tutor' && (
                <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                    <div className={styles.mobileMenuContent}>
                        {/* Navigation Items */}
                        {showNavbar && (
                            <div className={styles.mobileNavSection}>
                                <Navbar userType={userType} onLinkClick={closeMobileMenu} isMobile={true} />
                            </div>
                        )}

                        {/* User Section or Action Buttons */}
                        {userType === false ? (
                            <div className={styles.mobileActionSection}>
                                <Action onLinkClick={closeMobileMenu} isMobile={true} />
                            </div>
                        ) : (
                            showHeaderUser && (
                                <div className={styles.mobileUserSection}>
                                    <Link
                                        to={getProfilePath()}
                                        className={styles.userProfile}
                                        onClick={closeMobileMenu}
                                    >
                                        <div className={styles.userAvatar}>
                                            {userData.avatarUrl ? (
                                                <img src={userData.avatarUrl} alt={userData.fullName} />
                                            ) : (
                                                <FontAwesomeIcon icon={faUser} />
                                            )}
                                        </div>
                                        <span className={styles.userName}>{userData.fullName}</span>
                                    </Link>
                                    <button
                                        className={styles.logoutBtn}
                                        onClick={handleLogout}
                                        aria-label="Đăng xuất"
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Overlay - Hidden for tutor */}
            {userType !== 'tutor' && isMobileMenuOpen && (
                <div
                    className={styles.overlay}
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}
        </header>
    )
}
export default Header;