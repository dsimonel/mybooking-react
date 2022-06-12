import useFetch from "../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import "./featuredProperties.css";

function rating(x) {
  if (x < 9) return "cat_fabulous";
  else if (x >= 9 && x < 9.5) return "cat_fantastic";
  else return "cat_exceptional";
};

const FeaturedProperties = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_BOOKING_API_SERVER}/hotels?featured=true&limit=4`
  );

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city.replace(/^\w/, (c) => c.toUpperCase())}</span>
              <span className="fpPrice">
              {t('starting_from')} ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating.toFixed(1)}</button>
                  <span>{t(rating(item.rating))}</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
