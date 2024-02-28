import { useTranslation } from "react-i18next";
import { Empty } from 'antd';
import { Link } from 'react-router-dom';

export function EmptyOrder() {
  const { t } = useTranslation();

  return (
    <Empty
      className="montserrat"
      image={'https://res.cloudinary.com/deefrqkiu/image/upload/v1708774310/Screenshot_1_poqhbs.png'}
      imageStyle={{ marginLeft: '50%', transform: 'translateX(-40%)' }}
      description={
        <span>
          {t('There are no items in your cart')}
        </span>
      }
    >
      <Link to="/store">{t('Shopping now')}!</Link>
    </Empty>
  );
}
