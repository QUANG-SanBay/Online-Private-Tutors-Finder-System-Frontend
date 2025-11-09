import EBookCard from '~/components/e-Books-Card/E-Book-Card';
import styles from './E-BooksDB-Body.module.scss';
import img from '~/assets/imgs/img.jpg';

function EBooksDBBody() {
    // Mock data - will be replaced with API data later
    const ebooks = [
        {
            id: 1,
            cover: img,
            title: 'Toán học nâng cao lớp 12',
            author: 'PGS.TS Nguyễn Văn A',
            category: 'Toán học',
            description: 'Tài liệu bổ trợ chương trình toán nâng cao dành cho học sinh lớp 12'
        },
        {
            id: 2,
            cover: img,
            title: 'Tiếng Anh giao tiếp thực tế',
            author: 'MA. Trần Thị B',
            category: 'Tiếng Anh',
            description: '500 mẫu câu giao tiếp tiếng Anh thông dụng trong cuộc sống hàng ngày'
        },
        {
            id: 3,
            cover: img,
            title: 'Vật lý đại cương',
            author: 'TS. Lê Văn C',
            category: 'Vật lý',
            description: 'Kiến thức cơ bản về cơ học, nhiệt học và điện từ học'
        },
        {
            id: 4,
            cover: img,
            title: 'Hóa học hữu cơ căn bản',
            author: 'PGS. Phạm Thị D',
            category: 'Hóa học',
            description: 'Tổng hợp kiến thức hóa học hữu cơ từ cơ bản đến nâng cao'
        },
    ];

    return (
        <div className={styles.ebooksBody}>
            {ebooks.map((ebook) => (
                <EBookCard
                    key={ebook.id}
                    id={ebook.id}
                    cover={ebook.cover}
                    title={ebook.title}
                    author={ebook.author}
                    category={ebook.category}
                    description={ebook.description}
                />
            ))}
        </div>
    );
}

export default EBooksDBBody;
