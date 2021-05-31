import { useState, useEffect, useRef } from "react";
import { login } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { ADMIN_LOGIN_RESET } from "../constants/adminConstants";
import ErrorToast from "../components/ErrorToast";
import Meta from "../components/Meta";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = ({ history }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [emailErr, setEmailErr] = useState("");
  // const [passwordErr, setPasswordErr] = useState("");
  const [token, setToken] = useState("");
  // const [tokenErr, setTokenErr] = useState("");
  const reCapatcha = useRef();

  // const validate = () => {
  //   let emailErr = "";
  //   let passwordErr = "";
  //   let tokenErr = "";

  //   if (!email) {
  //     emailErr = "Email cannot be empty";
  //   }
  //   if (!password) {
  //     passwordErr = "Password cannot be empty";
  //   }
  //   if (!token) {
  //     tokenErr = "Please verify the captcha";
  //   }

  //   if (emailErr && passwordErr && tokenErr) {
  //     setEmailErr(emailErr);
  //     setPasswordErr(passwordErr);
  //     setTokenErr(tokenErr);
  //     return false;
  //   }

  //   return true;
  // };

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = adminLogin;

  const schema = yup.object().shape({
    email: yup.string().required("This Field is Required").max(50).trim(),
    password: yup.string().required("This Field is required").trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

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

  const submitHandler = (data) => {
    // e.preventDefault();

    // const isValid = validate();
    // if (isValid) {
    //   setPassword("");
    // }

    const creds = {
      email: data.email,
      password: data.password,
      token: token,
    };

    dispatch(login(creds));
  };

  return (
    <div class="p-0">
      <Meta title="Sign In - Picxls" />
      {error && <ErrorToast message={error} />}
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
                alt="photo"
              />
              <br />
              <h3 className="fw-bolder fs-2x text-white lh-lg">
                Discover PICXLS
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
                onSubmit={handleSubmit(submitHandler)}
                className="form w-100"
                novalidate="novalidate"
              >
                <div class="pb-5 pb-lg-15">
                  <h3 class="fw-bolder text-dark display-6">
                    Welcome to Picxls
                  </h3>
                </div>
                <div className="fv-row mb-7">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Email
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-danger small p-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="fv-row mb-7">
                  <label className="form-label fs-6 fw-bolder text-dark pt-5">
                    Password
                  </label>
                  <div>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-danger small p-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="fv-row mb-7">
                  <ReCAPTCHA
                    ref={reCapatcha}
                    sitekey="6LcCj_EaAAAAAHMNyPO-AztxeM4g7Zm2AaIn10Bg"
                    onChange={(token) => setToken(token)}
                    onExpired={(e) => setToken("")}
                  />
                </div>
                <div className="pb-lg-0 pb-5">
                  {loading ? (
                    <button
                      type="submit"
                      disabled="true"
                      className="btn btn-dark  fw-bolder fs-6 px-8 py-4 my-3 me-3 login-btn"
                    >
                      <p>Signing In...</p>{" "}
                      <Spinner
                        style={{ marginLeft: "10px" }}
                        animation="border"
                      />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-dark login-btn">
                      Sign In
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
