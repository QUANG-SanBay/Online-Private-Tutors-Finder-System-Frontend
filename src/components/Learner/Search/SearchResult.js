import React, { useState, useEffect } from "react";
import "./SearchResult.scss";
import "../TutorDetail/TutorDetail.scss";
import ClassCard from "../../Learner/TutorDetail/Card";

const classes = [
  {
    image: "https://img.freepik.com/free-photo/smiling-girl-studying_23-2148865877.jpg",
    subject: "Vật lý lớp 11",
    teacherName: "Nguyễn Tuấn Minh",
    teacherLevel: "Giáo viên cấp 3",
    price: "200.000đ/buổi",
    description: "Trung tâm U.Smart cung cấp đội ngũ gia sư sư phạm hàng đầu tại Hà Nội: Đội ngũ chuyên nghiệp, tận tâm giúp học sinh tiến bộ nhanh.",
  },
  {
    image: "https://img.freepik.com/free-photo/happy-young-student-holding-notebooks_23-2148865888.jpg",
    subject: "Sinh học lớp 7",
    teacherName: "Nguyễn Văn Tuấn",
    teacherLevel: "Sinh viên năm 1",
    price: "400.000đ/buổi",
    description: "Hỗ trợ học sinh nắm vững kiến thức cơ bản, phát triển tư duy logic và kỹ năng thực hành.",
  },
  {
    image: "https://img.freepik.com/free-photo/teacher-helping-girl-homework_23-2148865879.jpg",
    subject: "Toán học lớp 2",
    teacherName: "Nhật Linh",
    teacherLevel: "Giáo viên cấp 1",
    price: "200.000đ/buổi",
    description: "Dạy theo phương pháp hiện đại, kết hợp trò chơi và thực hành giúp học sinh hứng thú với môn học.",
  },
  {
    image: "https://img.freepik.com/free-photo/young-student-writing-notes_23-2148865890.jpg",
    subject: "Tiếng Anh lớp 5",
    teacherName: "Lê Thị Hương",
    teacherLevel: "Giáo viên cấp 2",
    price: "250.000đ/buổi",
    description: "Tập trung cải thiện kỹ năng nghe – nói – đọc – viết, phù hợp với từng trình độ học sinh.",
  },
  {
    image: "https://img.freepik.com/free-photo/group-of-children-studying_23-2148865891.jpg",
    subject: "Hóa học lớp 9",
    teacherName: "Trần Văn Quang",
    teacherLevel: "Giáo viên cấp 2",
    price: "300.000đ/buổi",
    description: "Luyện tập làm bài tập và giải đề thi, giúp học sinh tự tin khi bước vào kỳ thi cuối kỳ.",
  },
  {
    image: "https://img.freepik.com/free-photo/smiling-girl-studying_23-2148865877.jpg",
    subject: "Vật lý lớp 11",
    teacherName: "Nguyễn Tuấn Minh",
    teacherLevel: "Giáo viên cấp 3",
    price: "200.000đ/buổi",
    description: "Trung tâm U.Smart cung cấp đội ngũ gia sư sư phạm hàng đầu tại Hà Nội: Đội ngũ chuyên nghiệp, tận tâm giúp học sinh tiến bộ nhanh.",
  },
  {
    image: "https://img.freepik.com/free-photo/happy-young-student-holding-notebooks_23-2148865888.jpg",
    subject: "Sinh học lớp 7",
    teacherName: "Nguyễn Văn Tuấn",
    teacherLevel: "Sinh viên năm 1",
    price: "400.000đ/buổi",
    description: "Hỗ trợ học sinh nắm vững kiến thức cơ bản, phát triển tư duy logic và kỹ năng thực hành.",
  },
  {
    image: "https://img.freepik.com/free-photo/teacher-helping-girl-homework_23-2148865879.jpg",
    subject: "Toán học lớp 2",
    teacherName: "Nhật Linh",
    teacherLevel: "Giáo viên cấp 1",
    price: "200.000đ/buổi",
    description: "Dạy theo phương pháp hiện đại, kết hợp trò chơi và thực hành giúp học sinh hứng thú với môn học.",
  },
  {
    image: "https://img.freepik.com/free-photo/young-student-writing-notes_23-2148865890.jpg",
    subject: "Tiếng Anh lớp 5",
    teacherName: "Lê Thị Hương",
    teacherLevel: "Giáo viên cấp 2",
    price: "250.000đ/buổi",
    description: "Tập trung cải thiện kỹ năng nghe – nói – đọc – viết, phù hợp với từng trình độ học sinh.",
  },
  {
    image: "https://img.freepik.com/free-photo/group-of-children-studying_23-2148865891.jpg",
    subject: "Hóa học lớp 9",
    teacherName: "Trần Văn Quang",
    teacherLevel: "Giáo viên cấp 2",
    price: "300.000đ/buổi",
    description: "Luyện tập làm bài tập và giải đề thi, giúp học sinh tự tin khi bước vào kỳ thi cuối kỳ.",
  },
  {
    image: "https://img.freepik.com/free-photo/smiling-girl-studying_23-2148865877.jpg",
    subject: "Vật lý lớp 11",
    teacherName: "Nguyễn Tuấn Minh",
    teacherLevel: "Giáo viên cấp 3",
    price: "200.000đ/buổi",
    description: "Trung tâm U.Smart cung cấp đội ngũ gia sư sư phạm hàng đầu tại Hà Nội: Đội ngũ chuyên nghiệp, tận tâm giúp học sinh tiến bộ nhanh.",
  },
  {
    image: "https://img.freepik.com/free-photo/happy-young-student-holding-notebooks_23-2148865888.jpg",
    subject: "Sinh học lớp 7",
    teacherName: "Nguyễn Văn Tuấn",
    teacherLevel: "Sinh viên năm 1",
    price: "400.000đ/buổi",
    description: "Hỗ trợ học sinh nắm vững kiến thức cơ bản, phát triển tư duy logic và kỹ năng thực hành.",
  },
  {
    image: "https://img.freepik.com/free-photo/teacher-helping-girl-homework_23-2148865879.jpg",
    subject: "Toán học lớp 2",
    teacherName: "Nhật Linh",
    teacherLevel: "Giáo viên cấp 1",
    price: "200.000đ/buổi",
    description: "Dạy theo phương pháp hiện đại, kết hợp trò chơi và thực hành giúp học sinh hứng thú với môn học.",
  },
  {
    image: "https://img.freepik.com/free-photo/young-student-writing-notes_23-2148865890.jpg",
    subject: "Tiếng Anh lớp 5",
    teacherName: "Lê Thị Hương",
    teacherLevel: "Giáo viên cấp 2",
    price: "250.000đ/buổi",
    description: "Tập trung cải thiện kỹ năng nghe – nói – đọc – viết, phù hợp với từng trình độ học sinh.",
  },
  {
    image: "https://img.freepik.com/free-photo/group-of-children-studying_23-2148865891.jpg",
    subject: "Hóa học lớp 9",
    teacherName: "Trần Văn Quang",
    teacherLevel: "Giáo viên cấp 2",
    price: "300.000đ/buổi",
    description: "Luyện tập làm bài tập và giải đề thi, giúp học sinh tự tin khi bước vào kỳ thi cuối kỳ.",
  },
  {
    image: "https://img.freepik.com/free-photo/happy-young-student-holding-notebooks_23-2148865888.jpg",
    subject: "Sinh học lớp 7",
    teacherName: "Nguyễn Văn Tuấn",
    teacherLevel: "Sinh viên năm 1",
    price: "400.000đ/buổi",
    description: "Hỗ trợ học sinh nắm vững kiến thức cơ bản, phát triển tư duy logic và kỹ năng thực hành.",
  },
  {
    image: "https://img.freepik.com/free-photo/teacher-helping-girl-homework_23-2148865879.jpg",
    subject: "Toán học lớp 2",
    teacherName: "Nhật Linh",
    teacherLevel: "Giáo viên cấp 1",
    price: "200.000đ/buổi",
    description: "Dạy theo phương pháp hiện đại, kết hợp trò chơi và thực hành giúp học sinh hứng thú với môn học.",
  },
  {
    image: "https://img.freepik.com/free-photo/young-student-writing-notes_23-2148865890.jpg",
    subject: "Tiếng Anh lớp 5",
    teacherName: "Lê Thị Hương",
    teacherLevel: "Giáo viên cấp 2",
    price: "250.000đ/buổi",
    description: "Tập trung cải thiện kỹ năng nghe – nói – đọc – viết, phù hợp với từng trình độ học sinh.",
  },
  {
    image: "https://img.freepik.com/free-photo/group-of-children-studying_23-2148865891.jpg",
    subject: "Hóa học lớp 9",
    teacherName: "Trần Văn Quang",
    teacherLevel: "Giáo viên cấp 2",
    price: "300.000đ/buổi",
    description: "Luyện tập làm bài tập và giải đề thi, giúp học sinh tự tin khi bước vào kỳ thi cuối kỳ.",
  },
  {
    image: "https://img.freepik.com/free-photo/happy-young-student-holding-notebooks_23-2148865888.jpg",
    subject: "Sinh học lớp 7",
    teacherName: "Nguyễn Văn Tuấn",
    teacherLevel: "Sinh viên năm 1",
    price: "400.000đ/buổi",
    description: "Hỗ trợ học sinh nắm vững kiến thức cơ bản, phát triển tư duy logic và kỹ năng thực hành.",
  },
  {
    image: "https://img.freepik.com/free-photo/teacher-helping-girl-homework_23-2148865879.jpg",
    subject: "Toán học lớp 2",
    teacherName: "Nhật Linh",
    teacherLevel: "Giáo viên cấp 1",
    price: "200.000đ/buổi",
    description: "Dạy theo phương pháp hiện đại, kết hợp trò chơi và thực hành giúp học sinh hứng thú với môn học.",
  },
  {
    image: "https://img.freepik.com/free-photo/young-student-writing-notes_23-2148865890.jpg",
    subject: "Tiếng Anh lớp 5",
    teacherName: "Lê Thị Hương",
    teacherLevel: "Giáo viên cấp 2",
    price: "250.000đ/buổi",
    description: "Tập trung cải thiện kỹ năng nghe – nói – đọc – viết, phù hợp với từng trình độ học sinh.",
  },
  {
    image: "https://img.freepik.com/free-photo/group-of-children-studying_23-2148865891.jpg",
    subject: "Hóa học lớp 9",
    teacherName: "Trần Văn Quang",
    teacherLevel: "Giáo viên cấp 2",
    price: "300.000đ/buổi",
    description: "Luyện tập làm bài tập và giải đề thi, giúp học sinh tự tin khi bước vào kỳ thi cuối kỳ.",
  },
];

const SearchResults = ({ query }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 15;

  // Lọc dữ liệu an toàn
  const filtered = classes.filter((t) =>
    (t.subject ?? "").toLowerCase().includes((query ?? "").toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(filtered.length / tutorsPerPage);
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filtered.slice(indexOfFirstTutor, indexOfLastTutor);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="search-page">
      {filtered.length > 0 ? (
        <>
          <p>Có <strong>{filtered.length}</strong> kết quả tìm kiếm phù hợp</p>
          <div className="other-classes">
            <div className="class-grid">
              {currentTutors.map((cls, idx) => (
                <ClassCard key={idx} {...cls} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="no-results">
          <p><strong>Không tìm thấy kết quả phù hợp với "{query}"</strong></p>
        </div>
      )}

      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default SearchResults;