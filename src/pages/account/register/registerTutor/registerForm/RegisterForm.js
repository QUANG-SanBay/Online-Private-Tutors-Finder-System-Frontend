// src/pages/Register/RegisterForm.jsx

import FormGroup from "~/components/formGroup/FormGroup";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterForm.module.scss';
import clsx from "clsx";
import { registerTutor } from "~/api/services/authService";

function RegisterForm() {
    const navigate = useNavigate();
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
        university: '',
        introduction: '',
        tuition: '',
        certificateFiles: [null],
        certificateNames: ['']
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const fileInputRef = useRef(null);

    const addressOptions = [
        { value: '', label: 'Chọn tỉnh thành phố' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'TP.HCM', label: 'TP. Hồ Chí Minh' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Hải Phòng', label: 'Hải Phòng' },
        { value: 'Cần Thơ', label: 'Cần Thơ' }
    ];

    const subjectOptions = [
        { value: '1', label: 'Toán' },
        { value: '2', label: 'Vật lý' },
        { value: '3', label: 'Hóa học' },
        { value: '4', label: 'Sinh học' },
        { value: '5', label: 'Ngữ văn' },
        { value: '9', label: 'Tiếng Anh' },
        { value: '7', label: 'Lịch sử' },
        { value: '8', label: 'Địa lý' }
    ];

    const levelOptions = [
        { value: '', label: 'Chọn trình độ' },
        { value: 'Sinh viên', label: 'Sinh viên' },
        { value: 'BACHELOR', label: 'Cử nhân' },
        { value: 'Thạc sĩ', label: 'Thạc sĩ' },
        { value: 'Tiến sĩ', label: 'Tiến sĩ' },
        { value: 'Giáo viên', label: 'Giáo viên' }
    ];

    // ✅ Chỉ MALE và FEMALE
    const genderOptions = [
        { value: '', label: 'Chọn giới tính' },
        { value: 'MALE', label: 'Nam' },
        { value: 'FEMALE', label: 'Nữ' }
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

        if (name === 'certificateFiles') {
            const files = Array.from(e.target.files || []);
            setFormData(prev => ({ ...prev, certificateFiles: files }));
            return;
        }

        if (name === 'subjects') {
            if (selectedOptions) {
                const selected = Array.from(selectedOptions, (opt) => opt.value);
                setFormData({ ...formData, subjects: selected });
            } else {
                setFormData({ ...formData, subjects: value });
            }
            return;
        }

        const trimmedValue = typeof value === 'string' ? value.trim() : value;
        setFormData({ ...formData, [name]: trimmedValue });
    };

    const handleAddCertificate = () => {
        setFormData(prev => ({
            ...prev,
            certificateNames: [...prev.certificateNames, ''],
            certificateFiles: [...prev.certificateFiles, null]
        }));
    };

    const handleCertificateNameChange = (index, value) => {
        setFormData(prev => {
            const newNames = [...prev.certificateNames];
            newNames[index] = value;
            return { ...prev, certificateNames: newNames };
        });
    };

    const handleCertificateFileChange = (index, file) => {
        setFormData(prev => {
            const newFiles = [...prev.certificateFiles];
            newFiles[index] = file;
            return { ...prev, certificateFiles: newFiles };
        });
    };

    const handleRemoveCertificate = (index) => {
        setFormData(prev => ({
            ...prev,
            certificateNames: prev.certificateNames.filter((_, i) => i !== index),
            certificateFiles: prev.certificateFiles.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // ✅ Validation fullName
        if (!formData.fullName.trim()) {
            setError('Vui lòng nhập họ và tên');
            return;
        }

        if (formData.fullName.trim().length < 2 || formData.fullName.trim().length > 50) {
            setError('Họ và tên phải từ 2-50 ký tự');
            return;
        }

        // ✅ Validation email
        if (!formData.email.trim()) {
            setError('Vui lòng nhập email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setError('Email không hợp lệ');
            return;
        }

        // ✅ Validation password
        if (!formData.password) {
            setError('Vui lòng nhập mật khẩu');
            return;
        }

        if (formData.password.length < 6 || formData.password.length > 30) {
            setError('Mật khẩu phải từ 6-30 ký tự');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        // ✅ Validation gender
        if (!formData.gender) {
            setError('Vui lòng chọn giới tính');
            return;
        }

        // ✅ Validation phone
        if (!formData.phone.trim()) {
            setError('Vui lòng nhập số điện thoại');
            return;
        }

        if (!/^0[0-9]{9}$/.test(formData.phone)) {
            setError('Số điện thoại không hợp lệ (0 + 9 chữ số)');
            return;
        }

        // ✅ Validation avatar (bắt buộc)
        if (!formData.avatar) {
            setError('Vui lòng chọn ảnh chân dung');
            return;
        }

        if (!formData.avatar.type.startsWith('image/')) {
            setError('Avatar phải là file ảnh (JPG, PNG, ...)');
            return;
        }

        // ✅ Validation address
        if (!formData.address.trim()) {
            setError('Vui lòng chọn tỉnh thành phố');
            return;
        }

        // ✅ Validation subjects
        if (formData.subjects.length === 0) {
            setError('Vui lòng chọn ít nhất 1 môn dạy');
            return;
        }

        // ✅ Validation currentLevel
        if (!formData.currentLevel) {
            setError('Vui lòng chọn trình độ hiện tại');
            return;
        }

        // ✅ Validation university
        if (!formData.university.trim()) {
            setError('Vui lòng nhập trường đào tạo');
            return;
        }

        if (formData.university.trim().length > 100) {
            setError('Trường đào tạo không được vượt quá 100 ký tự');
            return;
        }

        // ✅ Validation introduction
        if (!formData.introduction.trim()) {
            setError('Vui lòng nhập giới thiệu bản thân');
            return;
        }

        if (formData.introduction.trim().length < 10) {
            setError('Giới thiệu bản thân phải có ít nhất 10 ký tự');
            return;
        }

        // ✅ Validation tuition
        if (!formData.tuition) {
            setError('Vui lòng nhập học phí');
            return;
        }

        const tuitionNum = parseInt(formData.tuition);
        if (tuitionNum < 50000 || tuitionNum > 1000000) {
            setError('Học phí phải từ 50,000 - 1,000,000 VND/giờ');
            return;
        }

        // ✅ Validation certificate files - Phải có cặp tên/file hợp lệ
        const certificatePairs = formData.certificateFiles
            .map((file, idx) => ({
                file,
                name: formData.certificateNames[idx] || ''
            }))
            .filter(cert => cert.file !== null || cert.name.trim() !== '');

        // Kiểm tra tất cả cặp phải đầy đủ (có tên và file)
        for (let cert of certificatePairs) {
            if (!cert.file || !cert.name.trim()) {
                setError('Mỗi chứng chỉ phải có cả tên và file PDF');
                return;
            }
            if (cert.file.type !== 'application/pdf') {
                setError('Tất cả file chứng chỉ phải là PDF');
                return;
            }
        }

        try {
            setLoading(true);
            setError(null);

            // 📋 Chuẩn bị dữ liệu gửi
            // ✅ Lưu ý: confirmPassword KHÔNG được gửi vào server
            // Server sẽ validate nó ở Frontend trước
            const submitData = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                password: formData.password,
                confirmPassword: formData.confirmPassword, // ✅ Giữ lại cho authService. js xử lý
                phoneNumber: formData.phone.trim(),
                gender: formData.gender,
                address: formData.address.trim(),
                university: formData.university.trim(),
                educationalLevel: formData.currentLevel,
                introduction: formData.introduction.trim(),
                pricePerHour: parseInt(formData.tuition),
                subjectIds: formData.subjects.map(s => parseInt(s)),
                avatarFile: formData.avatar || null,
                certificateFiles: certificatePairs.map(c => c.file),
                certificateNames: certificatePairs.map(c => c.name.trim())
            };

            console.log('📤 Submitting registration:', submitData);
            const response = await registerTutor(submitData);

            console.log('✅ Registration success:', response);
            setSuccess('✅ Đăng ký thành công!  Đang chuyển hướng.. .');
            setTimeout(() => navigate('/login'), 2000);

        } catch (err) {
            console.error('❌ Registration error:', err);
            const errorMsg = err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                'Đăng ký thất bại.  Vui lòng thử lại.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            {error && (
                <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#fee', borderRadius: '4px' }}>
                    ❌ {error}
                </div>
            )}

            {success && (
                <div style={{ color: 'green', marginBottom: '15px', padding: '10px', backgroundColor: '#efe', borderRadius: '4px' }}>
                    ✅ {success}
                </div>
            )}

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
                placeholder="Nhập số điện thoại (0xxxxxxxxx)"
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
                placeholder="Nhập mật khẩu (6-30 ký tự)"
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
                className={clsx(styles.university, styles.inputField)}
                label="Trường đào tạo"
                type="text"
                id="university"
                name="university"
                placeholder="Nhập trường đào tạo"
                value={formData.university}
                onChange={handleChange}
                required
            />

            <FormGroup
                className={clsx(styles.introduction, styles.inputField)}
                label="Giới thiệu bản thân"
                type="textarea"
                id="introduction"
                name="introduction"
                placeholder="Giới thiệu bản thân (tối thiểu 10 ký tự)"
                value={formData.introduction}
                onChange={handleChange}
                required
            />

            <FormGroup
                className={clsx(styles.tuition, styles.inputField)}
                label="Học phí (VND/giờ, 50,000 - 1,000,000)"
                type="number"
                id="tuition"
                name="tuition"
                placeholder="Nhập học phí"
                value={formData.tuition}
                onChange={handleChange}
                required
                min="50000"
                max="1000000"
            />

            <div className={clsx(styles.certificates, styles.inputField)}>
                <label>Chứng chỉ (nếu có)</label>

                {formData.certificateNames.map((name, idx) => (
                    <div key={idx} className={styles.certificateRow}>
                        <div className={styles.certificateInputGroup}>
                            <input
                                type="text"
                                placeholder="Nhập tên chứng chỉ"
                                value={name}
                                onChange={(e) => handleCertificateNameChange(idx, e.target.value)}
                                className={styles.certNameInput}
                            />
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleCertificateFileChange(idx, e.target.files?.[0] || null)}
                                className={styles.certFileInput}
                            />
                        </div>
                        {idx === formData.certificateNames.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleAddCertificate}
                                className={styles.addCertBtn}
                                title="Thêm chứng chỉ"
                            >
                                +
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleRemoveCertificate(idx)}
                                className={styles.removeCertBtn}
                                title="Xóa chứng chỉ"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}

            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
            >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
        </form>
    );
}

export default RegisterForm;