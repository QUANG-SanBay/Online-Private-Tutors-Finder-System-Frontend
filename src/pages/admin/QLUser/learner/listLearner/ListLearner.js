import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faKey, faSearch, faPlus, faEdit, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/button/Button';
import AddEditLearnerModal from '../addEditLearnerModal/AddEditLearnerModal';
import styles from './ListLearner.module.scss';

function ListLearner() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [editingLearner, setEditingLearner] = useState(null);
    const [learners, setLearners] = useState([
        {
            id: 'LRN001',
            fullName: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0901111111',
            address: 'Hà Nội',
            joinDate: '2024-01-15',
            status: 'Active'
        },
        {
            id: 'LRN002',
            fullName: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0902222222',
            address: 'TP. Hồ Chí Minh',
            joinDate: '2024-02-20',
            status: 'Active'
        },
        {
            id: 'LRN003',
            fullName: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0903333333',
            address: 'Đà Nẵng',
            joinDate: '2024-03-10',
            status: 'Locked'
        },
        {
            id: 'LRN004',
            fullName: 'Phạm Thị D',
            email: 'phamthid@email.com',
            phone: '0904444444',
            address: 'Hải Phòng',
            joinDate: '2024-04-05',
            status: 'Active'
        },
        {
            id: 'LRN005',
            fullName: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            phone: '0905555555',
            address: 'Cần Thơ',
            joinDate: '2024-05-12',
            status: 'Active'
        }
    ]);

    const [selectedLearner, setSelectedLearner] = useState(null);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

    const handleLockToggle = (learnerId) => {
        const learner = learners.find(l => l.id === learnerId);
        const action = learner.status === 'Active' ? 'khóa' : 'mở khóa';
        
        if (window.confirm(`Xác nhận ${action} tài khoản của ${learner.fullName}?`)) {
            setLearners(prevLearners =>
                prevLearners.map(learner =>
                    learner.id === learnerId
                        ? { ...learner, status: learner.status === 'Active' ? 'Locked' : 'Active' }
                        : learner
                )
            );
        }
    };

    const handleAddLearner = () => {
        setEditingLearner(null);
        setShowAddEditModal(true);
    };

    const handleEditLearner = (learner) => {
        setEditingLearner(learner);
        setShowAddEditModal(true);
    };

    const handleSaveLearner = (learnerData) => {
        if (editingLearner) {
            // Update existing learner
            setLearners(prevLearners =>
                prevLearners.map(learner =>
                    learner.id === editingLearner.id ? { ...learnerData, id: learner.id, joinDate: learner.joinDate } : learner
                )
            );
            alert('Đã cập nhật thông tin người học!');
        } else {
            // Add new learner
            const newLearner = {
                ...learnerData,
                id: `LRN${(learners.length + 1).toString().padStart(3, '0')}`,
                joinDate: new Date().toISOString().split('T')[0]
            };
            setLearners(prevLearners => [...prevLearners, newLearner]);
            alert('Đã thêm người học mới!');
        }
    };

    const handleResetPassword = (learner) => {
        setSelectedLearner(learner);
        setShowResetPasswordModal(true);
    };

    const confirmResetPassword = () => {
        alert(`Đã gửi email reset mật khẩu đến ${selectedLearner.email}`);
        setShowResetPasswordModal(false);
        setSelectedLearner(null);
    };

    const closeResetPasswordModal = () => {
        setShowResetPasswordModal(false);
        setSelectedLearner(null);
    };

    const filteredLearners = learners.filter(learner => {
        // Text search
        const matchesSearch = learner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            learner.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            learner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            learner.phone.includes(searchTerm);
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || learner.status === statusFilter;
        
        // Date filter
        let matchesDate = true;
        if (dateFilter.from) {
            matchesDate = matchesDate && new Date(learner.joinDate) >= new Date(dateFilter.from);
        }
        if (dateFilter.to) {
            matchesDate = matchesDate && new Date(learner.joinDate) <= new Date(dateFilter.to);
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className={styles.listLearner}>
            <div className={styles.filterSection}>
                <div className={styles.topBar}>
                    <div className={styles.searchBar}>
                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, ID, email hoặc số điện thoại..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <Button variant="primary" onClick={handleAddLearner}>
                        <FontAwesomeIcon icon={faPlus} /> Thêm Người học
                    </Button>
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

            <div className={styles.statsBar}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Tổng số:</span>
                    <span className={styles.statValue}>{learners.length}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Hoạt động:</span>
                    <span className={styles.statValue}>
                        {learners.filter(l => l.status === 'Active').length}
                    </span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Bị khóa:</span>
                    <span className={styles.statValue}>
                        {learners.filter(l => l.status === 'Locked').length}
                    </span>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Ngày tham gia</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLearners.length > 0 ? (
                            filteredLearners.map((learner) => (
                                <tr key={learner.id}>
                                    <td>{learner.id}</td>
                                    <td className={styles.nameCell}>{learner.fullName}</td>
                                    <td>
                                        <div className={styles.emailCell}>
                                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                                            {learner.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.phoneCell}>
                                            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                                            {learner.phone}
                                        </div>
                                    </td>
                                    <td>{learner.joinDate}</td>
                                    <td>
                                        <span
                                            className={`${styles.status} ${
                                                learner.status === 'Active' ? styles.active : styles.locked
                                            }`}
                                        >
                                            {learner.status === 'Active' ? 'Hoạt động' : 'Bị khóa'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.iconButton}
                                                onClick={() => handleEditLearner(learner)}
                                                title="Chỉnh sửa"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                className={`${styles.iconButton} ${styles.resetPassword}`}
                                                onClick={() => handleResetPassword(learner)}
                                                title="Reset mật khẩu"
                                            >
                                                <FontAwesomeIcon icon={faKey} />
                                            </button>
                                            <button
                                                className={`${styles.iconButton} ${
                                                    learner.status === 'Locked' ? styles.unlock : styles.lock
                                                }`}
                                                onClick={() => handleLockToggle(learner.id)}
                                                title={learner.status === 'Active' ? 'Khóa tài khoản' : 'Mở khóa'}
                                            >
                                                <FontAwesomeIcon
                                                    icon={learner.status === 'Active' ? faLock : faUnlock}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className={styles.noData}>
                                    Không tìm thấy người học nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Reset Password Modal */}
            {showResetPasswordModal && selectedLearner && (
                <div className={styles.modalOverlay} onClick={closeResetPasswordModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Reset Mật khẩu</h2>
                            <button className={styles.closeButton} onClick={closeResetPasswordModal}>
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.confirmMessage}>
                                <FontAwesomeIcon icon={faKey} className={styles.modalIcon} />
                                <p>
                                    Bạn có chắc chắn muốn reset mật khẩu cho người dùng{' '}
                                    <strong>{selectedLearner.fullName}</strong>?
                                </p>
                                <p className={styles.emailInfo}>
                                    Email reset sẽ được gửi đến: <strong>{selectedLearner.email}</strong>
                                </p>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <Button variant="primary" onClick={confirmResetPassword}>
                                Xác nhận Reset
                            </Button>
                            <Button variant="outline" onClick={closeResetPasswordModal}>
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <AddEditLearnerModal
                isOpen={showAddEditModal}
                onClose={() => setShowAddEditModal(false)}
                onSave={handleSaveLearner}
                learnerData={editingLearner}
            />
        </div>
    );
}

export default ListLearner;
