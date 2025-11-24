import React, { useState } from "react";
import styles from "~/components/Learner/profile/Profile.module.scss";
import RequestsTab from "~/components/Learner/request/request";
import RequestDetailModal from "~/components/Learner/request/requetsDetail";

export default function LearnerDashboard() {

  const requests = [
    { id: 11, subject: 'Toán 10 - Đại số', type: 'trial', tutor: 'Cô Lan', date: '12/9/2025', status: 'pending', statusLabel: 'Chờ' },
    { id: 12, subject: 'Luyện thi THPTQG - Hóa', type: 'official', tutor: 'Thầy Nam', date: '20/10/2025', status: 'confirmed', statusLabel: 'Đã xác nhận' }
  ];

    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    function handleViewRequest(r) {
    setSelectedRequest(r);
    setRequestModalOpen(true);
    }
  return (
    <div className={styles["ld-root"]}>
      {/* Main content */}
      <main className={styles["ld-main"]}>
        <RequestsTab 
            requests={requests} 
            onViewRequest={handleViewRequest} 
        />
      </main>

      <RequestDetailModal 
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        request={selectedRequest}
      />

    </div>
  );
}
