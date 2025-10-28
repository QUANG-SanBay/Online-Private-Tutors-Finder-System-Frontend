import React, {useState} from "react";
import "./TutorDetail.scss";
import { FaStar } from "react-icons/fa";
import ClassCard from "~/components/Learner/Card/Card";


const TutorDetail = () => {
  const [activeTab, setActiveTab] = useState("course");
  const reviews = [
    {
      id: 1,
      name: "Minh Anh",
      avatar: "https://i.pravatar.cc/50?img=12",
      rating: 5,
      comment:
        "Gia sư dạy rất dễ hiểu, tận tâm, con mình tiến bộ rõ rệt sau 2 buổi!",
      images: [
        "https://i.imgur.com/1nP8QkX.jpg",
        "https://i.imgur.com/9k6s3qf.jpg",
      ],
      date: "15/10/2025",
    },
    {
      id: 2,
      name: "Hồng Nhung",
      avatar: "https://i.pravatar.cc/50?img=24",
      rating: 4,
      comment:
        "Dạy tốt, nhiệt tình. Tuy nhiên cần thêm ví dụ minh họa để dễ hiểu hơn.",
      images: [],
      date: "10/10/2025",
    },
  ];

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
  ];


  return (
    <div className="tutor-detail-page">

      {/* Header */}
      <div className="tutor-detail-header">
        <div className="image-section">
          <img
            src="https://img.freepik.com/free-photo/happy-little-girl-studying-with-book_23-2148865863.jpg"
            alt="Vật lý lớp 11"
            className="main-img"
          />

          <div className="thumbnail-list">
            <img
              src="https://img.freepik.com/free-photo/smiling-girl-studying_23-2148865877.jpg"
              alt=""
            />
            <img
              src="https://img.freepik.com/free-photo/smart-kid-using-laptop_23-2148865888.jpg"
              alt=""
            />
            <img
              src="https://img.freepik.com/free-photo/children-learning-robotics_23-2148865868.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="info-section">
          <h2>Vật lý lớp 11</h2>
          <p>
            Giáo viên: <span className="teacher">Giáo viên</span>
          </p>
          <h3 className="price">200.000đ</h3>
          <p className="desc">Thông tin khóa học đang được cập nhật</p>
          <button className="btn-primary">Đăng ký thuê gia sư</button>
        </div>
      </div>

      {/* Tabs */}
       <div className="tab-buttons">
          <button
            className={`tab ${activeTab === "course" ? "active" : ""}`}
            onClick={() => setActiveTab("course")}
          >
            THÔNG TIN KHÓA HỌC
          </button>
          <button
            className={`tab ${activeTab === "teacher" ? "active" : ""}`}
            onClick={() => setActiveTab("teacher")}
          >
            THÔNG TIN GIÁO VIÊN
          </button>
          <button
            className={`tab ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            ĐÁNH GIÁ CHI TIẾT
          </button>
        </div>

        {/* --- Nội dung của tab --- */}
        <div className="tab-content">
          {activeTab === "course" && (
            <div>
              <p>
                Trung tâm U.Smart cung cấp đội ngũ gia sư sư phạm hàng đầu tại Hà
                Nội:
              </p>
              <ul>
                <li>
                  Đội ngũ giáo viên và gia sư đều có kinh nghiệm dạy học từ 2 năm
                  trở lên nhằm đảm bảo chất lượng dạy học tốt nhất đến với mỗi
                  gia đình.
                </li>
                <li>Gia sư có phẩm chất đạo đức tốt, lý lịch rõ ràng.</li>
                <li>Tìm gia sư miễn phí theo yêu cầu của phụ huynh.</li>
                <li>Học thử 2 buổi tại nhà để đảm bảo phù hợp.</li>
                <li>Đổi ngay gia sư nếu chưa phù hợp.</li>
              </ul>
            </div>
          )}

          {activeTab === "teacher" && (
            <div className="teacher-info">
              <h4>Nguyễn Tuấn Minh</h4>
              <p>Giáo viên cấp 3 - Trường THPT Chu Văn An</p>
              <p>
                Với hơn 5 năm kinh nghiệm giảng dạy môn Vật Lý, thầy Minh nổi bật
                bởi phương pháp giảng dạy dễ hiểu, ứng dụng thực tế cao, và khả
                năng giúp học sinh đạt kết quả vượt trội trong các kỳ thi.
              </p>
            </div>
          )}

          {activeTab === "review" && (
            <div className="reviews-section">
            {reviews.map((r) => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <img src={r.avatar} alt={r.name} className="avatar" />
                  <div>
                    <p className="name">{r.name}</p>
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar key={i} color={i < r.rating ? "#f59e0b" : "#e5e7eb"} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="comment">{r.comment}</p>
                {r.images.length > 0 && (
                  <div className="review-images">
                    {r.images.map((img, index) => (
                      <img key={index} src={img} alt="review" />
                    ))}
                  </div>
                )}
                <p className="date">{r.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Classes */}
      <div className="other-classes">
        <h2>Lớp học khác</h2>
        <div className="class-grid">
          {classes.map((cls, idx) => (
            <ClassCard key={idx} {...cls} />
          ))}
        </div>
      </div>
  </div>
  );
};

export default TutorDetail;
