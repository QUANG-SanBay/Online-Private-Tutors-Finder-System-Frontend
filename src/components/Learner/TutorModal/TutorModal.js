import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./TutorModal.scss";

const TutorFormModal = ({ isOpen, onClose }) => {
  // ✅ Hooks phải đặt trên cùng, không được sau return
  const [type, setType] = useState(""); // trial | official
  const [trialDate, setTrialDate] = useState("");
  const [trialTime, setTrialTime] = useState("");
  const [studyDays, setStudyDays] = useState([]);
  const [studyTime, setStudyTime] = useState("");

  const days = ["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];

  const handleDaySelect = (day) => {
    setStudyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  

  if (!isOpen) return null; // ✅ return sau khi khai báo hook

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Đăng ký thuê gia sư</h2>
        <p>
          Sau khi bạn đăng ký, chúng tôi sẽ gọi lại cho bạn để trao đổi thêm thông tin cần thiết.
          Tất cả thông tin của bạn sẽ được bảo mật.
        </p>

        <form>
          <div className="gender">
            <label>
              <input type="radio" name="gender" value="Nam" defaultChecked /> Nam
            </label>
            <label>
              <input type="radio" name="gender" value="Nữ" /> Nữ
            </label>
          </div>

          <input type="text" placeholder="Họ và tên học sinh" />
          <input type="text" placeholder="Số điện thoại" />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Chọn hình thức học</option>
            <option value="trial">Học thử</option>
            <option value="official">Học chính thức</option>
          </select>

          {type === "trial" && (
            <>
              <label>Ngày học thử</label>
              <input type="date" value={trialDate} onChange={(e) => setTrialDate(e.target.value)} />

              <label>Giờ học</label>
              <input type="time" value={trialTime} onChange={(e) => setTrialTime(e.target.value)} />
            </>
          )}

          {type === "official" && (
            <>
              <label>Chọn ít nhất 2 ngày học / tuần:</label>
              <div className="day-select">
                {days.map((d) => (
                  <label key={d}>
                    <input
                      type="checkbox"
                      checked={studyDays.includes(d)}
                      onChange={() => handleDaySelect(d)}
                    />
                    {d}
                  </label>
                ))}
              </div>

              <label>Giờ học</label>
              <input type="time" value={studyTime} onChange={(e) => setStudyTime(e.target.value)} />
            </>
          )}

          <textarea placeholder="Ghi chú"></textarea>

          <button type="submit" className="submit-btn">Đăng ký thuê gia sư ngay</button>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default TutorFormModal;
