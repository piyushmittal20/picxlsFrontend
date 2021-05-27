import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCountry, updateCountry } from "../../../actions/masterSettings";
import Loader from "../../../components/Loader";
import ErrorToast from "../../../components/ErrorToast";
import Meta from "../../../components/Meta";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditCountryPage = ({ history, match }) => {
  const countryId = match.params.id;

  const dispatch = useDispatch();

  const countryDetail = useSelector((state) => state.countryDetail);
  const { loading, error, country } = countryDetail;

  const countryUpdate = useSelector((state) => state.countryUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = countryUpdate;

  const schema = yup.object().shape({
    title: yup.string().required("This Field is Required").max(50).trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (updateSuccess) {
      history.push("/countrylist");
    } else {
      if (country) {
        if (!country.title || country._id !== countryId) {
          dispatch(getCountry(countryId));
        } else {
          setValue("title", country.title);
        }
      }
    }
  }, [dispatch, country, countryId, updateSuccess, history]);

  const submitHandler = (data) => {
    dispatch(updateCountry(data, countryId));
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Edit Country - Picxls" />
      <div class="container-fluid mt-40">
        <container>
          {error && <ErrorToast message={error} />}
          {updateError && <ErrorToast message={updateError.message} />}
          {errors.title && <ErrorToast message={errors.title.message} />}
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <h2 class="head py-5">
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
                Edit Country
              </h2>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Edit Country Name</label>
                    <input
                      type="text"
                      className="form-control my-5"
                      {...register("title")}
                      placeholder="Enter Country"
                    />
                    {errors.title && (
                      <p className="text-danger small p-1">
                        {errors.title.message}
                      </p>
                    )}
                    <div className="text-right">
                      <Link to="/countrylist">
                        <Button
                          type="submit"
                          className="mx-3"
                          variant="secondary"
                        >
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
                </div>
              </div>
            </form>
          )}
        </container>
      </div>
    </div>
  );
};

export default EditCountryPage;
