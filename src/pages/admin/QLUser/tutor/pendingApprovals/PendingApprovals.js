import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faFilePdf, faChevronLeft, faChevronRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/button/Button';
import FormGroup from '~/components/formGroup/FormGroup';
import styles from './PendingApprovals.module.scss';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Import sample PDF for demo
import samplePDF from '~/assets/pdf/testPDF.pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PendingApprovals() {
    const [pendingTutors, setPendingTutors] = useState([
        {
            index: '1',
            fullName: 'Nguyễn Thị Mai',
            gender: 'Nữ',
            email: 'nguyenthimai@email.com',
            phone: '0945678901',
            address: 'Hà Nội',
            subjects: ['Toán', 'Hóa'],
            currentLevel: 'Cử nhân',
            certifications: 'Chứng chỉ Sư phạm Toán',
            introduction: 'Tôi có 3 năm kinh nghiệm giảng dạy Toán và Hóa học cho học sinh THCS và THPT.',
            pricePerHour: '150000',
            university: 'ĐH Sư phạm Hà Nội',
            profileImage: null,
            proofDocument: samplePDF,
            submittedDate: '2024-11-20'
        },
        {
            index: '2',
            fullName: 'Trần Văn Nam',
            gender: 'Nam',
            email: 'tranvannam@email.com',
            phone: '0956789012',
            address: 'TP. Hồ Chí Minh',
            subjects: ['Tiếng Anh'],
            currentLevel: 'Thạc sĩ',
            certifications: 'IELTS 8.0, TESOL',
            introduction: 'Tôi có 5 năm kinh nghiệm giảng dạy tiếng Anh giao tiếp và luyện thi IELTS.',
            pricePerHour: '200000',
            university: 'ĐH Ngoại ngữ',
            profileImage: null,
            proofDocument: samplePDF,
            submittedDate: '2024-11-21'
        },
        {
            index: '3',
            fullName: 'Lê Thị Hương',
            gender: 'Nữ',
            email: 'lethihuong@email.com',
            phone: '0967890123',
            address: 'Đà Nẵng',
            subjects: ['Văn', 'Lịch Sử'],
            currentLevel: 'Cử nhân',
            certifications: '',
            introduction: 'Đam mê giảng dạy Văn học và Lịch sử, giúp học sinh hiểu sâu về văn hóa.',
            pricePerHour: '120000',
            university: 'ĐH Khoa học Xã hội và Nhân văn',
            profileImage: null,
            proofDocument: samplePDF,
            submittedDate: '2024-11-22'
        }
    ]);

    const [selectedTutor, setSelectedTutor] = useState(null);
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfError, setPdfError] = useState(null);

    const handleViewDetail = (tutor) => {
        setSelectedTutor(tutor);
        setPageNumber(1);
        setNumPages(null);
        setPdfError(null);
        setShowRejectForm(false);
        setRejectReason('');
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPdfError(null);
    };

    const onDocumentLoadError = (error) => {
        console.error('Error loading PDF:', error);
        setPdfError('Không thể tải file PDF. Vui lòng thử lại.');
    };

    const goToPrevPage = () => {
        setPageNumber(prev => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber(prev => Math.min(prev + 1, numPages));
    };

    const handleOpenInNewTab = () => {
        window.open(selectedTutor.certificatePdf, '_blank');
    };

    const handleApprove = () => {
        if (window.confirm(`Xác nhận phê duyệt hồ sơ của ${selectedTutor.name}?`)) {
            setPendingTutors(prev => prev.filter(t => t.index !== selectedTutor.index));
            alert('Đã phê duyệt hồ sơ thành công!');
            setSelectedTutor(null);
        }
    };

    const handleReject = () => {
        if (!rejectReason.trim()) {
            alert('Vui lòng nhập lý do từ chối!');
            return;
        }

        if (window.confirm(`Xác nhận từ chối hồ sơ của ${selectedTutor.name}?`)) {
            setPendingTutors(prev => prev.filter(t => t.index !== selectedTutor.index));
            alert('Đã từ chối hồ sơ!');
            setSelectedTutor(null);
            setShowRejectForm(false);
            setRejectReason('');
        }
    };

    const closeDetailModal = () => {
        setSelectedTutor(null);
        setShowRejectForm(false);
        setRejectReason('');
        setPageNumber(1);
        setNumPages(null);
        setPdfError(null);
    };

    return (
        <div className={styles.pendingApprovals}>
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>{pendingTutors.length}</div>
                    <div className={styles.statLabel}>Hồ sơ chờ duyệt</div>
                </div>
            </div>

            <div className={styles.listWrapper}>
                {pendingTutors.length > 0 ? (
                    <div className={styles.cardGrid}>
                        {pendingTutors.map((tutor) => (
                            <div key={tutor.index} className={styles.tutorCard}>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.tutorName}>{tutor.fullName}</h3>
                                    <span className={styles.tutorId}>STT: {tutor.index}</span>
                                </div>
                                <div className={styles.cardBody}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Email:</span>
                                        <span className={styles.infoValue}>{tutor.email}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Số điện thoại:</span>
                                        <span className={styles.infoValue}>{tutor.phone}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Môn dạy:</span>
                                        <span className={styles.infoValue}>{tutor.subjects.join(', ')}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Trình độ:</span>
                                        <span className={styles.infoValue}>{tutor.currentLevel}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Ngày tạo hồ sơ:</span>
                                        <span className={styles.infoValue}>{tutor.submittedDate}</span>
                                    </div>
                                </div>
                                <div className={styles.cardFooter}>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleViewDetail(tutor)}
                                        fullWidth
                                    >
                                        Xem chi tiết & Duyệt
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noData}>
                        <FontAwesomeIcon icon={faCheckCircle} className={styles.noDataIcon} />
                        <p>Không có hồ sơ nào chờ phê duyệt</p>
                    </div>
                )}
            </div>

            {selectedTutor && (
                <div className={styles.modalOverlay} onClick={closeDetailModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Phê duyệt Hồ sơ Gia sư</h2>
                            <button className={styles.closeButton} onClick={closeDetailModal}>
                                ×
                            </button>
                        </div>
                        
                        <div className={styles.modalBody}>
                            <div className={styles.approvalLayout}>
                                {/* Left side - PDF Certificate */}
                                <div className={styles.certificatesSection}>
                                    <h3 className={styles.sectionTitle}>
                                        <FontAwesomeIcon icon={faFilePdf} /> Bằng cấp & Chứng chỉ (PDF)
                                    </h3>
                                    <div className={styles.pdfViewer}>
                                        {pdfError ? (
                                            <div className={styles.pdfError}>
                                                <FontAwesomeIcon icon={faFilePdf} className={styles.errorIcon} />
                                                <p>{pdfError}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className={styles.pdfContainer}>
                                                    <Document
                                                        file={selectedTutor.proofDocument}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                        onLoadError={onDocumentLoadError}
                                                        loading={
                                                            <div className={styles.pdfLoading}>
                                                                <div className={styles.spinner}></div>
                                                                <p>Đang tải PDF...</p>
                                                            </div>
                                                        }
                                                    >
                                                        <Page
                                                            pageNumber={pageNumber}
                                                            width={500}
                                                            renderTextLayer={true}
                                                            renderAnnotationLayer={true}
                                                        />
                                                    </Document>
                                                </div>
                                                <div className={styles.pdfControls}>
                                                    <button
                                                        onClick={handleOpenInNewTab}
                                                        className={styles.actionButton}
                                                        title="Mở ở tab mới"
                                                    >
                                                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                                                        Mở tab mới
                                                    </button>
                                                </div>
                                                {numPages && numPages > 1 && (
                                                    <div className={styles.pdfNavigation}>
                                                        <button
                                                            onClick={goToPrevPage}
                                                            disabled={pageNumber <= 1}
                                                            className={styles.navButton}
                                                        >
                                                            <FontAwesomeIcon icon={faChevronLeft} />
                                                        </button>
                                                        <span className={styles.pageCounter}>
                                                            Trang {pageNumber} / {numPages}
                                                        </span>
                                                        <button
                                                            onClick={goToNextPage}
                                                            disabled={pageNumber >= numPages}
                                                            className={styles.navButton}
                                                        >
                                                            <FontAwesomeIcon icon={faChevronRight} />
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Right side - Information */}
                                <div className={styles.infoSection}>
                                    <h3 className={styles.sectionTitle}>Thông tin khai báo</h3>
                                    <div className={styles.detailsList}>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>STT:</span>
                                            <span className={styles.detailValue}>{selectedTutor.index}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Họ và Tên:</span>
                                            <span className={styles.detailValue}>{selectedTutor.fullName}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Giới tính:</span>
                                            <span className={styles.detailValue}>{selectedTutor.gender}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Email:</span>
                                            <span className={styles.detailValue}>{selectedTutor.email}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Số điện thoại:</span>
                                            <span className={styles.detailValue}>{selectedTutor.phone}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Địa chỉ:</span>
                                            <span className={styles.detailValue}>{selectedTutor.address}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Môn dạy:</span>
                                            <span className={styles.detailValue}>{selectedTutor.subjects.join(', ')}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Trình độ:</span>
                                            <span className={styles.detailValue}>{selectedTutor.currentLevel}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Trường đào tạo:</span>
                                            <span className={styles.detailValue}>{selectedTutor.university}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Chứng chỉ:</span>
                                            <span className={styles.detailValue}>{selectedTutor.certifications || 'Không có'}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Học phí (VND/giờ):</span>
                                            <span className={styles.detailValue}>{parseInt(selectedTutor.pricePerHour).toLocaleString('vi-VN')}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Giới thiệu:</span>
                                            <span className={styles.detailValue}>{selectedTutor.introduction}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Ngày tạo hồ sơ:</span>
                                            <span className={styles.detailValue}>{selectedTutor.submittedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reject form */}
                            {showRejectForm && (
                                <div className={styles.rejectForm}>
                                    <FormGroup
                                        label="Lý do từ chối"
                                        name="rejectReason"
                                        type="textarea"
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Nhập lý do từ chối hồ sơ..."
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.modalFooter}>
                            {!showRejectForm ? (
                                <>
                                    <Button
                                        variant="primary"
                                        onClick={handleApprove}
                                        className={styles.approveButton}
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} /> Phê duyệt
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => setShowRejectForm(true)}
                                        className={styles.rejectButton}
                                    >
                                        <FontAwesomeIcon icon={faTimesCircle} /> Từ chối
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="danger" onClick={handleReject}>
                                        Xác nhận từ chối
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowRejectForm(false)}>
                                        Hủy
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PendingApprovals;
