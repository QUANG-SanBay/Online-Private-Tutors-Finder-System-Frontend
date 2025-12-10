import { useEffect, useState } from 'react';
import { getActiveClasses } from '~/api/services/tutorService';
import CardItem from '../cardItem/CardItem';
import styles from './ListClasses.module.scss';

function ListClasses() {
  const [data, setData] = useState({ items: [], page: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (page = 0) => {
    try {
      setLoading(true);
      setError('');
      const result = await getActiveClasses(page, 5);
      setData({
        items: result.items || result.content || [],
        page: result.page,
        totalPages: result.totalPages,
      });
    } catch (e) {
      setError(e.response?.data?.message || `Lỗi tải danh sách lớp: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(0); }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  console.log('Active Classes Data:', data);
  return (
    <div className={styles.listClasses}>
      <div className={styles.ctn}>
        <div className={styles.header}>
          <h2 className={styles.title}>Danh sách lớp học đang dạy</h2>
        </div>
        <div className={styles.body}>
          {data.items.length === 0 ? (
            <div>Chưa có lớp đang dạy</div>
          ) : (
            data.items.map((c, idx) => (
              <CardItem
                key={idx}
                imgSrc={c.learnerAvatar || ''} // tùy theo field mapper trả về
                fullNameLearner={c.learnerName}
                address={c.learnerAddress}
                subject={c.subjectName}
                startDate={c.startDate}
                endDate={c.endDate}
                className={styles.cardItem}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ListClasses;