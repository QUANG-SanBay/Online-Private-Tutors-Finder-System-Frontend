import React, { useState } from "react";
import styles from "./TutorSchedule.module.scss";
import { format } from "date-fns";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import TutorEventCard from "~/components/schedule/TutorEventCard";

// Mock schedule data for tutor - showing students instead of tutors
const scheduleData = [
  {
    date: "2025-11-04",
    session: "Sáng",
    shift: "Ca 1",
    subject: "Toán học",
    time: "08:00 - 09:30",
    student: "Nguyễn Văn A",
  },
  {
    date: "2025-11-04",
    session: "Sáng",
    shift: "Ca 2",
    subject: "Toán học",
    time: "09:30 - 11:00",
    student: "Trần Thị B",
  },
  {
    date: "2025-11-05",
    session: "Chiều",
    shift: "Ca 3",
    subject: "Toán nâng cao",
    time: "12:30 - 15:00",
    student: "Lê Văn C",
  },
  {
    date: "2025-11-06",
    session: "Chiều",
    shift: "Ca 4",
    subject: "Toán học",
    time: "15:00 - 16:30",
    student: "Phạm Thị D",
    status: "pause",
  },
  {
    date: "2025-11-05",
    session: "Tối",
    shift: "Ca 5",
    subject: "Toán học",
    time: "19:00 - 20:30",
    student: "Hoàng Văn E",
  },
  {
    date: "2025-11-07",
    session: "Sáng",
    shift: "Ca 1",
    subject: "Toán học",
    time: "08:00 - 09:30",
    student: "Nguyễn Thị F",
  },
  {
    date: "2025-11-08",
    session: "Chiều",
    shift: "Ca 4",
    subject: "Toán nâng cao",
    time: "15:00 - 16:30",
    student: "Võ Văn G",
  },
];

function TutorSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentDate);
    // Fix: Handle Sunday (0) by treating it as day 7
    const day = currentDate.getDay() || 7; // If Sunday (0), use 7
    d.setDate(currentDate.getDate() - day + 1 + i); // Monday is day 1
    return d;
  });

  const go = (days) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d);
  };
  return (
    <div className={styles.tutorSchedule}>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Lịch dạy</h2>

          <div className={styles.controls}>
            <button onClick={() => go(-7)}><FiChevronLeft /></button>
            <button onClick={() => setCurrentDate(new Date())} className={styles.today}>
              Hôm nay
            </button>
            <button onClick={() => go(7)}><FiChevronRight /></button>

            <div className={styles.dateBox}>
              <FiCalendar />
              <input
                type="date"
                value={format(currentDate, "yyyy-MM-dd")}
                onChange={(e) => setCurrentDate(new Date(e.target.value))}
                
              />
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={styles.calendar}>

          {/* Header */}
          <div className={styles.timeCol}>Ca dạy</div>
          {weekDays.map((d, i) => (
            <div
              key={i}
              className={`${styles.dayHeader} ${format(d, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                  ? styles.activeDay
                  : ""
                }`}
            >
              {d.getDay() === 0 ? "CN" : `Thứ ${d.getDay() + 1}`}
              <span>{format(d, "dd/MM")}</span>
            </div>
          ))}

          {/* Sáng */}
          <div className={styles.session}>Sáng</div>
          {weekDays.map((day, i) => (
            <div key={i} className={styles.cell}>
              {scheduleData
                .filter(x => x.date === format(day, "yyyy-MM-dd") && x.session === "Sáng")
                .map((x, i) => (<TutorEventCard key={i} data={x} />))
              }
            </div>
          ))}

          {/* Chiều */}
          <div className={styles.session}>Chiều</div>
          {weekDays.map((day, i) => (
            <div key={i} className={styles.cell}>
              {scheduleData
                .filter(x => x.date === format(day, "yyyy-MM-dd") && x.session === "Chiều")
                .map((x, i) => (<TutorEventCard key={i} data={x} />))
              }
            </div>
          ))}

          {/* Tối */}
          <div className={styles.session}>Tối</div>
          {weekDays.map((day, i) => (
            <div key={i} className={styles.cell}>
              {scheduleData
                .filter(x => x.date === format(day, "yyyy-MM-dd") && x.session === "Tối")
                .map((x, i) => (<TutorEventCard key={i} data={x} />))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TutorSchedule;