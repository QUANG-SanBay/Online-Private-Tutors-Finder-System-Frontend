import React, {useState} from "react";
import "./TutorList.scss";

const TutorCard = ({ tutor, onRegister }) => {

  return (
    <article className="tutor-card">
      <div className="tutor-image">
        <img src={tutor.image} alt={tutor.subject} />
      </div>

      <div className="tutor-info">
        <div>
          <p className="tutor-name">{tutor.name}</p>
          <p className="tutor-level">{tutor.level}</p>
          <h3 className="tutor-subject">{tutor.subject}</h3>
          <p className="tutor-price">{tutor.price}</p>
          <p className="tutor-desc">{tutor.description}</p>
        </div>

        <div className="tutor-actions">
          <button className="btn-primary" onClick={onRegister}>Đăng ký</button>
          <button className="btn-secondary"><a href={`/Tutor/${tutor.id}`}>Chi tiết</a></button>
        </div>
      </div>
    </article>
  );
};

export default TutorCard;
