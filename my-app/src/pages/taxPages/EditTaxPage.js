import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {} from "../../actions/taxActions";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import { getTaxDetail, updateTax } from "../../actions/taxActions";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditTaxPage = ({ history, match }) => {
  const taxId = match.params.id;

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const dispatch = useDispatch();

  const taxDetail = useSelector((state) => state.taxDetail);
  const { loading, error, tax } = taxDetail;

  const taxUpdate = useSelector((state) => state.taxUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = taxUpdate;

  const schema = yup.object().shape({
    title: yup.string().required("This Field is Required").max(50).trim(),
    taxPercentage: yup.string().required("This Field is Required").trim(),
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
      history.push("/taxlist");
    } else {
      if (tax) {
        if (!tax.title || tax._id !== taxId) {
          dispatch(getTaxDetail(taxId));
        } else {
          setValue("title", tax.title);
          setValue("taxPercentage", tax.taxPercentage);
          setCountry(tax.country.title);
          setState(tax.state.title);
        }
      }
    }
  }, [dispatch, history, taxId, tax, updateSuccess]);

  const submitForm = (data) => {
    console.log(data);
    dispatch(updateTax(data, taxId));
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
                  <div class="col-sm-6">
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
                  <div class="col-sm-6">
                    <label>COUNTRY</label>
                    <input
                      type="text"
                      value={country}
                      className="form-control my-5"
                      placeholder="Enter country"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <label>STATE</label>
                    <input
                      type="text"
                      value={state}
                      className="form-control my-5"
                      placeholder="Enter State"
                      disabled
                    />
                  </div>
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
