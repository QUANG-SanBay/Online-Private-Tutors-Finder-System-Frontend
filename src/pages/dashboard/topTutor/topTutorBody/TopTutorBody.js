import TutorCard from './tutorCard/TutorCard';
import styles from './TopTutorBody.module.scss';
import img from '~/assets/imgs/img.jpg';

function TopTutorBody() {
    // Mock data - will be replaced with API data later
    const tutors = [
        {
            id: 1,
            image: img,
            isVerified: true,
            name: 'Nguyễn Văn An',
            subject: 'Toán học',
            rating: 4.9,
            reviewCount: 127,
            location: 'Hà Nội',
            price: '250.000đ/giờ'
        },
        {
            id: 2,
            image: img,
            isVerified: true,
            name: 'Trần Thị Bình',
            subject: 'Tiếng Anh',
            rating: 5.0,
            reviewCount: 98,
            location: 'TP. HCM',
            price: '300.000đ/giờ'
        },
        {
            id: 3,
            image: img,
            isVerified: true,
            name: 'Lê Hoàng Cường',
            subject: 'Vật lý',
            rating: 4.8,
            reviewCount: 156,
            location: 'Đà Nẵng',
            price: '280.000đ/giờ'
        },
        {
            id: 4,
            image: img,
            isVerified: true,
            name: 'Phạm Minh Đức',
            subject: 'Hóa học',
            rating: 4.9,
            reviewCount: 89,
            location: 'Hà Nội',
            price: '270.000đ/giờ'
        }
    ];

    return (
        <div className={styles.topTutorBody}>
            {tutors.map((tutor) => (
                <TutorCard
                    key={tutor.id}
                    id={tutor.id}
                    image={tutor.image}
                    isVerified={tutor.isVerified}
                    name={tutor.name}
                    subject={tutor.subject}
                    rating={tutor.rating}
                    reviewCount={tutor.reviewCount}
                    location={tutor.location}
                    price={tutor.price}
                />
            ))}
        </div>
    );
}

export default TopTutorBody;
