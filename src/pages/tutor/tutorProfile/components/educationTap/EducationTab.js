import FormGroup from '~/components/formGroup/FormGroup';
import { faGraduationCap, faFileAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EducationTab.module.scss';

function EducationTab({
    formData,
    isEditing,
    onChange,
    certificates = [],
    onAddCertificate,
    onCertificateNameChange,
    onCertificateFileChange,
    onRemoveCertificate,
}) {
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
                <div className={styles.certList}>
                    {certificates.length === 0 && <p className={styles.empty}>Chưa có chứng chỉ</p>}
                    {certificates.map((cert, idx) => (
                        <div key={cert.id || idx} className={styles.certRow}>
                            <div className={styles.certInfo}>
                                <FormGroup
                                    label="Tên chứng chỉ"
                                    icon={faFileAlt}
                                    name={`certificate-${idx}`}
                                    value={cert.name}
                                    onChange={(e) => onCertificateNameChange(idx, e.target.value)}
                                    disabled={!isEditing}
                                    required
                                />
                                {cert.fileUrl && !cert.file && (
                                    <a
                                        href={cert.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.certLink}
                                    >
                                        Xem file hiện tại
                                    </a>
                                )}
                            </div>
                            {isEditing && (
                                <div className={styles.certActions}>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => onCertificateFileChange(idx, e.target.files?.[0] || null)}
                                        className={styles.fileInput}
                                    />
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => onRemoveCertificate(idx)}
                                        title="Xóa chứng chỉ"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {isEditing && (
                    <button type="button" className={styles.addCertBtn} onClick={onAddCertificate}>
                        <FontAwesomeIcon icon={faPlus} /> Thêm chứng chỉ
                    </button>
                )}
            </div>
        </div>
    );
}

export default EducationTab;
