import { useState, forwardRef } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";
import "./new.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const New = ({ inputs }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const title = t("create_user");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate("/");
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "sn1o0d0l");
    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/upload`,
        data
      );

      const { url } = uploadRes.data;
      // const url = "http://";
      const newUser = {
        ...info,
        img: url,
      };
      await axios.post(
        `${process.env.REACT_APP_BOOKING_API_SERVER}/auth/register`,
        newUser
      );
      setMessage(t("user_success"));
      setSeverity("success");
      setOpen(true);
    } catch (err) {
      setMessage(
        err.response.status === 500
          ? err.message
          : err.response.data.error.message
      );
      setSeverity("error");
      setOpen(true);
      console.log(err);
    }
  };

  // console.log("Info: ",info);
  return (
    <><Navbar />
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    {t("image")}{" "}
                    <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))}
                <button onClick={handleClick}>{t("send")}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default New;
