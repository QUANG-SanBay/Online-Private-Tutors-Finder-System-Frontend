import TopTutorHead from './topTutorHead/TopTutorHead';
import TopTutorBody from './topTutorBody/TopTutorBody';
import styles from './TopTutor.module.scss';

function TopTutor() {
    return (
        <section className={styles.topTutor}>
            <div className={styles.topTutorContainer}>
                <TopTutorHead />
                <TopTutorBody />
            </div>
        </section>
    );
}

export default TopTutor;
