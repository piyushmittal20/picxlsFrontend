import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import { updateLogo, getLogoDetail } from "../../actions/logoActions";

const LogoEdit = ({ history, match }) => {
  const logoId = match.params.id;

  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const logoDetail = useSelector((state) => state.logoDetail);
  const { loading, error, logo } = logoDetail;

  const logoUpdate = useSelector((state) => state.logoUpdate);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = logoUpdate;

  useEffect(() => {
    if (updateSuccess) {
      history.push("/logolist");
    } else {
      if (logo) {
        if (logoId !== logo._id) {
          dispatch(getLogoDetail(logoId));
        } else {
          setImage(logo.image);
        }
      }
    }
  }, [history, dispatch, logoId, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('image', image);

    dispatch(updateLogo(formData, logoId));
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Edit Country - Picxls" />
      <div class="container-fluid mt-40">
        <container>
          {error && <ErrorToast message={error} />}
          {updateError && <ErrorToast message={updateError.message} />}
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={submitHandler}>
              <h2 class="head py-5">
                {" "}
                <Link to="/logolist">
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
                Edit Logo
              </h2>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Edit Logo</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control my-5"
                      onChange={(e) => setImage(e.target.files[0])}
                      placeholder="Enter Logo"
                    />
                    <div className="text-right">
                      <Link to="/logolist">
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

export default LogoEdit;
