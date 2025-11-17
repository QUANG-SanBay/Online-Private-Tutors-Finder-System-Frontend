import React, { useState } from "react";
import styles from "~/components/Learner/profile/Profile.module.scss";
import avt from '~/assets/imgs/img.jpg'


// ----- Profile Tab -----
function ProfileTab({ user, onSave }) {
  const [form, setForm] = useState({ ...user });
  const [editing, setEditing] = useState(false);

return (
    <div className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          {form.avatar ? (
            <img
              src={avt}
              className={styles.avatarImg}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {form.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )} 
        </div>

        <h2 className={styles.username}>{form.name}</h2>
      </div>

      {/* FORM */}
      <div className={styles.body}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Họ và tên</label>
            <input
              disabled={!editing}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label>Số điện thoại</label>
            <input
              disabled={!editing}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className={styles.fieldFull}>
            <label>Địa chỉ</label>
            <input
              disabled={!editing}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          {editing ? (
            <>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => {
                  setEditing(false);
                  setForm({ ...user });
                }}
              >
                Hủy
              </button>

              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => {
                  onSave(form);
                  setEditing(false);
                }}
              >
                Lưu thay đổi
              </button>
            </>
          ) : (
            <button
              className={`${styles.btns} ${styles.btnsPrimary}`}
              onClick={() => setEditing(true)}
            >
              Chỉnh sửa thông tin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;

