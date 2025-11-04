import React from "react";
import styles from "~/components/Learner/profile/Profile.module.scss";


function ClassesTab({ classes, onWriteReview }) {
  return (
    <div className={styles['ld-card']}>
      <h3>Lớp đã học</h3>
      {classes.length === 0 ? (
        <p className={styles['muted']}>Bạn chưa hoàn thành lớp học nào.</p>
      ) : (
        <div className={styles['ld-list']}>
          {classes.map((c) => (
            <div className={styles['ld-item']} key={c.id}>
              <div className={styles['ld-item-left']}>
                <img src={c.tutorImage} alt={c.tutor} />
              </div>
              <div className={styles['ld-item-body']}>
                <div className={styles['ld-item-title']}>{c.subject}</div>
                <div className={`${styles['muted']} ${styles['small']}`}>Gia sư: {c.tutor} • {c.period}</div>
              </div>
              <div className={styles['ld-item-actions']}>
                <button className={`${styles['btn']} ${styles['btn-outline']}`} onClick={() => onWriteReview(c)}>Viết đánh giá</button>
                <a className={styles['link']} href={`/Tutor/${c.id}`}>Xem chi tiết</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassesTab;