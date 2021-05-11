import { useState, useEffect } from "react";
import { login } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ErrorToast from "../components/ErrorToast";
import { ADMIN_LOGIN_RESET } from "../constants/adminConstants";
import Meta from "../components/Meta";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    let emailErr = "";
    let passwordErr = "";

    if (!email) {
      emailErr = "Email cannot be empty";
    }
    if (!password) {
      passwordErr = "Password cannot be empty";
    }

    if (emailErr && passwordErr) {
      setEmailErr(emailErr);
      setPasswordErr(passwordErr);
      return false;
    }

    return true;
  };

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      history.push("/");
    }
    if (error) {
      setTimeout(() => {
        dispatch({ type: ADMIN_LOGIN_RESET });
      }, 2000);
    }
  }, [adminInfo, history, dispatch, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      setPassword("");
    }

    dispatch(login(email, password));
  };

  return (
    <>
      <Meta title="Sign In - Picxls" />
      {error && <ErrorToast message={error.message} />}
      <div className="d-flex flex-column flex-root">
        <div
          className="d-flex flex-column flex-lg-row flex-column-fluid"
          id="kt_login"
        >
          <div className="d-flex flex-column flex-lg-row-auto bg-primary w-lg-600px pt-15 pt-lg-0">
            <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15 text-center">
              <img
                className="logo-width"
                src="../assets/media/picxls-logo.png"
              />
              <br />
              <h3 className="fw-bolder fs-2x text-white lh-lg">
                Discover Start
                <br />
                with great build tools
              </h3>
            </div>
            <div
              className="d-flex flex-row-fluid bgi-size-contain bgi-no-repeat bgi-position-y-bottom bgi-position-x-center min-h-350px"
              style={{
                backgroundImage:
                  "url(../assets/media/svg/illustrations/login-1.svg)",
              }}
            ></div>
          </div>
          <div className="login-content flex-lg-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden py-20 px-10 p-lg-7 mx-auto mw-450px w-100">
            <div className="d-flex flex-column-fluid flex-center py-10">
              <form
                onSubmit={handleSubmit}
                className="form w-100"
                novalidate="novalidate"
              >
                <div class="pb-5 pb-lg-15">
                  <h3 class="fw-bolder text-dark display-6">
                    Welcome to Picxls
                  </h3>
                </div>
                <div className="fv-row mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Email
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="username"
                    autocomplete="off"
                    value={email}
                  />
                  <span className="error-msg">{emailErr}</span>
                </div>
                <div className="fv-row mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark pt-5">
                    Password
                  </label>
                  <div>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      autocomplete="off"
                      value={password}
                    />
                    {/* <FiEye /> */}
                  </div>
                  <span className="error-msg">{passwordErr}</span>
                </div>
                <div className="pb-lg-0 pb-5">
                  {loading ? (
                    <button
                      type="submit"
                      disabled="true"
                      className="btn btn-primary fw-bolder fs-6 px-8 py-4 my-3 me-3 login-btn"
                    >
                      <p>Processing...</p>{" "}
                      <Spinner
                        style={{ marginLeft: "10px" }}
                        animation="border"
                      />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary fw-bolder fs-6 px-8 py-4 my-3 me-3 login-btn"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
