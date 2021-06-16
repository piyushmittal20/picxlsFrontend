import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {} from "../../actions/taxActions";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import { getAllCountries, getAllStates } from "../../actions/masterSettings";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { getTaxDetails, taxUpdate } from "../../service";

const EditTaxPage = ({ history, match }) => {
  const taxId = match.params.id;

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.countryList);
  const { countries } = countryList;

  const stateList = useSelector((state) => state.stateList);
  const { states } = stateList;

  const getDetails = async (id) => {
    setLoading(true);
    try {
      const {
        data: { tax },
      } = await axios.get(`${getTaxDetails}/taxDetail/${id}`);

      if (tax) {
        setLoading(false);
        setValue("title", tax.title);
        setValue("taxPercentage", tax.taxPercentage);
        setValue("country", tax.country._id);
        setValue("state", tax.state._id);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is Required*")
      .max(50, "Not more than 50 char long")
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Not a Valid Name*")
      .trim(),
    country: yup.string().required("Country is Required*").max(50).trim(),
    state: yup.string().required("State is Required*").max(50).trim(),
    taxPercentage: yup
      .string()
      .required("Tax Percentage Required*")
      .matches(/^[0-9]+$/, "Not a Valid Number*"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const countryOptions =
    countries &&
    countries.map((ele) => {
      return { label: ele.title, value: ele._id };
    });

  const country = watch("country");

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllStates());
    getDetails(taxId);
  }, [taxId, dispatch]);

  const submitForm = async (data) => {
    setUpdateLoading(true);
    try {
      const {
        data: { savedTax },
      } = await axios.put(`${taxUpdate}/tax/${taxId}`, data);

      if (savedTax) {
        setUpdateLoading(false);
        history.push("/taxlist");
      }
    } catch (error) {
      setUpdateLoading(false);
      setUpdateError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Edit Tax - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          {updateError && <ErrorToast message={updateError} />}
          {error && <ErrorToast message={error} />}
          {loading ? (
            <Loader />
          ) : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
              <h1>
                {" "}
                <Link to="/taxlist">
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
                EDIT TAX
              </h1>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("title")}
                      className="form-control my-5"
                      placeholder="Enter firstname"
                    />
                    {errors.title && (
                      <p className="text-danger small p-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>Country</label>
                    <select
                      className="form-select my-5"
                      aria-label="Select example"
                      {...register("country")}
                    >
                      <option value="">Select Country</option>
                      {countries &&
                        countries.map((country, index) => (
                          <option value={country._id}>{country.title}</option>
                        ))}
                    </select>
                    {/* <Select
                      className="my-5"
                      options={countryOptions}
                      getOptionValue={(option) => option.value}
                      onChange={(option) => {
                        setValue("country", option.value);
                      }}
                      defaultInputValue={country}
                      placeholder="Select Country"
                    /> */}
                    {errors.country && (
                      <p className="text-danger small p-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>State </label>
                    <select
                      className="form-select my-5"
                      aria-label="Select example"
                      {...register("state")}
                    >
                      <option value="">Select State</option>
                      {states &&
                        states
                          .filter((i) => i.country._id === country)
                          .map((state, index) => (
                            <option value={state._id}>{state.title}</option>
                          ))}
                    </select>
                    {errors.state && (
                      <p className="text-danger small p-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <label>TAX PERCENTAGE</label>
                      <input
                        type="text"
                        {...register("taxPercentage")}
                        className="form-control my-5"
                        placeholder="Enter Tax Percentage"
                      />
                      {errors.taxPercentage && (
                        <p className="text-danger small p-1">
                          {errors.taxPercentage.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Link to="/taxlist">
                    <Button type="submit" className="mx-3" variant="secondary">
                      Cancel
                    </Button>
                  </Link>
                  {updateLoading ? (
                    <Button type="submit" variant="dark" disabled>
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ marginRight: "5px", marginBottom: "3px" }}
                      />
                      Updating...
                    </Button>
                  ) : (
                    <Button type="submit" variant="dark">
                      Update
                    </Button>
                  )}
                </div>
              </div>
            </form>
          )}
        </container>
      </div>
    </div>
  );
};

export default EditTaxPage;
