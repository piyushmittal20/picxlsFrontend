import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createState, getAllCountries } from "../../../actions/masterSettings";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import ErrorToast from "../../../components/ErrorToast";
import Meta from "../../../components/Meta";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddStatePage = ({ history }) => {
  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.countryList);
  const { loading, countries } = countryList;

  const stateCreate = useSelector((state) => state.stateCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = stateCreate;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("State name Required*")
      .max(50)
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Not a Valid Name*")
      .trim(),
    country: yup.string().required("Country name Required*").max(50).trim(),
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
    dispatch(getAllCountries());
    if (createSuccess) {
      history.push("/statelist");
    }
  }, [dispatch, createSuccess, history]);

  const submitForm = (data) => {
    dispatch(createState(data));
  };

  return (
    <div class="wapper" style={{ paddingBottom: "50px" }}>
      <Meta title="Add State - Picxls" />
      <div className="container-fluid mt-40">
        {createError && <ErrorToast message={createError} />}
        <container>
          {loading ? (
            <Loader />
          ) : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
              <h1 class="py-5">
                {" "}
                <Link to="/statelist">
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
                Add State
              </h1>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Select Country</label>
                    <select
                      className="form-select my-5"
                      aria-label="Select example"
                      {...register("country")}
                    >
                      <option value="">Select Country</option>
                      {countries &&
                        countries.map((country) => (
                          <option value={country._id}>{country.title}</option>
                        ))}
                    </select>
                    {errors.country && (
                      <p className="error-text">{errors.country.message}</p>
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>Add State Name</label>
                    <input
                      type="text"
                      className="form-control my-5"
                      placeholder="Enter State"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="error-text">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="text-right col-sm-12">
                    <Link to="/statelist">
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
            </form>
          )}
        </container>
      </div>
    </div>
  );
};

export default AddStatePage;
