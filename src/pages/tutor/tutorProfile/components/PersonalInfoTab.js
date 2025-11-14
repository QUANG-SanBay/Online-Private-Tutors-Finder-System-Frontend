import FormGroup from '~/components/formGroup/FormGroup';
import { 
    faUser, 
    faEnvelope, 
    faPhone, 
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import styles from './PersonalInfoTab.module.scss';

function PersonalInfoTab({ formData, isEditing, onChange }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Thông tin cá nhân</h2>
            <div className={styles.formGrid}>
                <FormGroup
                    label="Họ và tên"
                    icon={faUser}
                    name="fullName"
                    value={formData.fullName}
                    onChange={onChange}
                    disabled={!isEditing}
                    required
                />
                <FormGroup
                    label="Email"
                    icon={faEnvelope}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    disabled={!isEditing}
                    required
                />
                <FormGroup
                    label="Số điện thoại"
                    icon={faPhone}
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    disabled={!isEditing}
                    required
                />
                <FormGroup
                    label="Giới tính"
                    name="gender"
                    type="select"
                    value={formData.gender}
                    onChange={onChange}
                    disabled={!isEditing}
                    options={[
                        { value: 'Nam', label: 'Nam' },
                        { value: 'Nữ', label: 'Nữ' },
                        { value: 'Khác', label: 'Khác' }
                    ]}
                />
                <div className={styles.fullWidth}>
                    <FormGroup
                        label="Địa chỉ"
                        icon={faMapMarkerAlt}
                        name="address"
                        value={formData.address}
                        onChange={onChange}
                        disabled={!isEditing}
                    />
                </div>
            </div>
        </div>
    );
}

export default PersonalInfoTab;
