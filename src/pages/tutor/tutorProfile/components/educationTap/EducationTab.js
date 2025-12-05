import FormGroup from '~/components/formGroup/FormGroup';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import styles from './EducationTab.module.scss';

function EducationTab({ formData, tutorData, isEditing, onChange }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Học vấn & Chứng chỉ</h2>
            <div className={styles.formGrid}>
                <div className={styles.fullWidth}>
                    <FormGroup
                        label="Trường đại học"
                        icon={faGraduationCap}
                        name="university"
                        value={formData.university}
                        onChange={onChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className={styles.fullWidth}>
                    <FormGroup
                        label="Giới thiệu bản thân"
                        name="introduction"
                        type="textarea"
                        value={formData.introduction}
                        onChange={onChange}
                        disabled={!isEditing}
                        rows={5}
                    />
                </div>
                <FormGroup
                    label="Học phí (VNĐ/giờ)"
                    name="pricePerHour"
                    type="number"
                    value={formData.pricePerHour}
                    onChange={onChange}
                    disabled={!isEditing}
                />
            </div>

            <div className={styles.proofFile}>
                <h3>Chứng chỉ & Bằng cấp</h3>
                <ul>
                    {tutorData.proofFile && (
                        <li>{tutorData.proofFile}</li>
                    )}
                </ul>
                {isEditing && (
                    <FormGroup
                        label="Thêm chứng chỉ/Bằng cấp"
                        name="proofFile"
                        id="newProofFile"
                        accept='.pdf'
                        type='file'
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    );
}

export default EducationTab;
