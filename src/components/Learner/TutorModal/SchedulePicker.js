import React from "react";
import "./TutorModal.scss";

export default function SchedulePicker({ busySlots = [], selected = [], onToggleSlot }) {
  const sessions = [
    {
      name: "Sáng",
      slots: [
        { id: "morning1", label: "08:00 - 09:30" },
        { id: "morning2", label: "09:30 - 11:00" },
      ],
    },
    {
      name: "Chiều",
      slots: [
        { id: "afternoon1", label: "14:00 - 15:30" },
        { id: "afternoon2", label: "15:30 - 17:00" },
      ],
    },
    {
      name: "Tối",
      slots: [
        { id: "evening1", label: "18:00 - 19:30" },
        { id: "evening2", label: "19:30 - 21:00" },
      ],
    },
  ];

  const weekDays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  return (
    <div className="tfm-schedule-grid">
      <div className="tfm-col-head">Ca / Ngày</div>

      {weekDays.map((d) => (
        <div key={d} className="tfm-day-head">{d}</div>
      ))}

      {sessions.map((session) => (
        <React.Fragment key={session.name}>
          <div className="tfm-session-cell">{session.name}</div>

          {weekDays.map((day) => (
            <div key={day + session.name} className="tfm-cell">

              {session.slots.map((slot) => {
                const slotId = `${day}-${slot.id}`;
                const isBusy = busySlots.includes(slotId);
                const isSelected = selected.includes(slotId);

                return (
                  <div
                    key={slotId}
                    className={[
                      "tfm-slot",
                      isBusy && "busy",
                      isSelected && "selected",
                    ].join(" ")}
                    onClick={() => {
                      if (!isBusy) onToggleSlot(slotId);
                    }}
                  >
                    <span className="tfm-slot-label">{slot.label}</span>
                  </div>
                );
              })}

            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
