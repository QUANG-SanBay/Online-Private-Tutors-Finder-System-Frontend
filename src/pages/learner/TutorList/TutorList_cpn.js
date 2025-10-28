import React, { useState, useEffect } from "react";
import "./TutorList.scss";
import FilterSidebar from "./FilterSidebar";
import TutorCard from "./TutorCard";

const TutorList = () => {
  const [tutors, setTutors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 3;

  // ✅ Giả lập gọi API (fetch dữ liệu)
  useEffect(() => {
    const mockTutors = [
      {
        id: 1,
        name: "Nguyễn Tuấn Minh",
        level: "Giáo viên cấp 3",
        subject: "Vật lý lớp 11",
        price: "200.000đ/buổi",
        description:
          "Trung tâm U.Smart cung cấp đội ngũ gia sư sư phạm hàng đầu tại Hà Nội: Đội ngũ...",
        image:
          "https://img.freepik.com/free-photo/smiling-girl-doing-homework_23-2148865909.jpg",
      },
      {
        id: 2,
        name: "Nguyễn Văn Tuấn",
        level: "Sinh viên năm 1",
        subject: "Sinh học lớp 7",
        price: "400.000đ/buổi",
        description:
          "Trung tâm U.Smart cung cấp đội ngũ gia sư sư phạm hàng đầu tại Hà Nội: Đội ngũ...",
        image:
          "https://img.freepik.com/free-photo/happy-student-holding-notebooks_23-2148865920.jpg",
      },
      {
        id: 3,
        name: "Nhật Linh",
        level: "Giáo viên cấp 1",
        subject: "Toán học lớp 2",
        price: "200.000đ/buổi",
        description:
          "Trung tâm U.Smart cung cấp đội ngũ gia sư sư phạm hàng đầu tại Hà Nội: Đội ngũ...",
        image:
          "https://img.freepik.com/free-photo/teacher-helping-kid-do-homework_23-2148865888.jpg",
      },
      {
        id: 4,
        name: "Phạm Anh Thư",
        level: "Giáo viên cấp 2",
        subject: "Ngữ văn lớp 8",
        price: "250.000đ/buổi",
        description:
          "Kinh nghiệm 5 năm dạy kèm học sinh trung học cơ sở tại Hà Nội.",
        image:
          "https://img.freepik.com/free-photo/teacher-explaining-lesson_23-2148865890.jpg",
      },
      {
        id: 5,
        name: "Trần Hồng Nam",
        level: "Sinh viên năm 3",
        subject: "Tiếng Anh lớp 9",
        price: "180.000đ/buổi",
        description: "Nhiệt huyết, tận tâm, từng đạt IELTS 8.0.",
        image:
          "https://img.freepik.com/free-photo/handsome-young-student_23-2148865905.jpg",
      },
    ];

    // Giả lập delay tải dữ liệu
    setTimeout(() => {
      setTutors(mockTutors);
    }, 500);
  }, []);

  // ✅ Tính phân trang
  const totalPages = Math.ceil(tutors.length / tutorsPerPage);
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="tutor-container">
      <FilterSidebar />
      <div className="tutor-list">
        {currentTutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}

        {/* ✅ Phân trang */}
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            &laquo; Trước
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Sau &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorList;
