import React, { useState } from "react";
import styles from "./AdminEbooks.module.scss";
import EbookDetail from "../../learner/e-books/EBooksDetail";
import HeaderPage from '~/components/headerPage/HeaderPage';

export default function AdminEBooks() {
  const [selected, setSelected] = useState(null);

  // State filter
  const [subjectFilter, setSubjectFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const ebooks = [
    {
      id: 1,
      title: "Tài liệu Toán 12 – Hàm Số",
      subject: "Toán học",
      author: "Trần Văn A",
      size: "2.4 MB",
      date: "10-12-2025",
      desc: "Tóm tắt kiến thức và bài tập chương Hàm Số",
      type: "PDF",
      img: "https://img.freepik.com/free-photo/handsome-young-student_23-2148865905.jpg"
    },
    {
      id: 2,
      title: "Ngữ Văn 11 – Tổng hợp nghị luận",
      subject: "Ngữ văn",
      author: "Nguyễn Thị B",
      size: "1.2 MB",
      date: "09-28-2025",
      desc: "Các dạng bài nghị luận xã hội và nghị luận văn học",
      type: "Docx",
      img: "https://img.freepik.com/free-photo/handsome-young-student_23-2148865905.jpg"
    },
    {
      id: 3,
      title: "Tài liệu Toán 12 – Hàm Số",
      subject: "Toán học",
      author: "Trần Văn A",
      size: "2.4 MB",
      date: "10-12-2025",
      desc: "Tóm tắt kiến thức và bài tập chương Hàm Số",
      type: "PDF",
      img: "https://img.freepik.com/free-photo/handsome-young-student_23-2148865905.jpg"
    },
    {
      id: 4,
      title: "Ngữ Văn 11 – Tổng hợp nghị luận",
      subject: "Ngữ văn",
      author: "Nguyễn Thị B",
      size: "1.2 MB",
      date: "09-28-2025",
      desc: "Các dạng bài nghị luận xã hội và nghị luận văn học",
      type: "Docx",
      img: "https://img.freepik.com/free-photo/handsome-young-student_23-2148865905.jpg"
    },
    {
      id: 5,
      title: "Tài liệu Toán 12 – Hàm Số",
      subject: "Toán học",
      author: "Trần Văn A",
      size: "2.4 MB",
      date: "10-12-2025",
      desc: "Tóm tắt kiến thức và bài tập chương Hàm Số",
      type: "PDF",
      img: "https://img.freepik.com/free-photo/handsome-young-student_23-2148865905.jpg"
    },
    {
      id: 6,
      title: "Ngữ Văn 11 – Tổng hợp nghị luận",
      subject: "Ngữ văn",
      author: "Nguyễn Thị B",
      size: "1.2 MB",
      date: "09-28-2025",
      desc: "Các dạng bài nghị luận xã hội và nghị luận văn học",
      type: "Docx",
      img: "https://img.freepik.com/free-photo/handsome-young-student_23-2148865905.jpg"
    }
  ];

  return (
    <div className={styles.title}>
        <HeaderPage title="Quản lý Tài liệu học tập" />
        <div className={styles.eRoot}>
        {/* LIST CONTENT */}
        <main className={styles.eContent}>
            {ebooks.map((e) => (
            <div key={e.id} className={styles.eCard}>
                <img src={e.img} alt="" />

                <div className={styles.eInfo}>
                <h3>{e.title}</h3>
                <p className={styles.author}>
                    {e.author} • {new Date(e.date).toLocaleDateString("vi-VN")}
                </p>
                <p className={styles.desc}>{e.desc}</p>
                <p className={styles.size}>{e.size}</p>

                <div className={styles.actions}>
                    <button className={styles.btnPrimary}>Tải xuống</button>
                    <button
                    className={styles.btnLight}
                    onClick={() => setSelected(e)}
                    >
                    Chi tiết
                    </button>
                </div>
                </div>
            </div>
            ))}
        </main>

        {selected && (
            <EbookDetail 
            data={selected}
            onClose={() => setSelected(null)}
            />
        )}
        </div>
    </div>
  );
}
