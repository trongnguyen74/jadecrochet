import { Button, Result } from 'antd';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'

const CheckoutSuccess = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
      <Result
        status="success"
        title={t('Successfully Purchased') + '!'}
        className="montserrat"
        extra={[
          <Button onClick={() => navigate('/store')} className="montserrat">{t('Buy Again')}</Button>,
        ]}
      />
    )
}

export default CheckoutSuccess
