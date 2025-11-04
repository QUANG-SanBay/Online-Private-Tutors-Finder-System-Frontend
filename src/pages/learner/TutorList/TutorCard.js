import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./TutorList.scss";
import TutorFormModal from "~/components/Learner/TutorModal/TutorModal";

const TutorCard = ({ tutor, onRegister }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article className="tutor-card">
      <div className="tutor-image">
        <Link to={`/Tutor/${tutor.id}`} className="tutor-card-link">
          <img src={tutor.image} alt={tutor.subject} />
        </Link>
      </div>

      <div className="tutor-info">
        <Link to={`/Tutor/${tutor.id}`} className="tutor-card-link">
        <div>
          <p className="tutor-name">{tutor.name}</p>
          <p className="tutor-level">{tutor.level}</p>
          <h3 className="tutor-subject">{tutor.subject}</h3>
          <p className="tutor-price">{tutor.price}</p>
          <p className="tutor-desc">{tutor.description}</p>
        </div>
        </Link>
        <div className="tutor-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Đăng ký</button>
          <TutorFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          />
          <Link to={`/Tutor/${tutor.id}`} className="btn-secondary" onClick={(e) => e.stopPropagation()} >Chi tiết</Link>
        </div>
      </div>
    </article>
  );
};

export default TutorCard;
