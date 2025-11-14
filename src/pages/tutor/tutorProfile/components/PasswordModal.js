import { useState } from 'react';
import Modal from '~/components/modal/Modal';
import FormGroup from '~/components/formGroup/FormGroup';
import Button from '~/components/button/Button';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './PasswordModal.module.scss';

function PasswordModal({ isOpen, onClose }) {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordSubmit = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Mật khẩu mới không khớp!');
            return;
        }
        // TODO: Call API to change password
        alert('Đổi mật khẩu thành công!');
        onClose();
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleClose = () => {
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        onClose();
    };

    return (
        <div className={styles.passwordForm}>
            <div>
                <div >
                    <FormGroup
                        label="Mật khẩu hiện tại"
                        icon={faLock}
                        name="oldPassword"
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                    <FormGroup
                        label="Mật khẩu mới"
                        icon={faLock}
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                    <FormGroup
                        label="Xác nhận mật khẩu mới"
                        icon={faLock}
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                    <div className={styles.modalActions}>
                        <Button
                            variant="primary"
                            onClick={handlePasswordSubmit}
                        >
                            Đổi mật khẩu
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleClose}
                        >
                            Hủy
                        </Button>
                    </div>
                </div>
            </div>
            <Modal type={'blackBg'}></Modal>
        </div>
    );
}

export default PasswordModal;
