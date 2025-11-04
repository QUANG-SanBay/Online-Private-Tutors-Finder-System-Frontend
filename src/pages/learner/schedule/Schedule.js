import React, { useState } from "react";
import styles from "./Schedule.module.scss";
import { format } from "date-fns";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import EventCard from "~/components/schedule/eventCard";

const scheduleData = [
  {
    date: "2025-11-04",
    session: "Sáng",
    shift: "Ca 1",
    subject: "Anh văn",
    time: "08:00 - 09:30",
    tutor: "Cô Lan",
  },
  {
    date: "2025-11-04",
    session: "Sáng",
    shift: "Ca 2",
    subject: "Toán",
    time: "09:30 - 11:00",
    tutor: "Thầy Nam",
  },
  {
    date: "2025-11-05",
    session: "Chiều",
    shift: "Ca 3",
    subject: "Hóa",
    time: "12:30 - 15:00",
    tutor: "Thầy Nam",
  },
  {
    date: "2025-11-06",
    session: "Chiều",
    shift: "Ca 4",
    subject: "Vật lý",
    time: "15:00 - 16:30",
    tutor: "Thầy Nam",
    status: "pause", 
  },
  {
    date: "2025-11-05",
    session: "Tối",
    shift: "Ca 5",
    subject: "Ngữ văn",
    time: "19:00 - 20:30",
    tutor: "Cô Hậu",
  },
];


export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentDate);
    d.setDate(currentDate.getDate() - currentDate.getDay() + 1 + i);
    return d;
  });

  const go = (days) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d);
  };

  return (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2>Lịch học</h2>

      <div className={styles.controls}>
        <button onClick={() => go(-7)}><FiChevronLeft /></button>
        <button onClick={() => setCurrentDate(new Date())} className={styles.today}>Hôm nay</button>
        <button onClick={() => go(7)}><FiChevronRight /></button>

        <div className={styles.dateBox}>
          <FiCalendar />
          <input 
            type="date" 
            value={format(currentDate,"yyyy-MM-dd")}
            onChange={(e)=>setCurrentDate(new Date(e.target.value))}
          />
        </div>
      </div>
    </div>

    {/* ✅ WRAP GRID LỊCH HỌC */}
    <div className={styles.calendar}>
      
      {/* Header */}
      <div className={styles.timeCol}>Ca học</div>
      {weekDays.map((d,i)=>(
        <div
          key={i}
          className={`${styles.dayHeader} ${
            format(d,"yyyy-MM-dd") === format(new Date(),"yyyy-MM-dd")
              ? styles.activeDay
              : ""
          }`}
        >
          Thứ {d.getDay()===0 ? "CN" : d.getDay()+1}
          <span>{format(d,"dd/MM")}</span>
        </div>
      ))}

      {/* Sáng */}
      <div className={styles.session}>Sáng</div>
      {weekDays.map((day,i)=>(
        <div key={i} className={styles.cell}>
          {scheduleData
            .filter(x=>x.date===format(day,"yyyy-MM-dd") && x.session==="Sáng")
            .map((x,i)=>(<EventCard key={i} data={x} />))
          }
        </div>
      ))}

      {/* Chiều */}
      <div className={styles.session}>Chiều</div>
      {weekDays.map((day,i)=>(
        <div key={i} className={styles.cell}>
          {scheduleData
            .filter(x=>x.date===format(day,"yyyy-MM-dd") && x.session==="Chiều")
            .map((x,i)=>(<EventCard key={i} data={x} />))
          }
        </div>
      ))}

      {/* Tối */}
      <div className={styles.session}>Tối</div>
      {weekDays.map((day,i)=>(
        <div key={i} className={styles.cell}>
          {scheduleData
            .filter(x=>x.date===format(day,"yyyy-MM-dd") && x.session==="Tối")
            .map((x,i)=>(<EventCard key={i} data={x} />))
          }
        </div>
      ))}
    </div>
  </div>
);

}
