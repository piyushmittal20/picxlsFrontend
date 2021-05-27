import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStartag } from "../../actions/startagActions";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateStartag } from "../../actions/startagActions";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";

const EditStartagPage = ({ history, match }) => {
  const startagId = match.params.id;

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [typeErr, setTypeErr] = useState("");
  const [costErr, setCostErr] = useState("");

  const validate = () => {
    let nameErr = "";
    let typeErr = "";
    let costErr = "";

    if (!name) {
      nameErr = "Only empty sapce isn't required";
    }
    if (!type) {
      typeErr = "Only empty sapce isn't required";
    }
    if (!cost) {
      costErr = "Only empty sapce isn't required";
    }

    if (nameErr && typeErr && costErr) {
      setNameErr(nameErr);
      setTypeErr(typeErr);
      setCostErr(costErr);
      return false;
    }

    return true;
  };

  const dispatch = useDispatch();

  const startagDetail = useSelector((state) => state.startagDetail);
  const { loading, error, startag } = startagDetail;

  const startagUpdate = useSelector((state) => state.startagUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = startagUpdate;

  useEffect(() => {
    if (updateSuccess) {
      history.push("/startaglist");
    } else {
      if (startag) {
        if (!startag.name || startag._id !== startagId) {
          dispatch(getStartag(startagId));
        } else {
          setName(startag.name);
          setType(startag.type);
          setCost(startag.cost);
          setImage(startag.image);
        }
      }
    }
  }, [dispatch, startagId, startag, history, updateSuccess]);

  const submitForm = (e) => {
    e.preventDefault();

    const newStartag = {
      _id: startagId,
      name: name,
      cost: cost,
      type: type,
      image: image,
    };

    const isValid = validate();
    if (isValid) {
    }

    dispatch(updateStartag(newStartag));
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Edit Startag - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          {error && <ErrorToast message={error} />}
          {updateError && <ErrorToast message={updateError} />}
          {loading ? (
            <Loader />
          ) : (
            <form className="m-3 p-2" onSubmit={submitForm}>
              <h1 className="py-5">
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
                </Link>
                Edit Startag
              </h1>
              <div class="form rounded border p-10">
                <div class="row">
                  <div class="col-sm-12">
                    <label>Startag Name</label>
                    <input
                      type="text"
                      value={name}
                      disabled={true}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control my-5"
                      placeholder="Enter Name"
                    />
                    <span className="error-msg">{nameErr}</span>
                  </div>
                  <div class="col-sm-12">
                    <label>Startag Type</label>
                    <select
                      className="form-select my-5"
                      aria-label="Select example"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option>Select Role</option>
                      <option value="General">General</option>
                      <option value="Bussiness">Bussiness</option>
                    </select>
                    <span className="error-msg">{typeErr}</span>
                    {type === "Bussiness" ? (
                      <div>
                        <label>Startag Cost</label>
                        <input
                          type="text"
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                          className="form-control my-5"
                          placeholder="Enter Cost"
                        />
                        <span className="error-msg">{costErr}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="col-sm-12">
                    <label>Startag Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="form-control my-5"
                      placeholder="Enter Image"
                    />
                  </div>
                  <div className="text-right col-sm-12">
                    <Link to="/startaglist">
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

export default EditStartagPage;
