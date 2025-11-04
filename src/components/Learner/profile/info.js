import React, { useState } from "react";
import styles from "~/components/Learner/profile/Profile.module.scss";


// ----- Profile Tab -----
function ProfileTab({ user, onSave }) {
  const [form, setForm] = useState({ ...user });
  const [editing, setEditing] = useState(false);

  return (
    <div className={styles['ld-card']}>
      <div className={styles['ld-profile-head']}>
        <div className={styles['avatar']}>{form.name?.charAt(0) || 'U'}</div>
        <div>
          <h2>{form.name}</h2>
          <p className={styles['muted']}>{form.email}</p>
        </div>
      </div>

      <div className={styles['ld-form']}>
        <label>Họ và tên</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={!editing} />

        <label>Số điện thoại</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!editing} />

        <label>Địa chỉ</label>
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} disabled={!editing} />

        <div className={styles['ld-actions']}>
          {editing ? (
            <>
              <button className={`${styles['btn']} ${styles['btn-secondary']}`} onClick={() => { setEditing(false); setForm({ ...user }); }}>Hủy</button>
              <button className={`${styles['btn']} ${styles['btn-primary']}`} onClick={() => { onSave(form); setEditing(false); }}>Lưu</button>
            </>
          ) : (
            <button className={`${styles['btn']} ${styles['btn-primary']}`} onClick={() => setEditing(true)}>Sửa thông tin</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;

