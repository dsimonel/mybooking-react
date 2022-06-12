import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./searchItem.css";

function rating(x) {
  if (x < 9) return "cat_fabulous";
  else if (x >= 9 && x < 9.5) return "cat_fantastic";
  else return "cat_exceptional";
}

const SearchItem = ({ item }) => {
  const { t } = useTranslation();
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">
          {item.distance}
          {t("hotel_distance")}
        </span>
        <span className="siTaxiOp">{t("free_taxi")}</span>
        <span className="siSubtitle">{item.title}</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">{t("free_cancellation")}</span>
        <span className="siCancelOpSubtitle">{t("cancel_later")}</span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>{t(rating(item.rating))}</span>
            <button>{item.rating.toFixed(1)}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">{t("taxes-fees")}</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">{t("availability")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
