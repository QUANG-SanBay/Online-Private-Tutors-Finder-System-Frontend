// format yyyy-mm-dd
export function formatYMD(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function weekdayIndex(dayLabel) {
  return {
    "Thứ 2": 1,
    "Thứ 3": 2,
    "Thứ 4": 3,
    "Thứ 5": 4,
    "Thứ 6": 5,
    "Thứ 7": 6,
  }[dayLabel];
}

export function findNextDateOfWeekday(weekday, fromDate = new Date()) {
  const d = new Date(fromDate);
  const diff = (weekday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
}

// ❗ Học thử → Lấy ngày gần nhất theo thứ
export function generateTrialSchedule(slotId) {
  const [dayLabel, slotKey] = slotId.split("-");
  const dayIdx = weekdayIndex(dayLabel);
  const next = findNextDateOfWeekday(dayIdx);
  return [
    {
      date: formatYMD(next),
      day: dayLabel,
      slotKey,
    },
  ];
}

// ❗ Học chính thức → Lặp lịch 3 tháng
export function generateOfficialSchedule(selectedSlots) {
  const start = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + 3);

  const map = {};
  selectedSlots.forEach((s) => {
    const [day, slotKey] = s.split("-");
    map[day] = map[day] || [];
    map[day].push(slotKey);
  });

  const result = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const dow = cursor.getDay();
    const dayLabel = dow >= 1 && dow <= 6 ? `Thứ ${dow}` : null;

    if (dayLabel && map[dayLabel]) {
      map[dayLabel].forEach((slotKey) => {
        result.push({
          date: formatYMD(cursor),
          day: dayLabel,
          slotKey,
        });
      });
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}
