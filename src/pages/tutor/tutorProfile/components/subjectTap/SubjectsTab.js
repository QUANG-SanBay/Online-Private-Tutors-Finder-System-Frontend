import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import styles from './SubjectsTab.module.scss';

function SubjectsTab({ subjects, availability }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Môn học giảng dạy</h2>
            <div className={styles.subjectsList}>
                {subjects.map(subject => (
                    <div key={subject.id} className={styles.subjectCard}>
                        <FontAwesomeIcon icon={faBook} />
                        <div>
                            <h4>{subject.name}</h4>
                            <span>{subject.grade}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* <h2 className={styles.sectionTitle}>Lịch rảnh</h2>
            <div className={styles.availabilityList}>
                {availability.map((slot, index) => (
                    <div key={index} className={styles.availabilityCard}>
                        <strong>{slot.dayOfWeek}</strong>
                        <span>{slot.startTime} - {slot.endTime}</span>
                        <span className={styles.statusBadge}>{slot.status}</span>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default SubjectsTab;
