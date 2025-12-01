import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faEdit, faSave, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Button from '~/components/button/Button';
import AvatarSection from './avataSection/AvatarSection';
import FormGroup from '~/components/formGroup/FormGroup';
import styles from './AdminProfile.module.scss';
import InforSection from './inforSection/InforSection';

function AdminProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
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
        }
        setAvatarPreview(null);
        setAvatarFile(null);
    };

    const handleSave = async () => {
        try {
            let updatedData = { ...editData };
            
            // Nếu có file mới, upload lên server
            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                
                // TODO: Gọi API upload
                // const response = await fetch('/api/upload-avatar', {
                //     method: 'POST',
                //     body: formData
                // });
                // const { avatarUrl } = await response.json();
                
                // Giả lập response (xóa dòng này khi có API thật)
                const avatarUrl = avatarPreview; // Tạm thời dùng blob URL
                
                updatedData.avatar = avatarUrl; // Lưu URL string từ server
            }
            
            // TODO: Gọi API cập nhật thông tin admin
            // await fetch('/api/admin/profile', {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updatedData)
            // });
            
            setAdminData(updatedData);
            setIsEditing(false);
            setAvatarFile(null);
            setAvatarPreview(null);
            setShowNotification(true);
        } catch (error) {
            //debug
            console.error('Error saving profile:', error);
            alert('Có lỗi xảy ra khi lưu thông tin!');
        }
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
            
            // Lưu file object để upload sau
            setAvatarFile(file);
            
            // Cleanup preview cũ
            if (avatarPreview && typeof avatarPreview === 'string' && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }
            
            // Tạo preview URL mới
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
                    <AvatarSection
                        onChange={handleChange}
                        onClick={handleAvatarClick}
                        fileInputRef={fileInputRef}
                        avatarPreview={avatarPreview}
                        adminData={adminData}
                        isEditing={isEditing}
                        editData={editData}
                    /> 

                    <InforSection
                        adminData={adminData}
                        isEditing={isEditing}
                        editData={editData}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
