import useFetch from "../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import "./featured.css";

const Featured = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_BOOKING_API_SERVER}/hotels/countByCity?cities=tandil,mar del plata,córdoba`
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://i0.wp.com/kilometros.com.ar/wp-content/uploads/2022/02/tandil-7.jpg?resize=860%2C450&ssl=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Tandil</h1>
              <h2>{data[0]} {t('properties')}</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://imgs-akamai.mnstatic.com/b5/8a/b58a47aa20f66d3a80b98a2edc74637a.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mar del Plata</h1>
              <h2>{data[1]} {t('properties')}</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Córdoba</h1>
              <h2>{data[2]} {t('properties')}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
