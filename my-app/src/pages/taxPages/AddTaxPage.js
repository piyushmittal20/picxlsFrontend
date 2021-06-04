import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorToast from "../../components/ErrorToast";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import { Button, Spinner } from "react-bootstrap";
import { getAllCountries, getAllStates } from "../../actions/masterSettings";
import { createTax } from "../../actions/taxActions";
import Select from "react-select";

const AddTaxPage = ({ history }) => {
  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.countryList);
  const { loading, countries } = countryList;

  const stateList = useSelector((state) => state.stateList);
  const { states } = stateList;

  const taxCreate = useSelector((state) => state.taxCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = taxCreate;

  const schema = yup.object().shape({
    title: yup.string().required("This Field is Required").max(50).trim(),
    country: yup.string().required("This Field is Required").max(50).trim(),
    state: yup.string().required("This Field is required").max(50).trim(),
    taxPercentage: yup.string().required("This Field is required").trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const country = watch("country");

  const countryOptions =
    countries &&
    countries.map((ele) => {
      return { label: ele.title, value: ele._id };
    });

  const stateOptions =
    states &&
    states
      .filter((i) => i.country._id === country)
      .map((el) => {
        return { label: el.title, value: el._id };
      });

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllStates());
    if (createSuccess) {
      history.push("/taxlist");
    }
  }, [history, dispatch, createSuccess]);

  const submitForm = (data) => {
    dispatch(createTax(data));
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Add Country - Picxls" />
      <div className="container-fluid mt-40">
        {errors.title && <ErrorToast message={errors.title.message} />}
        <container>
          {createError && <ErrorToast message={createError} />}
          {loading ? (
            <Loader />
          ) : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
              <h1 className="py-5">
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
                ADD TAX
              </h1>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Tax Name</label>
                    <input
                      type="text"
                      {...register("title")}
                      className="form-control my-5"
                      placeholder="Enter Name"
                    />
                    {errors.title && (
                      <p className="text-danger small p-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>Country Name</label>
                    <Select
                      className="my-5"
                      options={countryOptions}
                      getOptionValue={(option) => option.value}
                      onChange={(option) => {
                        setValue("country", option.value);
                      }}
                      placeholder="Select Country"
                    />
                    {errors.country && (
                      <p className="text-danger small p-1">
                        {errors.country.message}
                      </p>
                    )}
                    {/* <select
                      className="form-select my-5"
                      aria-label="Select example"
                      {...register("country")}
                    >
                      <option value="">Select Country</option>
                      {countries &&
                        countries.map((country, index) => (
                          <option value={country._id}>{country.title}</option>
                        ))}
                    </select> */}
                    {/* {errors.country && (
                      <p className="text-danger small p-1">
                        {errors.country.message}
                      </p>
                    )} */}
                    {/* <MultiSelect
                      {...register("country")}
                      options={countrylist}
                      labelledBy="Select Country"
                    /> */}
                  </div>
                  <div class="col-sm-12">
                    <label>State Name</label>
                    {/* <select
                      className="form-select my-5"
                      aria-label="Select example"
                      disabled={!country}
                      {...register("state")}
                    >
                      <option value="">Select State</option>
                      {states &&
                        states
                          .filter((i) => i.country._id === country)
                          .map((state, index) => (
                            <option value={state._id}>{state.title}</option>
                          ))}
                    </select> */}
                    <Select
                      className="my-5"
                      options={stateOptions}
                      getOptionValue={(option) => option.value}
                      onChange={(option) => {
                        console.log(option);
                        setValue("state", option.value);
                      }}
                      placeholder="Select State"
                    />
                    {errors.state && (
                      <p className="text-danger small p-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>Tax Percentage</label>
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
                  <div className="text-right col-sm-12">
                    <Link to="/taxlist">
                      <Button
                        type="submit"
                        className="mx-3"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </Link>
                    {createLoading ? (
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
              </div>
            </form>
          )}
        </container>
      </div>
    </div>
  );
};

export default AddTaxPage;
