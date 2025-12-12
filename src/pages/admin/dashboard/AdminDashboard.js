// AdminDashboard.jsx
import React from "react";
import styles from "./AdminDashboard.module.scss";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
  // ================= Chỉ số tổng quan =================
  const stats = [
    { title: "Tổng số học viên", value: 120, color: "#4CAF50" },
    { title: "Tổng số gia sư", value: 45, color: "#2196F3" },
    { title: "Tổng số yêu cầu học", value: 200, color: "#FF9800" },
    { title: "Tổng số Ebooks", value: 60, color: "#9C27B0" },
  ];

  // ================= Biểu đồ dữ liệu =================
    const ebookData = {
    labels: ["Sách giáo khoa", "Tài liệu", "Đề thi tham khảo"],
    datasets: [
        {
        data: [25, 20, 15],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#ffa7baff", "#7ccbffff", "#fffc9fff"],
        borderWidth: 2,
        borderColor: "#fff"
        },
    ],
    };


    const topRequestedSubjectsData = {
    labels: ["Toán", "Vật lý", "Hóa học", "Anh văn", "Sinh học"],
    datasets: [
        {
        label: "Số lượng yêu cầu",
        data: [40, 35, 25, 20, 15],
        backgroundColor: ["#36a2eb"],
        borderRadius: 8
        },
    ],
    };


  const tutorVerificationData = {
    labels: ["Chấp nhận", "Chờ xác nhận", "Bị từ chối"],
    datasets: [
      {
        label: "Số lượng gia sư",
        data: [30, 10, 5],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  // ================= Bảng dữ liệu =================
  const classRequests = [
    { id: 1, learner: "Nguyễn Văn A", subject: "Toán", status: "Chờ xác nhận" },
    { id: 2, learner: "Trần Thị B", subject: "Anh văn", status: "Chấp nhận" },
    { id: 3, learner: "Lê Văn C", subject: "Vật lý", status: "Bị từ chối" },
    { id: 4, learner: "Phạm Thị D", subject: "Hóa học", status: "Chấp nhận" },
  ];

  return (
    <div className={styles.dashboard}>

      {/* Tổng quan */}
      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.card} style={{ borderTopColor: stat.color }}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Biểu đồ */}
      <div className={styles.charts}>
        <div className={styles.chart}>
          <h3>Ebook theo loại</h3>
          <Pie data={ebookData} />
        </div>
        <div className={styles.chart}>
          <h3>Top 5 môn được học viên yêu cầu nhiều nhất</h3>
          <Bar data={topRequestedSubjectsData} options={{ responsive: true }} />
        </div>
        <div className={styles.chart}>
          <h3>Số lượng gia sư theo trạng thái xác minh</h3>
          <Doughnut data={tutorVerificationData} />
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className={styles.tableContainer}>
        <h3>Danh sách yêu cầu học mới</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Học viên</th>
              <th>Môn học</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {classRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.learner}</td>
                <td>{req.subject}</td>
                <td
                  className={
                    req.status === "Chờ xác nhận"
                      ? styles.pending
                      : req.status === "Chấp nhận"
                      ? styles.confirmed
                      : styles.cancelled
                  }
                >
                  {req.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
