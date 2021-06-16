import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { createUser } from "../../actions/userActions";
import Meta from "../../components/Meta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddUserPage = ({ history }) => {
  const dispatch = useDispatch();

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, success: createSuccess, error } = userCreate;

  const schema = yup.object().shape({
    firstname: yup
      .string()
      .required("First Name Required*")
      .max(50, "Not more than 50 char long")
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Not a Valid Name*")
      .trim(),
    lastname: yup
      .string()
      .required("Last Name Required*")
      .max(50, "Not more than 50 char long")
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Not a Valid Name")
      .trim(),
    email: yup
      .string()
      .required("Email Required*")
      .max(50, "Not more that 50 cahr long")
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Not a Valid Email")
      .trim(),
    password: yup
      .string()
      .required("Password Required*")
      .min(6, "Password should be 6 character long")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
        "At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 Special Char"
      ),
    phoneNumber: yup
      .string()
      .required("Phone Number Required*")
      .min(7, "Not less than 7 charaters*")
      .max(15, "Not grater than 15 characters*")
      .matches(/^\d{10}$/, "Not a Valid Number*"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    dispatch(createUser(data));
  };

  useEffect(() => {
    if (createSuccess) {
      history.push("/userlist");
    }
    if (error) {
      toast.error(error);
    }
  }, [createSuccess, history, error]);

  return (
    <div className="wapper" style={{ paddingBottom: "50px" }}>
      <Meta title="Add User - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          <ToastContainer position="top-right" autoClose={2000} />
          <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
            <h1>
              {" "}
              <Link to="/userlist">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#09204e"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </Link>{" "}
              Add User
            </h1>
            <div class="form rounded border p-10">
              <div class="row">
                <div class="col-sm-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    {...register("firstname")}
                    className="form-control my-5"
                    placeholder="Enter firstname"
                  />
                  {errors.firstname && (
                    <p className="error-text">{errors.firstname.message}</p>
                  )}
                </div>
                <div class="col-sm-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    {...register("lastname")}
                    className="form-control my-5"
                    placeholder="Enter lastname"
                  />
                  {errors.lastname && (
                    <p className="error-text">{errors.lastname.message}</p>
                  )}
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <label>Email</label>
                  <input
                    type="text"
                    {...register("email")}
                    className="form-control my-5"
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <p className="error-text">{errors.email.message}</p>
                  )}
                </div>
                <div class="col-sm-6">
                  <label>Password</label>
                  <input
                    type="text"
                    {...register("password")}
                    className="form-control my-5"
                    placeholder="Enter Password"
                  />
                  {errors.password && (
                    <p className="error-text">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    {...register("phoneNumber")}
                    className="form-control my-5"
                    placeholder="Enter Contact number"
                  />
                  {errors.phoneNumber && (
                    <p className="error-text">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <Link to="/userlist">
                  <Button type="submit" className="mx-3" variant="secondary">
                    Cancel
                  </Button>
                </Link>
                {loading ? (
                  <Button type="submit" variant="dark" disabled>
                    <Spinner
                      animation="border"
                      size="sm"
                      style={{ marginRight: "5px", marginBottom: "3px" }}
                    />
                    Creating...
                  </Button>
                ) : (
                  <Button type="submit" variant="dark">
                    Create
                  </Button>
                )}
              </div>
            </div>
          </form>
        </container>
      </div>
    </div>
  );
};

export default AddUserPage;
