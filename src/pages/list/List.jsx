import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useTranslation } from "react-i18next";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import LocaleContext from "../../LocaleContext";
import * as rdrLocales from "react-date-range/dist/locale";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const List = () => {
  const { locale } = useContext(LocaleContext);
  const location = useLocation();
  const { t } = useTranslation();
  const [destination, setDestination] = useState(location.state.destination);
  const [city, setCity] = useState("");
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    // navigate("/hotels", { state: { city, dates, options } });
    setDestination(city);
    reFetch();
  };

  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_BOOKING_API_SERVER}/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }`
  );

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">{t("search")}</h1>
            <div className="lsItem">
              <label>{t("destination")}</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                placeholder={destination}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>{t("check-in")}</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                t("date_format")
              )} ${t("to")} ${format(
                dates[0].endDate,
                t("date_format")
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                  locale={locale === "es" ? rdrLocales.es : rdrLocales.enUS}
                />
              )}
            </div>
            <div className="lsItem">
              <label>{t("options")}</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {t("min_price")} <small>{t("per_night")}</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {t("max_price")} <small>{t("per_night")}</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {t("adults").replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {t("children").replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {t("rooms").replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>{t("search")}</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {console.log("Dates: ", dates)}
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
