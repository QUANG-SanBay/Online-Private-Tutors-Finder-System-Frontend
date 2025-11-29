import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faEdit, faSave, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/button/Button';
import FormGroup from '~/components/formGroup/FormGroup';
import styles from './AdminProfile.module.scss';

function AdminProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const fileInputRef = useRef(null);

    const [adminData, setAdminData] = useState({
        id: 'ADM001',
        fullName: 'Nguyễn Văn Admin',
        email: 'admin@tutorfinder.com',
        phone: '0912345678',
        role: 'Quản trị viên',
        avatar: null,
        createdAt: '2024-01-01'
    });

    const [editData, setEditData] = useState({ ...adminData });

    const handleEdit = () => {
        setEditData({ ...adminData });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditData({ ...adminData });
        setIsEditing(false);
        if (avatarPreview && typeof avatarPreview === 'string' && avatarPreview.startsWith('blob:')) {
            URL.revokeObjectURL(avatarPreview);
            setAvatarPreview(null);
        }
    };

    const handleSave = () => {
        setAdminData({ ...editData });
        setIsEditing(false);
        setShowNotification(true);
    };

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'avatar' && files?.[0]) {
            const file = files[0];
            setEditData(prev => ({ ...prev, avatar: file }));

            if (avatarPreview && typeof avatarPreview === 'string' && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }
            setAvatarPreview(URL.createObjectURL(file));
            return;
        }

        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.adminProfile}>
                {showNotification && (
                    <div className={styles.notification}>
                        <FontAwesomeIcon icon={faCheckCircle} className={styles.notificationIcon} />
                        <span>Đã cập nhật thông tin thành công!</span>
                    </div>
                )}
                <div className={styles.header}>
                    <h1 className={styles.title}>Thông tin cá nhân</h1>
                    {!isEditing ? (
                        <Button variant="primary" onClick={handleEdit}>
                            <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                        </Button>
                    ) : (
                        <div className={styles.actions}>
                            <Button variant="primary" onClick={handleSave}>
                                <FontAwesomeIcon icon={faSave} /> Lưu
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <FontAwesomeIcon icon={faTimes} /> Hủy
                            </Button>
                        </div>
                    )}
                </div>

                <div className={styles.content}>
                    <div className={styles.avatarSection}>
                        <div
                            className={`${styles.avatarContainer} ${isEditing ? styles.editable : ''}`}
                            onClick={handleAvatarClick}
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
                            onChange={handleChange}
                            className={styles.avatarInput}
                        />
                        <div className={styles.roleInfo}>
                            <h2 className={styles.name}>{isEditing ? editData.fullName : adminData.fullName}</h2>
                            <span className={styles.role}>{adminData.role}</span>
                            <span className={styles.userId}>ID: {adminData.id}</span>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <h3 className={styles.sectionTitle}>Thông tin chi tiết</h3>

                        <div className={styles.formGrid}>
                            <FormGroup
                                className={styles.inputField}
                                label="Họ và tên"
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Nhập họ và tên"
                                value={isEditing ? editData.fullName : adminData.fullName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                            <FormGroup
                                className={styles.inputField}
                                label="Email"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Nhập email"
                                value={isEditing ? editData.email : adminData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                            <FormGroup
                                className={styles.inputField}
                                label="Số điện thoại"
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Nhập số điện thoại"
                                value={isEditing ? editData.phone : adminData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                required
                            />
                            <FormGroup
                                className={styles.inputField}
                                label="Vai trò"
                                type="text"
                                id="role"
                                name="role"
                                value={adminData.role}
                                disabled
                            />
                            <FormGroup
                                className={styles.inputField}
                                label="Ngày tạo tài khoản"
                                type="text"
                                id="createdAt"
                                name="createdAt"
                                value={new Date(adminData.createdAt).toLocaleDateString('vi-VN')}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
