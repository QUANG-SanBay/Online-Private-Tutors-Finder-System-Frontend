import styles from './ProfileTabs.module.scss';

function ProfileTabs({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'info', label: 'Thông tin cá nhân' },
        { id: 'education', label: 'Học vấn & Giới thiệu' },
        { id: 'subjects', label: 'Môn học & Lịch dạy' }
    ];

    return (
        <div className={styles.tabs}>
            {tabs.map(tab => (
                <button 
                    key={tab.id}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export default ProfileTabs;
