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
        proofFiles: ['Bằng Đại học Sư phạm', 'Chứng chỉ giảng dạy'],
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
                />

                <ProfileTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
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

            {/* <PasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            /> */}
        </div>
    );
}

export default TutorProfile;