import React, { useState } from "react";
import styles from "~/components/Learner/profile/Profile.module.scss";
import ClassesTab from "~/components/Learner/classed/class";
import { ReviewModal } from "~/components/Learner/request/reviewModal"; 

export default function LearnerDashboard() {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);


  const classes = [
    { id: 1, subject: 'Toán 10 - Đại số', tutor: 'Cô Lan', period: 'Tháng 9 2025', tutorImage: 'https://i.pravatar.cc/50' },
    { id: 2, subject: 'Luyện thi THPTQG - Hóa', tutor: 'Thầy Nam', period: 'Tháng 7 2025', tutorImage: 'https://i.pravatar.cc/50' }
  ];


  function handleWriteReview(c) {
    setSelectedClass(c);
    setReviewModalOpen(true);
  }

  function handleSubmitReview(payload) {
    console.log("Review submitted", payload);
    setReviewModalOpen(false);
    setSelectedClass(null);
  }


  return (
    <div className={styles["ld-root"]}>
      {/* Main content */}
      <main className={styles["ld-main"]}>
        <ClassesTab classes={classes} onWriteReview={handleWriteReview} />
      </main>

      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
        classItem={selectedClass}
      />

    </div>
  );
}
