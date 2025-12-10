import FormGroup from "~/components/formGroup/FormGroup";
import { useState, useEffect, useRef } from "react";
import styles from './RegisterForm.module.scss';
import clsx from "clsx";

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        avatar: null,
        email: '',
        gender: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        subjects: [],
        currentLevel: '',
        certifications: '',
        introduction: '',
        tuition: '',
        proofFile: null
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    const addressOptions = [
        { value: '', label: 'Chọn tỉnh thành phố' },
        { value: 'hanoi', label: 'Hà Nội' },
        { value: 'hcm', label: 'TP. Hồ Chí Minh' },
        { value: 'danang', label: 'Đà Nẵng' },
        { value: 'haiphong', label: 'Hải Phòng' },
        { value: 'cantho', label: 'Cần Thơ' }
    ];

    const subjectOptions = [
        { value: 'toan', label: 'Toán' },
        { value: 'ly', label: 'Vật lý' },
        { value: 'hoa', label: 'Hóa học' },
        { value: 'sinh', label: 'Sinh học' },
        { value: 'van', label: 'Ngữ văn' },
        { value: 'anh', label: 'Tiếng Anh' },
        { value: 'su', label: 'Lịch sử' },
        { value: 'dia', label: 'Địa lý' }
    ];

    const levelOptions = [
        { value: '', label: 'Chọn trình độ' },
        { value: 'student', label: 'Sinh viên' },
        { value: 'bachelor', label: 'Cử nhân' },
        { value: 'master', label: 'Thạc sĩ' },
        { value: 'phd', label: 'Tiến sĩ' },
        { value: 'teacher', label: 'Giáo viên' }
    ];

    const genderOptions = [
        { value: '', label: 'Chọn giới tính' },
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' },
        { value: 'other', label: 'Khác' }
    ];

    const handleChange = (e) => {
        const { name, value, files, selectedOptions } = e.target;

        if (name === 'avatar') {
            const file = files?.[0] || null;
            setFormData(prev => ({ ...prev, [name]: file }));
            setAvatarPreview(prevUrl => {
                if (prevUrl) URL.revokeObjectURL(prevUrl);
                return file ? URL.createObjectURL(file) : null;
            });
            return;
        }

        if (name === 'subjects') {
            if (Array.isArray(value)) {
                // Trường hợp FormGroup multiple trả về mảng
                setFormData({ ...formData, subjects: value });
            } else if (selectedOptions) {
                // Trường hợp <select multiple> thuần
                const selected = Array.from(selectedOptions, (opt) => opt.value);
                setFormData({ ...formData, subjects: selected });
            } else {
                setFormData({ ...formData, subjects: value });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    return ( 
        <form className={styles.registerForm}>
            {/* Hàng đầu: trái là Họ tên + Giới tính, phải là ảnh chân dung */}
            <div className={styles.topRow}>
                <div className={styles.leftCol}>
                    <FormGroup
                        className={clsx(styles.fullName, styles.inputField)}
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
                        className={clsx(styles.gender, styles.inputField)}
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
                    <label htmlFor="avatar" className={styles.avatarLabel}>Ảnh chân dung <span style={{ color: 'red' }}>*</span></label>
                    <button
                        type="button"
                        className={styles.avatarBox}
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Chọn ảnh chân dung"
                    >
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Xem trước ảnh chân dung"
                                className={styles.avatarImg}
                            />
                        ) : (
                            <span className={styles.avatarPlaceholder}>Bấm để chọn ảnh</span>
                        )}
                    </button>
                    <input
                        ref={fileInputRef}
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className={styles.avatarInput}
                    />
                </div>
            </div>

            {/* Các trường còn lại */}
            <FormGroup
                className={clsx(styles.email, styles.inputField)}
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
                className={clsx(styles.phone, styles.inputField)}
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
                className={clsx(styles.password, styles.inputField)}
                label="Mật khẩu"
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <FormGroup
                className={clsx(styles.confirmPassword, styles.inputField)}
                label="Xác nhận mật khẩu"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <FormGroup
                className={clsx(styles.subjects, styles.inputField)}
                label="Môn muốn dạy"
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
                className={clsx(styles.address, styles.inputField)}
                label="Tỉnh thành phố"
                type="select"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                options={addressOptions}
                required
            />
            <FormGroup
                className={clsx(styles.currentLevel, styles.inputField)}
                label="Trình độ hiện tại"
                type="select"
                id="currentLevel"
                name="currentLevel"
                value={formData.currentLevel}
                onChange={handleChange}
                options={levelOptions}
                required
            />
            <FormGroup
                className={clsx(styles.certifications, styles.inputField)}
                label="Chứng chỉ (nếu có)"
                type="text"
                id="certifications"
                name="certifications"
                placeholder="Nhập chứng chỉ"
                value={formData.certifications}
                onChange={handleChange}
            />
            <FormGroup
                className={clsx(styles.introduction, styles.inputField)}
                label="Giới thiệu bản thân"
                type="textarea"
                id="introduction"
                name="introduction"
                placeholder="Giới thiệu bản thân ngắn gọn"
                value={formData.introduction}
                onChange={handleChange}
                required
            />
            <FormGroup
                className={clsx(styles.tuition, styles.inputField)}
                label="Học phí (VND/giờ)"
                type="number"
                id="tuition"
                name="tuition"
                placeholder="Nhập học phí"
                value={formData.tuition}
                onChange={handleChange}
                required
            />
            <FormGroup
                className={clsx(styles.proofFile, styles.inputField)}
                label="Giấy tờ chứng minh (nếu có)"
                type="file"
                id="proofFile"
                name="proofFile"
                placeholder="Chọn giấy tờ chứng minh"
                accept=".pdf"
                onChange={handleChange}
            />
            <button type="submit" className={styles.submitButton}>Đăng ký</button>
        </form>
    );
}

export default RegisterForm;