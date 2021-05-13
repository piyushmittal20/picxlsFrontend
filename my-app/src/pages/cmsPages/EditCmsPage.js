import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import { detailPage, editPage } from "../../service";
import Meta from "../../components/Meta";

const EditCmsPage = ({ history, match }) => {
  const pageId = match.params.id;

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateErr, setUpdateErr] = useState("");
  const [descError, setDescError] = useState("");
  const [dataError, setDataError] = useState("");

  const validate = () => {
    let descError = "";
    let dataError = "";

    if (!description) {
      descError = "This field is Required";
    }
    if (!data) {
      dataError = "This field is Required";
    }

    if (descError && dataError) {
      setDescError(descError);
      setDataError(dataError);
      return false;
    }

    return true;
  };

  const pageDetails = async (id) => {
    setLoading(true);
    try {
      const {
        data: { page },
      } = await axios.get(`${detailPage}/page/${id}`);
      if (page) {
        setLoading(false);
        setTitle(page.title);
        setShortDescription(page.shortDescription);
        setDescription(page.description);
        setData(page.data);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    pageDetails(pageId);
  }, [pageId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPage = {
      _id: pageId,
      title: title,
      shortDescription: shortDescription,
      description: description,
      data: data,
    };

    const isValid = validate();
    if (isValid) {
      console.log("Hello");
    }

    setUpdateLoading(true);
    try {
      const {
        data: { updatedPage },
      } = await axios.put(`${editPage}/page/${newPage._id}`, newPage);

      if (updatedPage) {
        setUpdateLoading(false);
        history.push("/CMS");
      }
    } catch (error) {
      setUpdateLoading(false);
      setUpdateErr(error.response.data);
    }
  };

  const handleChange = (content) => {
    setDescription(content);
  };

  return (
    <div className="wapper">
      {error && <ErrorToast message={error.message} />}
      <Meta title="Edit Page - Picxls" />
      <div class="container-fluid mt-40">
        <container>
          {loading ? (
            <Loader />
          ) : (
            <form className="m-3 p-2" onSubmit={submitHandler}>
              <h1>
                {" "}
                <Link to="/cms">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
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
                EDIT PAGE
              </h1>
              <input
                type="text"
                className="form-control my-5"
                value={title}
                disabled="true"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
              <Editor
                value={description}
                apiKey="uz7850o0ebiwosbrfq0h7jkjysd6rxe35h0oqcazst3ep4ez"
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help",
                }}
                onEditorChange={handleChange}
              />
              <span className="text-danger small p-1">{descError}</span>
              <input
                type="text"
                className="form-control my-5"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter Meta data"
              />
              <span className="text-danger small p-1">{dataError}</span>
              <div className="text-right">
                <Link to="/CMS">
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
            </form>
          )}
        </container>
      </div>
    </div>
  );
};

export default EditCmsPage;
