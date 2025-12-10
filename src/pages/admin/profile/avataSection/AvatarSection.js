import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './AvatarSection.module.scss';
// import { useRef, useState } from 'react';

function AvatarSection({onChange, onClick, fileInputRef, avatarPreview, adminData, isEditing, editData}) {
    console.log('AvatarSection render', adminData.avatar);
    return (
        <div className={styles.avatarSection}>
            <div
                className={clsx(styles.avatarContainer, { [styles.editable]: isEditing })}
                onClick={onClick}
            >
                {avatarPreview || adminData.avatar ? (
                    <img
                        src={avatarPreview || adminData.avatar}
                        alt="Admin Avatar"
                        className={styles.avatar}
                    />
                ) : (
                    <div className={styles.avatarPlaceholder}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                )}
                {isEditing && (
                    <div className={styles.avatarOverlay}>
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Thay đổi</span>
                    </div>
                )}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                name="avatar"
                onChange={onChange}
                className={styles.avatarInput}
            />
            <div className={styles.roleInfo}>
                <h2 className={styles.name}>{isEditing ? editData.fullName : adminData.fullName}</h2>
                <span className={styles.role}>{adminData.role}</span>
            </div>
        </div>
    );
}

export default AvatarSection;