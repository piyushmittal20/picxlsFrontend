import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { createStartag } from "../../actions/startagActions";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADMIN_ADDSTARTAG_RESET } from "../../constants/adminConstants";

const AddStartagPage = ({ history }) => {
  const dispatch = useDispatch();

  const startagCreate = useSelector((state) => state.startagCreate);
  const { loading, error, success: createSuccess } = startagCreate;

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is Required*")
      .max(50, "Not more than 50 char long")
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, "Not a Valid Name*")
      .lowercase()
      .trim(),
    type: yup.string().required("Type is Required*"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      cost: 0,
    },
    resolver: yupResolver(schema),
  });

  var type = watch("type");

  useEffect(() => {
    if (createSuccess) {
      history.push("/startaglist");
    }
    if (error) {
      setTimeout(() => {
        dispatch({ type: ADMIN_ADDSTARTAG_RESET });
      }, 2000);
    }
  }, [history, createSuccess, dispatch, error]);

  const submitForm = (data) => {
    console.log(data);
    console.log(data.image[0]);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cost", data.cost);
    formData.append("type", data.type);
    formData.append("image", data.image[0]);

    dispatch(createStartag(formData));
  };

  console.log(errors);

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Add Startag - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          {error && <ErrorToast message={error} />}
          <form className="m-3 p-2" onSubmit={handleSubmit(submitForm)}>
            <h1>
              {" "}
              <Link to="/startaglist">
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
              Add Startag
            </h1>
            <div class="form rounded border p-10">
              <div class="row">
                <div class="col-sm-12">
                  <label>Startag Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="form-control my-5"
                    placeholder="Enter Name"
                  />
                  {errors.name && (
                    <p className="error-text">{errors.name.message}</p>
                  )}
                </div>
                <div class="col-sm-12">
                  <label>Startag Type</label>
                  <select
                    className="form-select my-5"
                    aria-label="Select example"
                    {...register("type")}
                  >
                    <option value="">Select Role</option>
                    <option value="General">General</option>
                    <option value="Bussiness">Bussiness</option>
                  </select>
                  {errors.type && (
                    <p className="error-text">{errors.type.message}</p>
                  )}
                  {type === "Bussiness" ? (
                    <div>
                      <label>Startag Cost</label>
                      <input
                        type="number"
                        {...register("cost")}
                        className="form-control my-5"
                        placeholder="Enter Cost"
                      />
                      <p className="error-text"></p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div class="col-sm-12">
                  <label>Select Image</label>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    className="form-control my-5"
                  />
                  {errors.image && (
                    <p className="error-text">You need to provide an image</p>
                  )}
                </div>
                <div className="text-right col-sm-12">
                  <Link to="/startaglist">
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
            </div>
          </form>
        </container>
      </div>
    </div>
  );
};

export default AddStartagPage;
