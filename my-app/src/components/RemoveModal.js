import { Button, Modal, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { removeContent } from "../actions/abuseActions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorToast from "./ErrorToast";
import {withRouter} from 'react-router-dom';

const RemoveModal = ({ show, setShow, history }) => {
  const schema = yup.object().shape({
    reason: yup.string().required("This Field is Required").trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const abuseRemove = useSelector((state) => state.abuseRemove);
  const { loading, error, success } = abuseRemove;

  const delAbuseId = localStorage.getItem("delAbuseId");

  const deleteHandler = (data) => {
    dispatch(removeContent(data, delAbuseId));
  };

  useEffect(() => {
    if (success) {
      history.push("/reportabuselist");
    }
  }, [success, history]);

  return (
    <>
      {error && <ErrorToast message={error} />}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>
            <strong>Content Drop</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          Sure, you want to remove content from platform ?
        </Modal.Body>
        <Modal.Body className="modal-body">
          <form onSubmit={handleSubmit(deleteHandler)}>
            <textarea
              style={{ width: "100%", fontSize: "15px" }}
              rows={9}
              {...register("reason")}
              placeholder="Reason to drop.."
            />
            {errors.reason && (
              <p className="text-danger small p-1">{errors.reason.message}</p>
            )}
            <div style={{ margin: "10px", float: "right" }}>
              <Button variant="secondary" onClick={() => setShow(false)}>
                <i className="fas fa-times"></i> Cancel
              </Button>
              {loading ? (
                <Button variant="dark" disabled type="submit" className="mx-3">
                  <Spinner
                    animation="border"
                    size="sm"
                    style={{ marginRight: "5px", marginBottom: "3px" }}
                  />{" "}
                  Submiting...
                </Button>
              ) : (
                <Button variant="dark" type="submit" className="mx-3">
                  <i className="fas fa-check"></i> Submit
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(RemoveModal);
