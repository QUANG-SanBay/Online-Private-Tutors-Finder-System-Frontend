import React, {useState} from "react";
import styles from '~/components/Learner/profile/Profile.module.scss';

export function ReviewModal({ open, onClose, onSubmit, classItem }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  if (!open) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    onClose();
    setRating(5);
    setComment("");
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = () => {
    onSubmit({ rating, comment, image });
    handleClose(); 
  };

  return (
    <div className={styles["ld-modal-overlay"]} onClick={handleClose}>
      <div className={styles["ld-modal"]} onClick={(e) => e.stopPropagation()}>
        
        <button className={styles["ld-modal-close"]} onClick={handleClose}>&times;</button>
        <h3>Viết đánh giá cho: <span>{classItem?.subject}</span></h3>

        {/* Rating */}
        <div className={styles["ld-rating-row"]}>
          <label>Điểm:</label>
          <div className={styles["ld-stars"]}>
            {[1,2,3,4,5].map((s) => (
              <button
                key={s}
                className={`${styles["star"]} ${s <= rating ? styles["active"] : ''}`}
                onClick={() => setRating(s)}
                aria-label={`Rate ${s}`}
              >{s <= rating ? '★' : '☆'}</button>
            ))}
          </div>
        </div>

        {/* Text comment */}
        <textarea
          placeholder="Viết nhận xét của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Upload image */}
        <div style={{ marginTop: 10 }}>
          <label>Hình ảnh (tùy chọn)</label><br/>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <div style={{ marginTop: 10 }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles["ld-modal-actions"]}>
          <button className={`${styles["btn"]} ${styles["btn-secondary"]}`} onClick={handleClose}>
            Hủy
          </button>
          <button className={`${styles["btn"]} ${styles["btn-primary"]}`} onClick={handleSubmit}>
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
