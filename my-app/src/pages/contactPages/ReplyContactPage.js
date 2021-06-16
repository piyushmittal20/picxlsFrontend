import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import { addAnswer } from "../../actions/contactActions";

const ReplyContactPage = ({ history, match }) => {
  const contactId = match.params.id;

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const answerConcern = useSelector((state) => state.answerConcern);
  const { loading, error, success: updateSuccess } = answerConcern;

  const schema = yup.object().shape({
    answer: yup.string().required("Answer is Required*").trim(),
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
    if (updateSuccess) {
      history.push(`/contactview/${contactId}`);
    }
  }, [history, dispatch, adminInfo, contactId, updateSuccess]);

  const handleS = (data) => {
    console.log(data);
    dispatch(addAnswer(data, contactId));
  };

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Contact Us - Picxls" />
      <div className="container-fluid mt-40">
        <container>
          {error && <ErrorToast error={error} />}
          {errors.title && <ErrorToast message={errors.title.message} />}
          <form onSubmit={handleSubmit(handleS)}>
            <h2 className="head py-5">
              {" "}
              <Link to={`/contactview/${contactId}`}>
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
              Reply Concern
            </h2>
            <div class="form rounded border p-10">
              <div class="row">
                <div class="col-sm-12">
                  <label>Answer Concern</label>
                  <div>
                    <textarea
                      rows={8}
                      className="form-control my-5"
                      {...register("answer")}
                    ></textarea>
                  </div>
                  {errors.answer && (
                    <p className="error-text">{errors.answer.message}</p>
                  )}
                  <div className="text-right">
                    <Link to={`/contactview/${contactId}`}>
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
                        Replying...
                      </Button>
                    ) : (
                      <Button type="submit" variant="dark">
                        Reply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </container>
      </div>
    </div>
  );
};

export default ReplyContactPage;
