import React, { useState } from "react";
import styles from "./Profile.module.scss";
import ProfileTab from "./info";
import ClassesTab from "./class";
import RequestsTab from "./request";
import { ReviewModal } from "./reviewModal"; 
import RequestDetailModal from "./requetsDetail";

export default function LearnerDashboard() {
  const [active, setActive] = useState("profile");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const user = { 
    name: "Nguyễn Văn A", 
    email: "a@email.com", 
    phone: "0909221177", 
    address: "Hanoi" 
  };

  const classes = [
    { id: 1, subject: 'Toán 10 - Đại số', tutor: 'Cô Lan', period: 'Tháng 9 2025', tutorImage: 'https://i.pravatar.cc/50' },
    { id: 2, subject: 'Luyện thi THPTQG - Hóa', tutor: 'Thầy Nam', period: 'Tháng 7 2025', tutorImage: 'https://i.pravatar.cc/50' }
  ];
  const requests = [
    { id: 11, subject: 'Toán 10 - Đại số', type: 'trial', tutor: 'Cô Lan', date: '2025-10-12', status: 'pending', statusLabel: 'Chờ' },
    { id: 12, subject: 'Luyện thi THPTQG - Hóa', type: 'official', tutor: 'Thầy Nam', date: '2025-09-03', status: 'confirmed', statusLabel: 'Đã xác nhận' }
  ];

    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    function handleViewRequest(r) {
    setSelectedRequest(r);
    setRequestModalOpen(true);
    }

  function handleWriteReview(c) {
    setSelectedClass(c);
    setReviewModalOpen(true);
  }

  function handleSubmitReview(payload) {
    console.log("Review submitted", payload);
    setReviewModalOpen(false);
    setSelectedClass(null);
  }

  function handleSaveProfile(data) {
    console.log("Save profile", data);
  }

  return (
    <div className={styles["ld-root"]}>
      {/* Sidebar */}
      <aside className={styles["ld-sidebar"]}>
        <div className={styles["ld-sidebar-top"]}>
          <div className={`${styles.avatar} ${styles.big}`}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h3>{user.name}</h3>
            <p className={styles.muted}>{user.email}</p>
          </div>
        </div>

        <nav className={styles["ld-nav"]}>
          <button
            className={`${styles["ld-nav-btn"]} ${active === "profile" ? styles.active : ""}`}
            onClick={() => setActive("profile")}
          >
            Thông tin
          </button>

          <button
            className={`${styles["ld-nav-btn"]} ${active === "classes" ? styles.active : ""}`}
            onClick={() => setActive("classes")}
          >
            Lớp đã học
          </button>

          <button
            className={`${styles["ld-nav-btn"]} ${active === "requests" ? styles.active : ""}`}
            onClick={() => setActive("requests")}
          >
            Yêu cầu
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles["ld-main"]}>
        {active === "profile" && <ProfileTab user={user} onSave={handleSaveProfile} />}
        {active === "classes" && <ClassesTab classes={classes} onWriteReview={handleWriteReview} />}
        {active === "requests" && (
            <RequestsTab 
                requests={requests} 
                onViewRequest={handleViewRequest} 
            />
        )}

      </main>

      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
        classItem={selectedClass}
      />

      <RequestDetailModal 
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        request={selectedRequest}
      />

    </div>
  );
}
