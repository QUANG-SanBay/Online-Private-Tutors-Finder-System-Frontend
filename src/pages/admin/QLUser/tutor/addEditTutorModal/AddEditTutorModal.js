import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import FormGroup from '~/components/formGroup/FormGroup';
import Button from '~/components/button/Button';
import styles from './AddEditTutorModal.module.scss';

function AddEditTutorModal({ isOpen, onClose, onSave, tutorData = null }) {
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        subjects: [],
        currentLevel: '',
        certifications: '',
        introduction: '',
        pricePerHour: '',
        university: '',
        profileImage: null,
        status: 'Active'
    });

    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (tutorData) {
            // Edit mode
            setFormData(tutorData);
            if (tutorData.profileImage) {
                setAvatarPreview(tutorData.profileImage);
            }
        } else {
            // Add mode - reset form
            resetForm();
        }
    }, [tutorData, isOpen]);

    const resetForm = () => {
        setFormData({
            id: '',
            fullName: '',
            gender: '',
            email: '',
            phone: '',
            address: '',
            subjects: [],
            currentLevel: '',
            certifications: '',
            introduction: '',
            pricePerHour: '',
            university: '',
            profileImage: null,
            status: 'Active'
        });
        setAvatarPreview(null);
    };

    const locationOptions = [
        { value: '', label: 'Chọn tỉnh thành phố' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Hải Phòng', label: 'Hải Phòng' },
        { value: 'Cần Thơ', label: 'Cần Thơ' }
    ];

    const subjectOptions = [
        { value: 'Toán', label: 'Toán' },
        { value: 'Vật lý', label: 'Vật lý' },
        { value: 'Hóa học', label: 'Hóa học' },
        { value: 'Sinh học', label: 'Sinh học' },
        { value: 'Ngữ văn', label: 'Ngữ văn' },
        { value: 'Tiếng Anh', label: 'Tiếng Anh' },
        { value: 'Lịch sử', label: 'Lịch sử' },
        { value: 'Địa lý', label: 'Địa lý' }
    ];

    const levelOptions = [
        { value: '', label: 'Chọn trình độ' },
        { value: 'Sinh viên', label: 'Sinh viên' },
        { value: 'Cử nhân', label: 'Cử nhân' },
        { value: 'Thạc sĩ', label: 'Thạc sĩ' },
        { value: 'Tiến sĩ', label: 'Tiến sĩ' },
        { value: 'Giáo viên', label: 'Giáo viên' }
    ];

    const genderOptions = [
        { value: '', label: 'Chọn giới tính' },
        { value: 'Nam', label: 'Nam' },
        { value: 'Nữ', label: 'Nữ' },
        { value: 'Khác', label: 'Khác' }
    ];

    const handleChange = (e) => {
        const { name, value, files, selectedOptions } = e.target;

        if (name === 'profileImage') {
            const file = files?.[0] || null;
            setFormData(prev => ({ ...prev, [name]: file }));
            setAvatarPreview(prevUrl => {
                if (prevUrl && typeof prevUrl === 'string' && prevUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(prevUrl);
                }
                return file ? URL.createObjectURL(file) : null;
            });
            return;
        }

        if (name === 'subjects') {
            if (Array.isArray(value)) {
                setFormData({ ...formData, subjects: value });
            } else if (selectedOptions) {
                const selected = Array.from(selectedOptions, (opt) => opt.value);
                setFormData({ ...formData, subjects: selected });
            } else {
                setFormData({ ...formData, subjects: value });
            }
            return;
        }

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

    useEffect(() => {
        return () => {
            if (avatarPreview && typeof avatarPreview === 'string' && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{tutorData ? 'Chỉnh sửa Gia sư' : 'Thêm Gia sư mới'}</h2>
                    <button className={styles.closeButton} onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    <div className={styles.topRow}>
                        <div className={styles.leftCol}>
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
                                label="Giới tính"
                                type="select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={genderOptions}
                                required
                            />
                        </div>
                        <div className={styles.avatarCol}>
                            <label htmlFor="profileImage" className={styles.avatarLabel}>
                                Ảnh đại diện
                            </label>
                            <button
                                type="button"
                                className={styles.avatarBox}
                                onClick={() => fileInputRef.current?.click()}
                                aria-label="Chọn ảnh đại diện"
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Xem trước ảnh"
                                        className={styles.avatarImg}
                                    />
                                ) : (
                                    <div className={styles.avatarPlaceholder}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span>Chọn ảnh</span>
                                    </div>
                                )}
                            </button>
                            <input
                                ref={fileInputRef}
                                id="profileImage"
                                name="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                className={styles.avatarInput}
                            />
                        </div>
                    </div>

                    <div className={styles.formGrid}>
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
                        <FormGroup
                            className={styles.inputField}
                            label="Môn dạy"
                            type="select"
                            id="subjects"
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleChange}
                            options={subjectOptions}
                            multiple={true}
                            required
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Trình độ"
                            type="select"
                            id="currentLevel"
                            name="currentLevel"
                            value={formData.currentLevel}
                            onChange={handleChange}
                            options={levelOptions}
                            required
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Trường đào tạo"
                            type="text"
                            id="university"
                            name="university"
                            placeholder="Nhập tên trường"
                            value={formData.university}
                            onChange={handleChange}
                            required
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Chứng chỉ (nếu có)"
                            type="text"
                            id="certifications"
                            name="certifications"
                            placeholder="Nhập chứng chỉ"
                            value={formData.certifications}
                            onChange={handleChange}
                        />
                        <FormGroup
                            className={styles.inputField}
                            label="Học phí (VND/giờ)"
                            type="number"
                            id="pricePerHour"
                            name="pricePerHour"
                            placeholder="Nhập học phí"
                            value={formData.pricePerHour}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <FormGroup
                        className={styles.inputField}
                        label="Giới thiệu bản thân"
                        type="textarea"
                        id="introduction"
                        name="introduction"
                        placeholder="Giới thiệu ngắn gọn"
                        value={formData.introduction}
                        onChange={handleChange}
                        required
                    />

                    <div className={styles.modalFooter}>
                        <Button type="button" variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="primary">
                            {tutorData ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEditTutorModal;
