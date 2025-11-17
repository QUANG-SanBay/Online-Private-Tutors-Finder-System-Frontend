import { useState } from 'react';
import { PageHeader, RequestFilters, RequestList, RejectModal } from './components';
import styles from './ParentRequest.module.scss';

// Mock data
const mockRequests = [
    {
        id: 1,
        learnerName: 'Nguyễn Văn A',
        learnerAge: 15,
        subject: 'Toán học',
        grade: 'Lớp 10',
        type: 'trial', // trial or official
        schedule: 'Thứ 2, 4, 6 - 19:00-20:30',
        startDate: '2025-11-20',
        duration: '3 tháng',
        price: '200,000đ/buổi',
        message: 'Con em cần ôn tập và nâng cao kiến thức toán học để chuẩn bị cho kỳ thi học kỳ.',
        status: 'pending', // pending, accepted, rejected
        createdAt: '2025-11-15'
    },
    {
        id: 2,
        learnerName: 'Trần Thị B',
        learnerAge: 17,
        subject: 'Toán nâng cao',
        grade: 'Lớp 12',
        type: 'official',
        schedule: 'Thứ 3, 5, 7 - 18:00-19:30',
        startDate: '2025-11-18',
        duration: '6 tháng',
        price: '250,000đ/buổi',
        message: 'Em muốn học thêm để thi đại học. Em cần tập trung vào phần giải tích và hình học không gian.',
        status: 'pending',
        createdAt: '2025-11-14'
    },
    {
        id: 3,
        learnerName: 'Lê Văn C',
        learnerAge: 14,
        subject: 'Toán học',
        grade: 'Lớp 9',
        type: 'trial',
        schedule: 'Thứ 2, 4 - 17:00-18:30',
        startDate: '2025-11-22',
        duration: '1 buổi',
        price: '150,000đ/buổi',
        message: 'Con em muốn học thử để xem có phù hợp không ạ.',
        status: 'pending',
        createdAt: '2025-11-16'
    },
    {
        id: 4,
        learnerName: 'Phạm Thị D',
        learnerAge: 16,
        subject: 'Toán học',
        grade: 'Lớp 11',
        type: 'official',
        schedule: 'Thứ 3, 6 - 19:00-20:30',
        startDate: '2025-11-25',
        duration: '4 tháng',
        price: '220,000đ/buổi',
        message: 'Em cần học thêm phần đại số và lượng giác.',
        status: 'accepted',
        createdAt: '2025-11-13'
    }
];

function ParentRequest() {
    const [requests, setRequests] = useState(mockRequests);
    const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected
    const [typeFilter, setTypeFilter] = useState('all'); // all, trial, official
    const [searchTerm, setSearchTerm] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectReason, setRejectReason] = useState('');

    const filteredRequests = requests.filter(req => {
        const matchStatus = filter === 'all' || req.status === filter;
        const matchType = typeFilter === 'all' || req.type === typeFilter;
        const matchSearch = req.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           req.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchType && matchSearch;
    });

    const handleAccept = (id) => {
        setRequests(prev => prev.map(req => 
            req.id === id ? { ...req, status: 'accepted' } : req
        ));
        // TODO: Call API to accept request
    };

    const handleReject = (request) => {
        setSelectedRequest(request);
        setShowRejectModal(true);
    };

    const confirmReject = () => {
        if (selectedRequest) {
            setRequests(prev => prev.map(req => 
                req.id === selectedRequest.id ? { ...req, status: 'rejected' } : req
            ));
            // TODO: Call API to reject request with reason
            setShowRejectModal(false);
            setRejectReason('');
            setSelectedRequest(null);
        }
    };

    const pendingCount = requests.filter(r => r.status === 'pending').length;

    return (
        <div className={styles.parentRequest}>
            <div className={styles.container}>
                <PageHeader pendingCount={pendingCount} />

                <RequestFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filter={filter}
                    onFilterChange={setFilter}
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                />

                <RequestList
                    requests={filteredRequests}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            </div>

            <RejectModal
                isOpen={showRejectModal}
                onClose={() => {
                    setShowRejectModal(false);
                    setRejectReason('');
                    setSelectedRequest(null);
                }}
                onConfirm={confirmReject}
                reason={rejectReason}
                onReasonChange={setRejectReason}
            />
        </div>
    );
}

export default ParentRequest;