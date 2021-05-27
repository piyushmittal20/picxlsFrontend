import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { dropping } from "../actions/userActions";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const DropModal = ({ show, setShow }) => {
  const schema = yup.object().shape({
    reason: yup.string().required("This Field is Required").max(50).trim(),
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

  const userId = localStorage.getItem("userDropId");

  const deleteHandler = (data) => {
    if (userId) {
      dispatch(dropping(data, userId));
      localStorage.removeItem("userVerifyId");
      setShow(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>
            <strong>Drop User</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          Sure, you want to Drop the user ?
        </Modal.Body>
        <Modal.Body className="modal-body">
          <form onSubmit={handleSubmit(deleteHandler)}>
            <input
              className="modal-input"
              type="text"
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
              <Button variant="dark" type="submit" className="mx-3">
                <i className="fas fa-check"></i> Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DropModal;
