import React, { useEffect, useState } from "react";
import styles from "./TutorSchedule.module.scss";
import { format } from "date-fns";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import TutorEventCard from "~/components/schedule/TutorEventCard";
import AvailabilityModal from "./components/AvailabilityModal/AvailabilityModal";
import AvailabilityList from "./components/availabilityList/AvailabilityList";
import ConfirmDialog from "./components/confirmDialog/ConfirmDialog";
import ScheduleTabs from "./components/scheduleTabs/ScheduleTabs";

import HeaderPage from "~/components/headerPage/HeaderPage";
import { fetchAvailabilities, createAvailability, updateAvailability, deleteAvailability } from "~/api/services/tutorService";

const dayViToEnum = {
  "Thứ 2": "MONDAY",
  "Thứ 3": "TUESDAY",
  "Thứ 4": "WEDNESDAY",
  "Thứ 5": "THURSDAY",
  "Thứ 6": "FRIDAY",
  "Thứ 7": "SATURDAY",
  "Chủ nhật": "SUNDAY",
};

const enumToDayVi = {
  MONDAY: "Thứ 2",
  TUESDAY: "Thứ 3",
  WEDNESDAY: "Thứ 4",
  THURSDAY: "Thứ 5",
  FRIDAY: "Thứ 6",
  SATURDAY: "Thứ 7",
  SUNDAY: "Chủ nhật",
};

const statusLabel = { AVAILABLE: "Rảnh", CANCELLED: "Không rảnh", BOOKED: "Đã đặt" };

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

export default function TutorSchedule() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [editingAvailability, setEditingAvailability] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentDate);
    // Fix: Handle Sunday (0) by treating it as day 7
    const day = currentDate.getDay() || 7; // If Sunday (0), use 7
    d.setDate(currentDate.getDate() - day + 1 + i); // Monday is day 1
    return d;
  });

  const mapApiToUi = (list = []) => {
    const dedup = new Map();

    list.forEach((item) => {
      const timeRange = (item.timeRange || '').trim();
      const [rawStartR, rawEndR] = timeRange.split('-');
      const rawStart = rawStartR || item.startTime || '';
      const rawEnd = rawEndR || item.endTime || '';
      const isoToHm = (s) => (s.includes('T') ? s.split('T')[1].slice(0, 5) : s);
      const startTime = isoToHm(rawStart.trim());
      const endTime = isoToHm(rawEnd.trim());
      const id = item.availabilityId || item.id;
      const dayOfWeek = enumToDayVi[item.dayOfWeek] || item.dayOfWeek;
      const status = item.status || 'AVAILABLE';

      const key = `${id || ''}-${dayOfWeek}-${startTime}-${endTime}-${status}`;
      dedup.set(key, { id, dayOfWeek, startTime, endTime, status });
    });

    return Array.from(dedup.values());
  };

  const refreshAvailabilities = async () => {
    try {
      setLoadingAvailability(true);
      const list = await fetchAvailabilities();
      setAvailabilities(mapApiToUi(list || []));
    } catch (e) {
      console.error(e);
      alert('Tải lịch rảnh thất bại');
    } finally {
      setLoadingAvailability(false);
    }
  };

  useEffect(() => {
    refreshAvailabilities();
  }, []);

  const go = (days) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d);
  };

  const handleAddAvailability = () => {
    setEditingAvailability(null);
    setShowAvailabilityModal(true);
  };

  const handleEditAvailability = (index) => {
    setEditingAvailability({ ...availabilities[index], index });
    setShowAvailabilityModal(true);
  };

  const handleDeleteAvailability = (index) => {
    setDeletingIndex(index);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    const performDelete = async () => {
      if (deletingIndex !== null) {
        const id = availabilities[deletingIndex]?.id;
        try {
          if (id) {
            await deleteAvailability(id);
          }
          await refreshAvailabilities();
        } catch (e) {
          console.error(e);
          alert('Xóa lịch rảnh thất bại');
        } finally {
          setDeletingIndex(null);
          setShowConfirmDialog(false);
        }
      }
    };

    performDelete();
  };

  const handleSaveAvailability = async (data) => {
    const payload = {
      dayOfWeek: dayViToEnum[data.dayOfWeek] || data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.status || 'AVAILABLE',
    };

    try {
      if (editingAvailability?.id) {
        await updateAvailability(editingAvailability.id, payload);
      } else {
        await createAvailability(payload);
      }
      await refreshAvailabilities();
      setShowAvailabilityModal(false);
      setEditingAvailability(null);
    } catch (e) {
      console.error(e);
      alert('Lưu lịch rảnh thất bại');
    }
  };

  return (
    <div className={styles.tutorSchedule}>
      <div className={styles.container}>
        <HeaderPage title="Quản lý lịch dạy" />
        <ScheduleTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'availability' && (
          <AvailabilityList
            availabilities={availabilities}
            onAdd={handleAddAvailability}
            onEdit={handleEditAvailability}
            onDelete={handleDeleteAvailability}
          />
        )}

        {activeTab === 'schedule' && (
          <>
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
            className={`${styles.dayHeader} ${
              format(d, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
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
          </>
        )}

        <AvailabilityModal
          isOpen={showAvailabilityModal}
          onClose={() => {
            setShowAvailabilityModal(false);
            setEditingAvailability(null);
          }}
          onSave={handleSaveAvailability}
          editData={editingAvailability}
          existingAvailabilities={availabilities}
        />

        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={() => {
            setShowConfirmDialog(false);
            setDeletingIndex(null);
          }}
          onConfirm={confirmDelete}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa lịch rảnh này không?"
        />
      </div>
    </div>
  );
}