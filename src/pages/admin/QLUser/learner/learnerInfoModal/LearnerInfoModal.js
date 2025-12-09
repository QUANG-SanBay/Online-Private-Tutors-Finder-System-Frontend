import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FormGroup from '~/components/formGroup/FormGroup';
import Button from '~/components/button/Button';
import styles from './LearnerInfoModal.module.scss';

function LearnerInfoModal({ isOpen, onClose, onSave, learnerData = null }) {
    // const [formData, setFormData] = useState({
    //     id: '',
    //     fullName: '',
    //     email: '',
    //     phone: '',
    //     address: '',
    //     status: 'Active'
    // });
    
    // useEffect(() => {
    //     setFormData(learnerData);
    // }, [learnerData, isOpen]);
    
    // console.log('learnerData in Modal:', learnerData);
    // console.log('formData in Modal:', formData);
    // const resetForm = () => {
    //     setFormData({
    //         id: '',
    //         fullName: '',
    //         email: '',
    //         phone: '',
    //         address: '',
    //         status: 'Active'
    //     });
    // };

    // const locationOptions = [
    //     { value: '', label: 'Chọn tỉnh thành phố' },
    //     { value: 'Hà Nội', label: 'Hà Nội' },
    //     { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
    //     { value: 'Đà Nẵng', label: 'Đà Nẵng' },
    //     { value: 'Hải Phòng', label: 'Hải Phòng' },
    //     { value: 'Cần Thơ', label: 'Cần Thơ' }
    // ];

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     // Validation
    //     if (!formData.fullName.trim()) {
    //         alert('Vui lòng nhập họ và tên!');
    //         return;
    //     }
    //     if (!formData.email.trim()) {
    //         alert('Vui lòng nhập email!');
    //         return;
    //     }
    //     if (!formData.phone.trim()) {
    //         alert('Vui lòng nhập số điện thoại!');
    //         return;
    //     }

    //     onSave(formData);
    //     onClose();
    // };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Thông tin người học</h2>
                    <button className={styles.closeButton} onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <form className={styles.modalBody}>
                    <div className={styles.formGrid}>
                        <FormGroup
                            className={styles.inputField}
                            label="Họ và tên"
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Nhập họ và tên"
                            value={learnerData.fullName}
                            // onChange={handleChange}
                            disabled={true}
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email"
                            value={learnerData.email}
                            // onChange={handleChange}
                            disabled={true}
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Số điện thoại"
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            value={learnerData.phone}
                            // onChange={handleChange}
                            disabled={true}
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Địa chỉ"
                            type="text"
                            id="address"
                            name="address"
                            value={learnerData.address}
                            // onChange={handleChange}
                            // options={locationOptions}
                            disabled={true}
                        />
                    </div>

                    {/* <div className={styles.modalFooter}>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="primary">
                            {learnerData ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </div> */}
                </form>
            </div>
        </div>
    );
}

export default LearnerInfoModal;
