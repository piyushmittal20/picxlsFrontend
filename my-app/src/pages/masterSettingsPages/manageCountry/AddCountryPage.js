import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCountry } from "../../../actions/masterSettings";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
// import ErrorToast from "../../../components/ErrorToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "../../../components/Meta";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddCountryPage = ({ history }) => {
  const dispatch = useDispatch();

  const countryCreate = useSelector((state) => state.countryCreate);
  const { loading, success: createSuccess, error } = countryCreate;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Country name Required*")
      .max(50, "Not more than 50 char long")
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Not a Valid Name")
      .trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (createSuccess) {
      history.push("/countrylist");
    }
    if (error) {
      toast.error(error);
    }
  }, [history, createSuccess, adminInfo, error]);

  const handleS = (data) => {
    dispatch(createCountry(data));
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Add Country - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          <ToastContainer position="top-right" autoClose={2000} />
          <form onSubmit={handleSubmit(handleS)}>
            <h2 className="head py-5">
              {" "}
              <Link to="/countrylist">
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
              </Link>
              Add Country
            </h2>
            <div class="form rounded border p-10">
              <div class="row">
                <div class="col-sm-12">
                  <label> Name</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter country"
                      className={
                        errors.title
                          ? "input-err form-control my-5"
                          : "form-control my-5"
                      }
                      {...register("title")}
                    ></input>
                  </div>
                  {errors.title && (
                    <p className="error-text">{errors.title.message}</p>
                  )}
                  <div className="text-right">
                    <Link to="/countrylist">
                      <Button className="mx-3" variant="secondary">
                        Cancel
                      </Button>
                    </Link>
                    {loading ? (
                      <Button variant="dark" disabled>
                        <Spinner
                          animation="border"
                          disabled="true"
                          size="sm"
                          style={{ marginRight: "5px", marginBottom: "3px" }}
                        />
                        Creating...
                      </Button>
                    ) : (
                      <Button
                        disabled={!isValid}
                        className="disable"
                        type="submit"
                        variant="dark"
                      >
                        Create
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </container>
      </div>
    </div>
  );
};

export default AddCountryPage;
