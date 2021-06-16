import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getNotificationDetail,
  editNotification,
} from "../../actions/notificationActions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditNotificationPage = ({ history, match }) => {
  const notificationId = match.params.id;

  const dispatch = useDispatch();

  const notificationDetail = useSelector((state) => state.notificationDetail);
  const { loading, error, notification } = notificationDetail;

  const notificationEdit = useSelector((state) => state.notificationEdit);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = notificationEdit;

  const schema = yup.object().shape({
    text: yup
      .string()
      .required("This Field is Required")
      .max(50)
      .trim()
      .lowercase(),
    URL: yup.string().required("This is Field is required").max(50).trim(),
    type: yup
      .string()
      .required("This is field is required")
      .max(50)
      .trim()
      .lowercase(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (notification) {
      if (!notification.text || notification._id !== notificationId) {
        dispatch(getNotificationDetail(notificationId));
      } else {
        setValue("text", notification.text);
        setValue("URL", notification.URL);
        setValue("type", notification.type);
      }
    }
    if (updateSuccess) {
      history.push("/notificationlist");
    }
  }, [dispatch, notificationId, notification, history, updateSuccess]);

  const submitHandler = (data) => {
    dispatch(editNotification(data, notificationId));
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Create Notification - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          {error && <ErrorToast error={error} />}
          {updateError && <ErrorToast message={updateError} />}
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <h2 className="head py-5">
                {" "}
                <Link to="/notificationlist">
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
                Update Notification
              </h2>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Send to</label>
                    <select
                      className="form-select my-5"
                      aria-label="Select example"
                      {...register("type")}
                    >
                      <option value="">Select Type</option>
                      <option value="End Users">End Users</option>
                      <option value="Business">Business</option>
                      <option value="Both">Both</option>
                    </select>
                    {errors.type && (
                      <p className="text-danger small p-1">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>Text</label>
                    <div>
                      <input
                        type="text"
                        className="form-control my-5"
                        {...register("text")}
                      ></input>
                    </div>
                    {errors.text && (
                      <p className="text-danger small p-1">
                        {errors.text.message}
                      </p>
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>URL</label>
                    <div>
                      <input
                        type="text"
                        className="form-control my-5"
                        {...register("URL")}
                      ></input>
                    </div>
                    {errors.URL && (
                      <p className="text-danger small p-1">
                        {errors.URL.message}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Link to="/notificationlist">
                      <Button className="mx-3" variant="secondary">
                        Cancel
                      </Button>
                    </Link>
                    {updateLoading ? (
                      <Button variant="dark" disabled>
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

export default EditNotificationPage;
