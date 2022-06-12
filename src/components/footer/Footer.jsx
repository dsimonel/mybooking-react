import { useTranslation } from "react-i18next";
import "./footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">{t("countries")}</li>
          <li className="fListItem">{t("regions")}</li>
          <li className="fListItem">{t("cities")}</li>
          <li className="fListItem">{t("districts")}</li>
          <li className="fListItem">{t("airports")}</li>
          <li className="fListItem">{t("hotels")}</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">{t("homes")}</li>
          <li className="fListItem">{t("apartments")}</li>
          <li className="fListItem">{t("resorts")}</li>
          <li className="fListItem">{t("villas")}</li>
          <li className="fListItem">{t("hostels")}</li>
          <li className="fListItem">{t("guest_houses")}</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">{t("unique_places")}</li>
          <li className="fListItem">{t("reviews")}</li>
          <li className="fListItem">{t("unpacked")}</li>
          <li className="fListItem">{t("travel_communities")}</li>
          <li className="fListItem">{t("deals")}</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">{t("car_rental")}</li>
          <li className="fListItem">{t("flight_finder")}</li>
          <li className="fListItem">{t("restaurant_reservations")}</li>
          <li className="fListItem">{t("travel_agents")}</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">{t("customer_service")}</li>
          <li className="fListItem">{t("partner_help")}</li>
          <li className="fListItem">{t("careers")}</li>
          <li className="fListItem">{t("sustainability")}</li>
          <li className="fListItem">{t("press_center")}</li>
          <li className="fListItem">{t("safety")}</li>
          <li className="fListItem">{t("investor_relations")}</li>
          <li className="fListItem">{t("terms")}</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2022 LungtaBooking.</div>
    </div>
  );
};

export default Footer;
