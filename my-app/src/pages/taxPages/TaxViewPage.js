import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTaxDetail } from "../../actions/taxActions";
import { OverlayTrigger, Tooltip, Row } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import Meta from "../../components/Meta";
import DeleteModal from "../../components/DeleteModal";

const TaxViewPage = ({ history, match }) => {
  const taxId = match.params.id;

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const taxDetail = useSelector((state) => state.taxDetail);
  const { loading, error, tax } = taxDetail;

  const deleteTax = useSelector((state) => state.deleteTax);
  const { success: deleteSuccess } = deleteTax;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    }
    if (deleteSuccess) {
      history.push("/taxlist");
    } else {
      dispatch(getTaxDetail(taxId));
    }
  }, [dispatch, adminInfo, history, taxId, deleteSuccess]);

  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    localStorage.setItem("delTaxId", id);
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Meta title={`${tax && tax.title} - Picxls`} />
      {/* {show2 && <Modals show={show2} setShow={setShow2} status={status} />} */}
      {show && <DeleteModal show={show} setShow={setShow} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error.message} />
      ) : (
        <container>
          <div className="container-fluid mt-10 pb-18">
            <div
              className="d-flex align-items-stretch justify-content-between"
              style={{ marginBottom: "20px", marginTop: "25px" }}
            >
              <h2 className="head">
                {" "}
                <Link to="/taxlist">
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
                Tax Details
              </h2>
            </div>
            {tax && (
              <Row className="box">
                <div className="card  shadow">
                  <div className="card-header">
                    <h3 className="card-title">{tax.title}</h3>
                    <div className="card-toolbar">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={(props) => <Tooltip {...props}>Edit</Tooltip>}
                      >
                        <Link className="mr-15" to={`/edittax/${tax._id}`}>
                          <FaEdit />
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={(props) => (
                          <Tooltip {...props}>Delete</Tooltip>
                        )}
                      >
                        <span
                          onClick={() => {
                            handleShow();
                            deleteHandler(tax._id);
                          }}
                        >
                          <FaTrashAlt style={{ color: "red" }} />
                        </span>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="">
                      <div class="">
                        <table class="table table-borderless align-middle fw-bold">
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Name</td>
                            <td class="tdpd text-dark pe-0">{tax.title}</td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Country</td>
                            <td class="tdpd text-dark pe-0">
                              {tax.country && tax.country.title}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Sate</td>
                            <td class="tdpd text-dark pe-0">
                              {tax.state && tax.state.title}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">Added on</td>
                            <td class="tdpd text-dark pe-0">
                              {tax.createdAt && tax.createdAt.substring(0, 10)}
                            </td>
                          </tr>
                          <tr>
                            <td class="tdpd text-gray-600 ps-0">
                              Tax Percentage
                            </td>
                            <td class="tdpd text-dark pe-0">
                              {tax.taxPercentage}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            )}
          </div>
        </container>
      )}
    </div>
  );
};

export default TaxViewPage;
