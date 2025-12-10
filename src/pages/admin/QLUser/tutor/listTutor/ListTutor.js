import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faEye, faSearch, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/button/Button';
import TutorInfoModal from '../tutorInfoModal/TutorInfoModal';
import styles from './ListTutor.module.scss';

function ListTutor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
    const [showTutorInfoModal, setShowTutorInfoModal] = useState(false);
    const [editingTutor, setEditingTutor] = useState(null);
    const [tutors, setTutors] = useState([
        {
            index: '1',
            fullName: 'Nguyễn Văn An',
            gender: 'Nam',
            subjects: ['Toán', 'Lý'],
            rating: 4.8,
            status: 'Active',
            email: 'nguyenvanan@email.com',
            phone: '0901234567',
            address: 'Hà Nội',
            currentLevel: 'Cử nhân',
            certifications: 'Chứng chỉ Sư phạm',
            introduction: 'Có 5 năm kinh nghiệm giảng dạy Toán và Lý',
            pricePerHour: '150000',
            university: 'ĐH Sư phạm Hà Nội',
            joinDate: '2024-01-15'
        },
        {
            index: '2',
            fullName: 'Trần Thị Bình',
            gender: 'Nữ',
            subjects: ['Tiếng Anh', 'Văn'],
            rating: 4.5,
            status: 'Active',
            email: 'tranthibinh@email.com',
            phone: '0912345678',
            address: 'TP. Hồ Chí Minh',
            currentLevel: 'Thạc sĩ',
            certifications: 'IELTS 7.5',
            introduction: 'Chuyên dạy Tiếng Anh giao tiếp và luyện thi',
            pricePerHour: '180000',
            university: 'ĐH Ngoại ngữ',
            joinDate: '2024-03-20'
        },
        {
            index: '3',
            fullName: 'Lê Văn Công',
            gender: 'Nam',
            subjects: ['Hóa', 'Sinh'],
            rating: 4.9,
            status: 'Locked',
            email: 'levancong@email.com',
            phone: '0923456789',
            address: 'Đà Nẵng',
            currentLevel: 'Cử nhân',
            certifications: '',
            introduction: 'Đam mê giảng dạy Hóa và Sinh học',
            pricePerHour: '140000',
            university: 'ĐH Khoa học Tự nhiên',
            joinDate: '2024-02-10'
        },
        {
            index: '4',
            fullName: 'Phạm Thị Dung',
            gender: 'Nữ',
            subjects: ['Toán', 'Tiếng Anh'],
            rating: 4.7,
            status: 'Active',
            email: 'phamthidung@email.com',
            phone: '0934567890',
            address: 'Hải Phòng',
            currentLevel: 'Sinh viên',
            certifications: 'TOEIC 850',
            introduction: 'Sinh viên năm cuối ngành Sư phạm Toán',
            pricePerHour: '120000',
            university: 'ĐH Sư phạm Kỹ thuật',
            joinDate: '2024-05-08'
        }
    ]);

    const [selectedTutor, setSelectedTutor] = useState(null);

    const handleLockToggle = (tutorindex) => {
        setTutors(prevTutors =>
            prevTutors.map(tutor =>
                tutor.index === tutorindex
                    ? { ...tutor, status: tutor.status === 'Active' ? 'Locked' : 'Active' }
                    : tutor
            )
        );
    };

    // const handleAddTutor = () => {
    //     setEditingTutor(null);
    //     setShowTutorInfoModal(true);
    // };

    const handleViewDetail = () => {
        setShowTutorInfoModal(true);
    };

    // const handleSaveTutor = (tutorData) => {
    //     if (editingTutor) {
    //         // Update existing tutor
    //         setTutors(prevTutors =>
    //             prevTutors.map(tutor =>
    //                 tutor.index === editingTutor.index ? { ...tutorData, index: tutor.index, rating: tutor.rating } : tutor
    //             )
    //         );
    //         alert('Đã cập nhật thông tin gia sư!');
    //     } else {
    //         // Add new tutor
    //         const newTutor = {
    //             ...tutorData,
    //             index: `TUT${(tutors.length + 1).toString().padStart(3, '0')}`,
    //             rating: 0,
    //             joinDate: new Date().toISOString().split('T')[0]
    //         };
    //         setTutors(prevTutors => [...prevTutors, newTutor]);
    //         alert('Đã thêm gia sư mới!');
    //     }
    // };

    // const handleViewDetail = (tutor) => {
    //     setSelectedTutor(tutor);
    // };

    const closeDetailModal = () => {
        setSelectedTutor(null);
    };

    const filteredTutors = tutors.filter(tutor => {
        // Text search
        const matchesSearch = tutor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutor.index.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || tutor.status === statusFilter;
        
        // Date filter
        let matchesDate = true;
        if (dateFilter.from) {
            matchesDate = matchesDate && new Date(tutor.joinDate) >= new Date(dateFilter.from);
        }
        if (dateFilter.to) {
            matchesDate = matchesDate && new Date(tutor.joinDate) <= new Date(dateFilter.to);
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className={styles.listTutor}>
            <div className={styles.filterSection}>
                <div className={styles.topBar}>
                    <div className={styles.searchBar}>
                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, môn dạy,..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    {/* <Button variant="primary" onClick={handleAddTutor}>
                        <FontAwesomeIcon icon={faPlus} /> Thêm Gia sư
                    </Button> */}
                </div>
                
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Trạng thái:</label>
                        <select 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="all">Tất cả</option>
                            <option value="Active">Hoạt động</option>
                            <option value="Locked">Bị khóa</option>
                        </select>
                    </div>
                    
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Từ ngày:</label>
                        <input
                            type="date"
                            value={dateFilter.from}
                            onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                            className={styles.dateInput}
                        />
                    </div>
                    
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Đến ngày:</label>
                        <input
                            type="date"
                            value={dateFilter.to}
                            onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                            className={styles.dateInput}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và Tên</th>
                            <th>Môn Dạy</th>
                            <th>Đánh Giá</th>
                            <th>Ngày Tham Gia</th>
                            <th>Trạng Thái</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTutors.length > 0 ? (
                            filteredTutors.map((tutor) => (
                                <tr key={tutor.index}>
                                    <td>{tutor.index}</td>
                                    <td className={styles.nameCell}>{tutor.fullName}</td>
                                    <td>
                                        <div className={styles.subjects}>
                                            {tutor.subjects.map((subject, index) => (
                                                <span key={index} className={styles.subjectTag}>
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.rating}>
                                            ⭐ {tutor.rating.toFixed(1)}
                                        </span>
                                    </td>
                                    <td>{new Date(tutor.joinDate).toLocaleDateString('vi-VN')}</td>
                                    <td>
                                        <span
                                            className={`${styles.status} ${
                                                tutor.status === 'Active' ? styles.active : styles.locked
                                            }`}
                                        >
                                            {tutor.status === 'Active' ? 'Hoạt động' : 'Bị khóa'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.iconButton}
                                                onClick={() => handleViewDetail(tutor)}
                                                title="xem chi tiết"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>

                                            <button
                                                className={`${styles.iconButton} ${
                                                    tutor.status === 'Locked' ? styles.unlock : styles.lock
                                                }`}
                                                onClick={() => handleLockToggle(tutor.index)}
                                                title={tutor.status === 'Active' ? 'Khóa tài khoản' : 'Mở khóa'}
                                            >
                                                <FontAwesomeIcon
                                                    icon={tutor.status === 'Active' ? faLock : faUnlock}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.noData}>
                                    Không tìm thấy gia sư nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedTutor && (
                <div className={styles.modalOverlay} onClick={closeDetailModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Chi tiết Gia sư</h2>
                            <button className={styles.closeButton} onClick={closeDetailModal}>
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>index:</span>
                                <span className={styles.value}>{selectedTutor.index}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Họ và Tên:</span>
                                <span className={styles.value}>{selectedTutor.fullName}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Email:</span>
                                <span className={styles.value}>{selectedTutor.email}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Số điện thoại:</span>
                                <span className={styles.value}>{selectedTutor.phone}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Môn dạy:</span>
                                <span className={styles.value}>{selectedTutor.subjects.join(', ')}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Đánh giá:</span>
                                <span className={styles.value}>⭐ {selectedTutor.rating.toFixed(1)}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Trạng thái:</span>
                                <span
                                    className={`${styles.statusBadge} ${
                                        selectedTutor.status === 'Active' ? styles.active : styles.locked
                                    }`}
                                >
                                    {selectedTutor.status === 'Active' ? 'Hoạt động' : 'Bị khóa'}
                                </span>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <Button variant="outline" onClick={closeDetailModal}>
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <TutorInfoModal
                isOpen={showTutorInfoModal}
                onClose={() => setShowTutorInfoModal(false)}
                tutorData={editingTutor}
            />
        </div>
    );
}

export default ListTutor;
