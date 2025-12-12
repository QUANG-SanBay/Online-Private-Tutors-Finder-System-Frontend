import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import "./TutorModal.scss";

import SchedulePicker from "./SchedulePicker";
import {
  generateTrialSchedule,
  generateOfficialSchedule,
  formatYMD,
} from "./ScheduleUtils";

const TutorModal = ({ isOpen, onClose, onSubmit }) => {
  const [gender, setGender] = useState("Nam");
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const [selectedSlots, setSelectedSlots] = useState([]);

  // mock busy slots — real project sẽ fetch API
  const busySlots = useMemo(
    () => [
      "Thứ 3-morning1",
      "Thứ 4-afternoon2",
      "Thứ 6-evening1",
    ],
    []
  );

  // Validation
  const validationError = useMemo(() => {
    if (!type) return "Vui lòng chọn hình thức.";

    if (type === "trial") {
      if (selectedSlots.length === 0) return "Vui lòng chọn 1 buổi học thử.";
      if (selectedSlots.length > 1) return "Chỉ được chọn 1 buổi học thử.";
    }

    if (type === "official") {
      if (selectedSlots.length < 2) return "Chọn ít nhất 2 buổi/tuần.";
      if (selectedSlots.length > 5) return "Tối đa 5 buổi/tuần.";
    }

    if (!studentName.trim()) return "Nhập họ tên học sinh.";
    if (!phone.trim()) return "Nhập số điện thoại.";

    return null;
  }, [type, selectedSlots, studentName, phone]);

  if (!isOpen) return null;

  // Toggle slot rules
  function handleToggleSlot(slotId) {
    if (type === "trial") {
      setSelectedSlots((prev) =>
        prev.includes(slotId) ? [] : [slotId]
      );
      return;
    }

    setSelectedSlots((prev) => {
      if (prev.includes(slotId)) return prev.filter((x) => x !== slotId);
      if (prev.length >= 5) return prev;
      return [...prev, slotId];
    });
  }

  // Submit
  function handleSubmit(e) {
    e.preventDefault();
    if (validationError) return alert(validationError);

    let schedule = type === "trial"
      ? generateTrialSchedule(selectedSlots[0])
      : generateOfficialSchedule(selectedSlots);

    const payload = {
      gender,
      studentName,
      phone,
      type,
      selectedSlots,
      notes,
      schedule,
      submittedAt: formatYMD(new Date()),
    };

    if (onSubmit) onSubmit(payload);
    onClose();
  }

  return ReactDOM.createPortal(
    <div className="tfm-overlay" onClick={onClose}>
      <div className="tfm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tfm-close" onClick={onClose}>×</button>

        <h2 className="tfm-title">Đăng ký thuê gia sư</h2>
        <p className="tfm-sub">
          Sau khi gửi thông tin, chúng tôi sẽ liên hệ lại với bạn.
        </p>

        <form className="tfm-form" onSubmit={handleSubmit}>
          <div className="tfm-row">
            <label>Hình thức học</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setSelectedSlots([]);
              }}
            >
              <option value="">-- Chọn --</option>
              <option value="trial">Học thử</option>
              <option value="official">Học chính thức</option>
            </select>
          </div>

          {type !== "" && (
            <>
              {/* Gợi ý */}
              <div className="tfm-hint">
                {type === "trial"
                  ? "Chọn 1 buổi bất kỳ trong tuần."
                  : "Chọn từ 2 đến 5 buổi mỗi tuần. Lịch sẽ lặp trong khoảng thời gian bạn chọn."}
              </div>

              {/* Nếu chọn Học chính thức -> thêm chọn ngày */}
              {type === "official" && (
                <div className="tfm-row tfm-date-range">
                  <div>
                    <label> Ngày bắt đầu </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label> Ngày kết thúc </label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate || undefined}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {type === "trial" && (
                <div className="tfm-row tfm-date-range">
                  <div>
                    <label> Ngày học thử </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Picker lịch */}
              <SchedulePicker
                busySlots={busySlots}
                selected={selectedSlots}
                onToggleSlot={handleToggleSlot}
              />

              {/* Chú thích */}
              <div className="tfm-legend">
                <span>
                  <div className="leg-box leg-free"></div> Rảnh
                </span>
                <span>
                  <div className="leg-box leg-busy"></div> Bận
                </span>
                <span>
                  <div className="leg-box leg-selected"></div> Đang chọn
                </span>
              </div>
            </>
          )}

          <div className="tfm-row">
            <label>Ghi chú</label>
            <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Môn học / yêu cầu riêng..."></textarea>
          </div>

          <div className="tfm-actions">
            <button type="button" onClick={onClose} className="tfm-btn tfm-cancel">Hủy</button>
            <button type="submit" className="tfm-btn tfm-submit">Đăng ký ngay</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default TutorModal;
