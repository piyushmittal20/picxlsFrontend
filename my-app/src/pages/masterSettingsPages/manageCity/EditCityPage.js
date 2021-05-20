import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader";
import { detailCity, editCity } from "../../../service";
import ErrorToast from "../../../components/ErrorToast";
import Meta from "../../../components/Meta";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditCityPage = ({ history, match }) => {
  const cityId = match.params.id;

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateErr, setUpdateErr] = useState("");

  const schema = yup.object().shape({
    title: yup.string().required("This Field is Required").max(50).trim(),
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

  const getDetails = async (id) => {
    setLoading(true);
    try {
      const {
        data: { city },
      } = await axios.get(`${detailCity}/city/${id}`);

      if (city) {
        setLoading(false);
        setValue("title", city.title);
        setCountry(city.country.title);
        setState(city.state.title);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails(cityId);
  }, [cityId]);

  const submitForm = async (data) => {
    setUpdateLoading(true);
    try {
      const {
        data: { updatedCity },
      } = await axios.put(`${editCity}/city/${cityId}`, data);

      if (updatedCity) {
        setUpdateLoading(false);
        history.push("/citylist");
      }
    } catch (err) {
      setUpdateLoading(false);
      setUpdateErr(err.response.data);
    }
  };

  return (
    <div className="wapper" style={{ paddingBottom: "50px" }}>
      <Meta title="Edit City - Picxls" />
      <div class="container-fluid mt-40">
        <container>
          {updateErr && <ErrorToast message={updateErr.message} />}
          {errors.title && <ErrorToast message={errors.title.message} />}
          {loading ? (
            <Loader />
          ) : (
            <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
              <h1 className="py-5">
                {" "}
                <Link to="/citylist">
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
                Edit City
              </h1>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Country Name</label>
                    <input
                      type="text"
                      value={country}
                      className="form-control my-5"
                      disabled
                      placeholder="Enter Country"
                    />
                  </div>
                  <div class="col-sm-12">
                    <label>State Name</label>
                    <input
                      type="text"
                      value={state}
                      className="form-control my-5"
                      disabled
                      placeholder="Enter State"
                    />
                  </div>
                  <div class="col-sm-12">
                    <label>City Name</label>
                    <input
                      type="text"
                      {...register("title")}
                      className="form-control my-5"
                      placeholder="Enter City"
                    />
                    {errors.title && (
                      <p className="text-danger small p-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="text-right col-sm-12">
                    <Link to="/citylist">
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
                          style={{ marginRight: "5px" }}
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
            </form>
          )}
        </container>
      </div>
    </div>
  );
};

export default EditCityPage;
