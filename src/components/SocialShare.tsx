import { Space } from 'antd';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { useTranslation } from "react-i18next";

const SocialShare = () => {
  const { t } = useTranslation();

  return (
    <Space className="flex items-center">
      <span>{t('Share with')}: </span>
      <FacebookShareButton
         url={window.location.href}
       >
        <FacebookIcon size={32} round={true}/>
      </FacebookShareButton>
      <TwitterShareButton
         url={window.location.href}
       >
        <TwitterIcon size={32} round={true}/>
      </TwitterShareButton>
    </Space>
  )
}

export default SocialShare;
