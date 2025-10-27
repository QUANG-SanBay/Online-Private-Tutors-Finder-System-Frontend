import React from "react";
import "./TutorModal.scss";

const TutorFormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // nếu modal đóng thì không render gì

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Đăng ký thuê gia sư</h2>
        <p>
          Sau khi bạn đăng ký, chúng tôi sẽ gọi lại cho bạn để trao đổi thêm
          những thông tin cần thiết khác. Tất cả thông tin của bạn sẽ được bảo mật.
        </p>

        <form>
          <div className="gender">
            <label>
              <input type="radio" name="gender" value="Nam" defaultChecked />
              Nam
            </label>
            <label>
              <input type="radio" name="gender" value="Nữ" />
              Nữ
            </label>
          </div>

          <input type="text" placeholder="Họ và tên" />
          <input type="text" placeholder="Số điện thoại" />
          <input type="text" placeholder="Số nhà, tên đường" />
          <textarea placeholder="Ghi chú"></textarea>

          <button type="submit" className="submit-btn">
            Đăng ký thuê gia sư ngay
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorFormModal;
