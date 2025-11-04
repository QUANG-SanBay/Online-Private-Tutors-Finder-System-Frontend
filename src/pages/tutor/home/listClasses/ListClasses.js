import CardItem from '../cardItem/CardItem';
import styles from './ListClasses.module.scss';
import img from '~/assets/imgs/img.jpg';

function ListClasses() {
    const classesData = [
        {
            imgSrc: img,
            fullNameLearner: 'Nguyễn Văn A',
            address: 'Hà Nội',
            subject: 'Toán học',
            startDate: '01/09/2023',
            endDate: '30/06/2024'
        }
        // Sample data for classesimgSrc, fullNameLearner, address, subject, startDate, endDate
    ];
    return ( 
        <div className={styles.listClasses}>
            <div className={styles.ctn}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Danh sách lớp học đang dạy</h2>
                </div>
                <div className={styles.body}>
                    <CardItem
                        imgSrc={classesData[0].imgSrc}
                        fullNameLearner={classesData[0].fullNameLearner}
                        address={classesData[0].address}
                        subject={classesData[0].subject}
                        startDate={classesData[0].startDate}
                        endDate={classesData[0].endDate}
                        className={styles.cardItem}
                    />
                    <CardItem
                        imgSrc={classesData[0].imgSrc}
                        fullNameLearner={classesData[0].fullNameLearner}
                        address={classesData[0].address}
                        subject={classesData[0].subject}
                        startDate={classesData[0].startDate}
                        endDate={classesData[0].endDate}
                        className={styles.cardItem}
                    />
                </div>
            </div>
        </div>
     );
}

export default ListClasses;