import { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { createNotification } from "../../actions/notificationActions";

const AddNotificationPage = ({ history }) => {
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const notificationCreate = useSelector((state) => state.notificationCreate);
  const { loading, error, success: createSuccess } = notificationCreate;

  const schema = yup.object().shape({
    text: yup
      .string()
      .required("Text is Required*")
      .max(50, "Not more than 50 char long")
      .matches(/^([a-zA-Z.-]+\s)*[a-zA-Z.-]+$/, "Not a Valid text*")
      .trim(),
    URL: yup.string().required("URL is Required*").trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (createSuccess) {
      history.push("/notificationlist");
    }
  }, [adminInfo, history, createSuccess]);

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Create Notification - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          {error && <ErrorToast message={error} />}
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
              Create Notification
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
                    <option disabled>Select Type</option>
                    <option value="user">End Users</option>
                    <option value="business">Business</option>
                    <option value="">Both</option>
                  </select>
                  {errors.type && (
                    <p className="error-text">{errors.type.message}</p>
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
                    <p className="error-text">{errors.text.message}</p>
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
                    <p className="error-text">{errors.URL.message}</p>
                  )}
                </div>
                <div className="text-right">
                  <Link to="/notificationlist">
                    <Button className="mx-3" variant="secondary">
                      Cancel
                    </Button>
                  </Link>
                  {loading ? (
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
        </container>
      </div>
    </div>
  );
};

export default AddNotificationPage;
