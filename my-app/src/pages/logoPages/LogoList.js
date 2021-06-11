import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import { getLogoList } from "../../actions/logoActions";
import { Image, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Meta from "../../components/Meta";
import moment from "moment";
import {ADMIN_LOGOUPDATE_RESET} from '../../constants/adminConstants'

const LogoList = ({ history }) => {
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const logoList = useSelector((state) => state.logoList);
  const { loading, error, logos } = logoList;

  useEffect(() => {
    if (adminInfo) {
        dispatch({type: ADMIN_LOGOUPDATE_RESET})
      dispatch(getLogoList());
    } else {
      history.push("/logolist");
    }
  }, [adminInfo, dispatch, history]);

  return (
    <div className="wapper" style={{ paddingBottom: "50px" }}>
      <Meta title="Logo - Picxls" />
      {error && <ErrorToast message={error} />}
      {loading ? (
        <Loader />
      ) : logos !== undefined ? (
        <div className="container-fluid mt-10 pb-18">
          <div
            className="d-flex align-items-stretch justify-content-between"
            style={{ marginBottom: "20px" }}
          >
            <h2 className="head">
              {" "}
              <Link to="/">
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
              Logo Listing
            </h2>
          </div>
          <table id="datatable1" className="table table-row-bordered gy-5">
            <thead>
              <tr className="fw-bold fs-6 text-muted">
                <th className="colorblack">
                  <bold>#</bold>
                </th>
                <th className="colorblack">Title</th>
                <th className="colorblack">Logo</th>
                <th className="colorblack">Created On</th>
                <th className="colorblack">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logos &&
                logos.map((logo, index) => (
                  <tr key={logo._id}>
                    <td>{index + 1}.</td>
                    <td>{logo.title}</td>
                    <td>
                      <Image style={{height: '35px'}} src={logo.image} alt="logo" />
                    </td>
                    <td>
                      {moment(logo.createdAt.substring(0, 10)).format(
                        "MMMM DD YYYY"
                      )}
                    </td>
                    <td>
                      <ul className="action-list">
                        <Link to={`/editlogo/${logo._id}`}>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={(props) => (
                              <Tooltip {...props}>Edit</Tooltip>
                            )}
                          >
                            <li className="action-list-item">
                              <FaEdit />
                            </li>
                          </OverlayTrigger>
                        </Link>
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="errorCmp">
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error! 😐</Alert.Heading>
            <p>
              We are unable to serve data. Something went wrong, please check
              your internet connection or try again later.
            </p>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default LogoList;
