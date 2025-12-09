import { useState } from 'react';
import styles from './TutorProfile.module.scss';
import {
    ProfileHeader,
    ProfileTabs,
    PersonalInfoTab,
    EducationTab,
    SubjectsTab,
    PasswordModal
} from './components';

function TutorProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [activeTab, setActiveTab] = useState('info'); // 'info', 'education', 'subjects'
    
    // Mock tutor data
    const [tutorData, setTutorData] = useState({
        id: 1,
        fullName: 'Nguyễn Văn An',
        email: 'nguyenvanan@gmail.com',
        phone: '0901234567',
        gender: 'Nam',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        university: 'Đại học Sư phạm TP.HCM',
        introduction: 'Tôi là giáo viên Toán với 5 năm kinh nghiệm giảng dạy. Đam mê giúp học sinh hiểu sâu kiến thức và đạt kết quả cao.',
        pricePerHour: 250000,
        verificationStatus: 'Approved',
        rating: 4.9,
        totalReviews: 127,
        proofFile: 'BangTotNghiep.pdf',
        avatarUrl: '', // Empty for default icon display
    });

    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Toán học', grade: 'Lớp 10-12' },
        { id: 2, name: 'Toán nâng cao', grade: 'Lớp 11-12' },
    ]);

    const [availability, setAvailability] = useState([
        { dayOfWeek: 'Thứ 2', startTime: '08:00', endTime: '17:00', status: 'Available' },
        { dayOfWeek: 'Thứ 3', startTime: '08:00', endTime: '17:00', status: 'Available' },
        { dayOfWeek: 'Thứ 4', startTime: '08:00', endTime: '17:00', status: 'Available' },
    ]);

    const [formData, setFormData] = useState({ ...tutorData });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: e.target.files[0] ? e.target.files[0].name : ''
            }));
            return;
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setTutorData(formData);
        setIsEditing(false);
        // TODO: Call API to update profile
    };

    const handleCancel = () => {
        setFormData({ ...tutorData });
        setIsEditing(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('Vui lòng chọn file ảnh (JPG, PNG, GIF)');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước ảnh không được vượt quá 5MB');
                return;
            }

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    avatarUrl: reader.result
                }));
                setTutorData(prev => ({
                    ...prev,
                    avatarUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
            // TODO: Upload to server and get URL
        }
    };
    return (
        <div className={styles.tutorProfile}>
            <div className={styles.container}>
                <ProfileHeader
                    tutorData={tutorData}
                    isEditing={isEditing}
                    onEditClick={() => setIsEditing(true)}
                    onSaveClick={handleSave}
                    onCancelClick={handleCancel}
                    onPasswordClick={() => setShowPasswordModal(true)}
                    onAvatarChange={handleAvatarChange}
                />

                <ProfileTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    isEditing={isEditing}
                />

                <div className={styles.tabContent}>
                    {activeTab === 'info' && (
                        <PersonalInfoTab
                            formData={formData}
                            isEditing={isEditing}
                            onChange={handleInputChange}
                        />
                    )}

                    {activeTab === 'education' && (
                        <EducationTab
                            formData={formData}
                            tutorData={tutorData}
                            isEditing={isEditing}
                            onChange={handleInputChange}
                        />
                    )}

                    {activeTab === 'subjects' && (
                        <SubjectsTab
                            subjects={subjects}
                            availability={availability}
                        />
                    )}
                </div>
            </div>

            <PasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    );
}

export default TutorProfile;