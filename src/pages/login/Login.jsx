import axios from "axios";
import { useContext, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate("/");
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BOOKING_API_SERVER}/auth/login`,
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      setMessage(t("login_success"));
      setSeverity("success");
      setOpen(true);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setMessage(
        err.response.status === 500
          ? err.message
          : err.response.data.error.message
      );
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <><Navbar />
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            {t("login")}
          </button>
          {error && <span>{error.message}</span>}
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

export default Login;
