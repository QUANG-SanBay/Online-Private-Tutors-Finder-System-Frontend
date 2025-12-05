import { useState } from 'react';
import ListTutor from './listTutor/ListTutor';
import PendingApprovals from './pendingApprovals/PendingApprovals';
import styles from './TutorManagement.module.scss';

function TutorManagement() {
    const [activeTab, setActiveTab] = useState('list'); // 'list' or 'pending'

    return (
        <div className={styles.tutorManagement}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Quản lý Gia sư</h1>
                    <div className={styles.tabNav}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'list' ? styles.active : ''}`}
                            onClick={() => setActiveTab('list')}
                        >
                            Danh sách Gia sư
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'pending' ? styles.active : ''}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            Phê duyệt Hồ sơ
                        </button>
                    </div>
                </div>

                <div className={styles.content}>
                    {activeTab === 'list' ? <ListTutor /> : <PendingApprovals />}
                </div>
            </div>
        </div>
    );
}

export default TutorManagement;
