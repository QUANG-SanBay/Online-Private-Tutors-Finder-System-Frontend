import { useState, useEffect } from 'react';
import ScheduleModal from './ScheduleModal';
import FormGroup from '~/components/formGroup/FormGroup';
import Button from '~/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './AvailabilityModal.module.scss';

function AvailabilityModal({ isOpen, onClose, onSave, editData, existingAvailabilities = [] }) {
    const [formData, setFormData] = useState({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        status: 'Available'
    });

    const [errors, setErrors] = useState({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        timeRange: ''
    });

    const daysOfWeek = [
        { value: 'Thứ 2', label: 'Thứ 2' },
        { value: 'Thứ 3', label: 'Thứ 3' },
        { value: 'Thứ 4', label: 'Thứ 4' },
        { value: 'Thứ 5', label: 'Thứ 5' },
        { value: 'Thứ 6', label: 'Thứ 6' },
        { value: 'Thứ 7', label: 'Thứ 7' },
        { value: 'Chủ nhật', label: 'Chủ nhật' }
    ];

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        } else {
            setFormData({
                dayOfWeek: '',
                startTime: '',
                endTime: '',
                status: 'Available'
            });
        }
        setErrors({
            dayOfWeek: '',
            startTime: '',
            endTime: '',
            timeRange: ''
        });
    }, [editData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Format time input (only allow HH:MM format)
        if (name === 'startTime' || name === 'endTime') {
            // Remove any non-numeric characters except colon
            let formatted = value.replace(/[^\d:]/g, '');
            
            // Auto-add colon after 2 digits
            if (formatted.length === 2 && !formatted.includes(':')) {
                formatted = formatted + ':';
            }
            
            // Limit to HH:MM format (5 characters)
            if (formatted.length > 5) {
                formatted = formatted.slice(0, 5);
            }
            
            setFormData(prev => ({
                ...prev,
                [name]: formatted
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
                timeRange: ''
            }));
        }
    };

    const checkTimeOverlap = (newStart, newEnd, existingStart, existingEnd) => {
        const [newStartH, newStartM] = newStart.split(':').map(Number);
        const [newEndH, newEndM] = newEnd.split(':').map(Number);
        const [existStartH, existStartM] = existingStart.split(':').map(Number);
        const [existEndH, existEndM] = existingEnd.split(':').map(Number);

        const newStartMin = newStartH * 60 + newStartM;
        const newEndMin = newEndH * 60 + newEndM;
        const existStartMin = existStartH * 60 + existStartM;
        const existEndMin = existEndH * 60 + existEndM;

        // Check if times overlap
        return (newStartMin < existEndMin && newEndMin > existStartMin);
    };

    const handleSubmit = () => {
        const newErrors = {
            dayOfWeek: '',
            startTime: '',
            endTime: '',
            timeRange: ''
        };

        let hasError = false;

        if (!formData.dayOfWeek) {
            newErrors.dayOfWeek = 'Vui lòng chọn thứ trong tuần';
            hasError = true;
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
        
        if (!formData.startTime) {
            newErrors.startTime = 'Vui lòng nhập thời gian bắt đầu';
            hasError = true;
        } else if (!timeRegex.test(formData.startTime)) {
            newErrors.startTime = 'Định dạng không hợp lệ (VD: 08:00)';
            hasError = true;
        }

        if (!formData.endTime) {
            newErrors.endTime = 'Vui lòng nhập thời gian kết thúc';
            hasError = true;
        } else if (!timeRegex.test(formData.endTime)) {
            newErrors.endTime = 'Định dạng không hợp lệ (VD: 17:30)';
            hasError = true;
        }

        // Compare times
        if (formData.startTime && formData.endTime && timeRegex.test(formData.startTime) && timeRegex.test(formData.endTime)) {
            const [startHour, startMin] = formData.startTime.split(':').map(Number);
            const [endHour, endMin] = formData.endTime.split(':').map(Number);
            const startMinutes = startHour * 60 + startMin;
            const endMinutes = endHour * 60 + endMin;
            
            if (startMinutes >= endMinutes) {
                newErrors.timeRange = 'Thời gian kết thúc phải sau thời gian bắt đầu';
                hasError = true;
            }
        }

        // Check for overlapping time slots on the same day
        if (!hasError && formData.dayOfWeek && formData.startTime && formData.endTime) {
            const currentIndex = editData?.index;
            const overlappingSlot = existingAvailabilities.find((slot, index) => {
                // Skip checking against itself when editing
                if (currentIndex !== undefined && index === currentIndex) {
                    return false;
                }
                
                // Check if same day and overlapping time
                if (slot.dayOfWeek === formData.dayOfWeek) {
                    return checkTimeOverlap(
                        formData.startTime,
                        formData.endTime,
                        slot.startTime,
                        slot.endTime
                    );
                }
                return false;
            });

            if (overlappingSlot) {
                newErrors.timeRange = `Trùng lịch với khung giờ ${overlappingSlot.startTime} - ${overlappingSlot.endTime}`;
                hasError = true;
            }
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        onSave(formData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({
            dayOfWeek: '',
            startTime: '',
            endTime: '',
            status: 'Available'
        });
        setErrors({
            dayOfWeek: '',
            startTime: '',
            endTime: '',
            timeRange: ''
        });
        onClose();
    };

    return (
        <ScheduleModal
            isOpen={isOpen}
            onClose={handleClose}
            title={editData ? "Chỉnh sửa lịch rảnh" : "Thêm lịch rảnh"}
        >
            <div className={styles.availabilityForm}>
                <FormGroup
                    label="Thứ trong tuần"
                    icon={faCalendar}
                    name="dayOfWeek"
                    type="select"
                    value={formData.dayOfWeek}
                    onChange={handleChange}
                    options={daysOfWeek}
                    placeholder="Chọn thứ"
                    required
                />
                {errors.dayOfWeek && (
                    <div className={styles.errorMessage}>{errors.dayOfWeek}</div>
                )}

                <div className={styles.timeRow}>
                    <div className={styles.timeField}>
                        <FormGroup
                            label="Thời gian bắt đầu"
                            icon={faClock}
                            name="startTime"
                            type="text"
                            value={formData.startTime}
                            onChange={handleChange}
                            placeholder="VD: 08:00"
                            required
                        />
                        {errors.startTime && (
                            <div className={styles.errorMessage}>{errors.startTime}</div>
                        )}
                    </div>
                    <div className={styles.timeField}>
                        <FormGroup
                            label="Thời gian kết thúc"
                            icon={faClock}
                            name="endTime"
                            type="text"
                            value={formData.endTime}
                            onChange={handleChange}
                            placeholder="VD: 17:30"
                            required
                        />
                        {errors.endTime && (
                            <div className={styles.errorMessage}>{errors.endTime}</div>
                        )}
                    </div>
                </div>
                {errors.timeRange && (
                    <div className={styles.errorMessage}>{errors.timeRange}</div>
                )}

                <FormGroup
                    label="Trạng thái"
                    name="status"
                    type="select"
                    value={formData.status}
                    onChange={handleChange}
                    options={[
                        { value: 'Available', label: 'Rảnh' },
                        { value: 'Unavailable', label: 'Không rảnh' }
                    ]}
                />

                <div className={styles.modalActions}>
                    <Button variant="primary" onClick={handleSubmit}>
                        {editData ? 'Cập nhật' : 'Thêm lịch'}
                    </Button>
                    <Button variant="outline" onClick={handleClose}>
                        Hủy
                    </Button>
                </div>
            </div>
        </ScheduleModal>
    );
}

export default AvailabilityModal;
