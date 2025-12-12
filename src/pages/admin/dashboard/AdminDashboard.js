// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.scss";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { getDashboard } from "../../../api/services/adminDashboard";

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
  const [stats, setStats] = useState([]);
  const [ebookData, setEbookData] = useState(null);
  const [topRequestedSubjectsData, setTopRequestedSubjectsData] = useState(null);
  const [tutorVerificationData, setTutorVerificationData] = useState(null);

  // BE chưa trả danh sách yêu cầu → tạm để []
  const [classRequests, setClassRequests] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboard();
        if (!res) return;

        // ============== 1. Tổng quan ==============
        const ov = res.overview;

        setStats([
          { title: "Tổng số học viên", value: ov.totalLearners, color: "#4CAF50" },
          { title: "Tổng số gia sư", value: ov.totalTutors, color: "#2196F3" },
          { title: "Tổng số yêu cầu học", value: ov.totalClassRequests, color: "#FF9800" },
          { title: "Tổng số Ebook", value: ov.totalEbooks, color: "#9C27B0" },
        ]);

        // ============== 2. Ebook chart ==============
        const e = res.ebookStats;

        setEbookData({
          labels: ["Sách giáo khoa", "Tài liệu", "Đề thi tham khảo"],
          datasets: [
            {
              data: [
                e.SACH_GIAO_KHOA,
                e.TAI_LIEU,
                e.DE_THI_THAM_KHAO,
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        });

        // ============== 3. Top requested subjects ==============
        const topSub = res.topRequestedSubjects;

        setTopRequestedSubjectsData({
          labels: topSub.map((s) => s.subjectName),
          datasets: [
            {
              label: "Số lượng yêu cầu",
              data: topSub.map((s) => s.count),
              backgroundColor: ["#36A2EB"],
              borderRadius: 8,
            },
          ],
        });

        // ============== 4. Tutor verification ==============
        const verify = res.tutorVerification;

        setTutorVerificationData({
          labels: ["Đã duyệt", "Chờ duyệt"],
          datasets: [
            {
              label: "Gia sư",
              data: [verify.approved, verify.pending],
              backgroundColor: ["#4CAF50", "#FFC107"],
            },
          ],
        });

        // ============== 5. Class requests ==============
        setClassRequests([]); // BE chưa trả → để trống

      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    loadDashboard();
  }, []);

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
          {ebookData && <Pie data={ebookData} />}
        </div>

        <div className={styles.chart}>
          <h3>Top môn học được yêu cầu nhiều nhất</h3>
          {topRequestedSubjectsData && <Bar data={topRequestedSubjectsData} />}
        </div>

        <div className={styles.chart}>
          <h3>Trạng thái xác minh gia sư</h3>
          {tutorVerificationData && <Doughnut data={tutorVerificationData} />}
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className={styles.tableContainer}>
        <h3>Danh sách yêu cầu học mới</h3>

        {classRequests.length === 0 ? (
          <p>Chưa có dữ liệu.</p>
        ) : (
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
              {classRequests.map((req, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{req.learnerName}</td>
                  <td>{req.subjectName}</td>
                  <td>{req.status}</td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
