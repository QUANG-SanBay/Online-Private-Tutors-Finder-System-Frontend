import React, { useState } from "react";
import styles from "./EBooks.module.scss";
import EbookDetail from "./EBooksDetail";

export default function EBooks() {
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
    }
  ];

  return (
    <div className={styles.eRoot}>
      {/* SIDEBAR FILTER */}
      <aside className={styles.eSidebar}>
        <h3>Tìm tài liệu</h3>

        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="">Chọn môn</option>
          <option>Toán học</option>
          <option>Ngữ văn</option>
        </select>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Loại tài liệu</option>
          <option>PDF</option>
          <option>Powerpoint</option>
          <option>Docx</option>
          <option>Text</option>
        </select>

        {/* ✅ Date state fixed */}
        <input 
          type="date" 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)} 
        />

        <button className={styles.searchBtn}>Tìm kiếm</button>
      </aside>

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
  );
}
