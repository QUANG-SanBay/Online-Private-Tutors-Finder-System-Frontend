import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FormGroup from '~/components/formGroup/FormGroup';
import Button from '~/components/button/Button';
import styles from './AddEditLearnerModal.module.scss';

function AddEditLearnerModal({ isOpen, onClose, onSave, learnerData = null }) {
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
    });

    useEffect(() => {
        if (learnerData) {
            // Edit mode
            setFormData(learnerData);
        } else {
            // Add mode - reset form
            resetForm();
        }
    }, [learnerData, isOpen]);

    const resetForm = () => {
        setFormData({
            id: '',
            fullName: '',
            email: '',
            phone: '',
            address: '',
            status: 'Active'
        });
    };

    const locationOptions = [
        { value: '', label: 'Chọn tỉnh thành phố' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Hải Phòng', label: 'Hải Phòng' },
        { value: 'Cần Thơ', label: 'Cần Thơ' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.fullName.trim()) {
            alert('Vui lòng nhập họ và tên!');
            return;
        }
        if (!formData.email.trim()) {
            alert('Vui lòng nhập email!');
            return;
        }
        if (!formData.phone.trim()) {
            alert('Vui lòng nhập số điện thoại!');
            return;
        }

        onSave(formData);
        onClose();
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{learnerData ? 'Chỉnh sửa Người học' : 'Thêm Người học mới'}</h2>
                    <button className={styles.closeButton} onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    <div className={styles.formGrid}>
                        <FormGroup
                            className={styles.inputField}
                            label="Họ và tên"
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Nhập họ và tên"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Số điện thoại"
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Địa chỉ"
                            type="select"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            options={locationOptions}
                            required
                        />
                    </div>

                    <div className={styles.modalFooter}>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="primary">
                            {learnerData ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEditLearnerModal;
