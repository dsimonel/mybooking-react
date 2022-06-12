import { useTranslation } from "react-i18next";
import "./mailList.css"

const MailList = () => {

  const { t } = useTranslation();

  return (
    <div className="mail">
      <h1 className="mailTitle">{t('mail_title')}</h1>
      <span className="mailDesc">{t('mail_desc')}</span>
      <div className="mailInputContainer">
        <input type="text" placeholder={t('your_mail') || ""} />
        <button>{t('subscribe')}</button>
      </div>
    </div>
  )
}

export default MailList