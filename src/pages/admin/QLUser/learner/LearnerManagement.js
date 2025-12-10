import ListLearner from './listLearner/ListLearner';
import styles from './LearnerManagement.module.scss';

function LearnerManagement() {
    return (
        <div className={styles.learnerManagement}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Quản lý Người học</h1>
                </div>

                <div className={styles.content}>
                    <ListLearner />
                </div>
            </div>
        </div>
    );
}

export default LearnerManagement;
