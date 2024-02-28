import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

interface Props {
  child: string;
}

export function BreadcrumbString(props:Props) {
  const { child } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Breadcrumb
        className="montserrat mt-4"
        items={[
          {
            title: <Link to="/">{t('Home')}</Link>,
          },
          {
            title: t(child),
          }
        ]}
      />
    </div>
  );
}
