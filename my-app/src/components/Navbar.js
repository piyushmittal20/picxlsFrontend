import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import LogoutBox from "./LogoutBox";
import { Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <>
      {show && <LogoutBox show={show} setShow={setShow} />}
      <div
        id="kt_header"
        class="header"
        data-kt-sticky="true"
        data-kt-sticky-name="header"
        data-kt-sticky-offset="{default: '200px', lg: '300px'}"
      >
        <div class="container-fluid d-flex align-items-stretch justify-content-between">
          <div class="d-flex align-items-center">
            <button
              class="btn btn-icon btn-accent me-2 me-lg-6"
              id="kt_mega_menu_toggle"
              data-bs-toggle="modal"
              data-bs-target="#kt_mega_menu_modal"
            >
              <span class="svg-icon svg-icon-1">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <rect x="0" y="0" width="24" height="24" />
                    <rect
                      fill="#ffffff"
                      x="4"
                      y="5"
                      width="16"
                      height="3"
                      rx="1.5"
                    />
                    <path
                      d="M5.5,15 L18.5,15 C19.3284271,15 20,15.6715729 20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 Z M5.5,10 L12.5,10 C13.3284271,10 14,10.6715729 14,11.5 C14,12.3284271 13.3284271,13 12.5,13 L5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 Z"
                      fill="#ffffff"
                      opacity="0.3"
                    />
                  </g>
                </svg>
              </span>
            </button>
            <h2>Picxls - Admin </h2>
          </div>
          <div class="d-flex align-items-center">
            <div class="ms-1 ms-lg-6" onClick={handleClick}>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={(props) => <Tooltip {...props}>Logout</Tooltip>}
              >
                <IoIosLogOut
                  style={{
                    color: "#09204e",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                />
              </OverlayTrigger>
            </div>
            <div
              className="modal bg-white fade"
              id="kt_mega_menu_modal"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content shadow-none">
                  <div className="container">
                    <div className="modal-header d-flex align-items-center justify-content-between border-0">
                      <div className="d-flex align-items-center">
                        {/*begin::Logo*/}
                        <a href="../index-2.html">
                          <img
                            alt="Logo"
                            src="../assets/media/picxls-logo.png"
                            className="h-30px"
                          />
                        </a>
                        {/*end::Logo*/}
                      </div>
                      {/*begin::Close*/}
                      <div
                        className="btn btn-icon btn-light-primary ms-2"
                        data-bs-dismiss="modal"
                      >
                        {/*begin::Svg Icon | path: '.svg/icons/Navigation/Close.svg.'*/}
                        <span className="svg-icon svg-icon-2x">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth={1}
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                                fill="#000000"
                              >
                                <rect
                                  x={0}
                                  y={7}
                                  width={16}
                                  height={2}
                                  rx={1}
                                />
                                <rect
                                  opacity="0.3"
                                  transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
                                  x={0}
                                  y={7}
                                  width={16}
                                  height={2}
                                  rx={1}
                                />
                              </g>
                            </g>
                          </svg>
                        </span>
                        {/*end::Svg Icon*/}
                      </div>
                      {/*end::Close*/}
                    </div>
                    <div className="modal-body">
                      {/*begin::Row*/}
                      <div className="row py-10 g-5">
                        {/*begin::Column*/}
                        <div className="col-lg-6 pe-lg-25">
                          {/*begin::Row*/}
                          <div className="row">
                            <div className="col-sm-4">
                              <h3 className="fw-bolder mb-5">Dashboards</h3>
                              <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
                                <li className="menu-item">
                                  <a className="menu-link ps-0 py-2" href="/">
                                    Home
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-sm-4">
                              <h3 className="fw-bolder mb-5">CMS</h3>
                              <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
                                <li className="menu-item">
                                  <Link
                                    className="menu-link ps-0 py-2"
                                    to="/countrylist"
                                  >
                                    Manage Page
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="col-sm-4">
                              <h3 className="fw-bolder mb-5">
                                Master Settings
                              </h3>
                              <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
                                <li className="menu-item">
                                  <Link
                                    className="menu-link ps-0 py-2"
                                    to="/countrylist"
                                  >
                                    Manage Country
                                  </Link>
                                </li>
                                <li className="menu-item">
                                  <Link
                                    className="menu-link ps-0 py-2"
                                    to="/statelist"
                                  >
                                    Manage State
                                  </Link>
                                </li>
                                <li className="menu-item">
                                  <Link
                                    className="menu-link ps-0 py-2"
                                    to="/citylist"
                                  >
                                    Manage City
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*end::Row*/}
                          {/*begin::Row*/}
                          {/*end::Row*/}
                        </div>
                        {/*end::Column*/}
                        {/*begin::Column*/}
                        {/*end::Column*/}
                      </div>
                      {/*end::Row*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal bg-white fade"
              id="kt_header_search_modal"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content shadow-none">
                  <div className="container w-lg-800px">
                    <div className="modal-header d-flex justify-content-end border-0">
                      {/*begin::Close*/}
                      <div
                        className="btn btn-icon btn-light-primary ms-2"
                        data-bs-dismiss="modal"
                      >
                        {/*begin::Svg Icon | path: '.svg/icons/Navigation/Close.svg.'*/}
                        <span className="svg-icon svg-icon-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              strokeWidth={1}
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                                fill="#000000"
                              >
                                <rect
                                  x={0}
                                  y={7}
                                  width={16}
                                  height={2}
                                  rx={1}
                                />
                                <rect
                                  opacity="0.3"
                                  transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
                                  x={0}
                                  y={7}
                                  width={16}
                                  height={2}
                                  rx={1}
                                />
                              </g>
                            </g>
                          </svg>
                        </span>
                        {/*end::Svg Icon*/}
                      </div>
                      {/*end::Close*/}
                    </div>
                    <div className="modal-body">
                      {/*begin::Search*/}
                      <form className="pb-10">
                        <input
                          autofocus
                          type="text"
                          className="form-control bg-transparent border-0 fs-4x text-center fw-normal"
                          name="query"
                          placeholder="Search..."
                        />
                      </form>
                      {/*end::Search*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal modal-sticky modal-sticky-lg modal-sticky-bottom-right"
              id="kt_inbox_compose"
              role="dialog"
              data-backdrop="false"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  {/*begin::Form*/}
                  <form id="kt_inbox_compose_form">
                    {/*begin::Header*/}
                    <div className="d-flex align-items-center justify-content-between py-5 ps-8 pe-5 border-bottom">
                      <h5 className="fw-bold m-0">Compose</h5>
                      <div className="d-flex ms-2">
                        {/*begin::Close*/}
                        <div
                          className="btn btn-icon btn-sm btn-light-primary ms-2"
                          data-bs-dismiss="modal"
                        >
                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Close.svg.'*/}
                          <span className="svg-icon svg-icon-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth={1}
                                fill="none"
                                fillRule="evenodd"
                              >
                                <g
                                  transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                                  fill="#000000"
                                >
                                  <rect
                                    x={0}
                                    y={7}
                                    width={16}
                                    height={2}
                                    rx={1}
                                  />
                                  <rect
                                    opacity="0.3"
                                    transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
                                    x={0}
                                    y={7}
                                    width={16}
                                    height={2}
                                    rx={1}
                                  />
                                </g>
                              </g>
                            </svg>
                          </span>
                          {/*end::Svg Icon*/}
                        </div>
                        {/*end::Close*/}
                      </div>
                    </div>
                    {/*end::Header*/}
                    {/*begin::Body*/}
                    <div className="d-block">
                      {/*begin::To*/}
                      <div className="d-flex align-items-center border-bottom inbox-to px-8 min-h-45px">
                        <div className="text-gray-600 w-75px">To:</div>
                        <div className="d-flex align-items-center flex-grow-1">
                          <input
                            type="text"
                            className="form-control border-0"
                            name="compose_to"
                            defaultValue="Chris Muller, Lina Nilson"
                          />
                        </div>
                        <div className="ms-2">
                          <span
                            className="text-muted fw-bold cursor-pointer text-hover-primary me-2"
                            data-inbox="cc-show"
                          >
                            Cc
                          </span>
                          <span
                            className="text-muted fw-bold cursor-pointer text-hover-primary"
                            data-inbox="bcc-show"
                          >
                            Bcc
                          </span>
                        </div>
                      </div>
                      {/*end::To*/}
                      {/*begin::CC*/}
                      <div className="d-none align-items-center border-bottom inbox-to-cc ps-8 pe-5 min-h-45px">
                        <div className="text-gray-600 w-75px">Cc:</div>
                        <div className="flex-grow-1">
                          <input
                            type="text"
                            className="form-control border-0"
                            name="compose_cc"
                            defaultValue
                          />
                        </div>
                        <span
                          className="btn btn-active-light-primary btn-sm btn-icon"
                          data-inbox="cc-hide"
                        >
                          <i className="la la-close" />
                        </span>
                      </div>
                      {/*end::CC*/}
                      {/*begin::BCC*/}
                      <div className="d-none align-items-center border-bottom inbox-to-bcc ps-8 pe-5 min-h-45px">
                        <div className="text-gray-600 w-75px">Bcc:</div>
                        <div className="flex-grow-1">
                          <input
                            type="text"
                            className="form-control border-0"
                            name="compose_bcc"
                            defaultValue
                          />
                        </div>
                        <span
                          className="btn btn-active-light-primary btn-sm btn-icon"
                          data-inbox="bcc-hide"
                        >
                          <i className="la la-close" />
                        </span>
                      </div>
                      {/*end::BCC*/}
                      {/*begin::Subject*/}
                      <div className="border-bottom">
                        <input
                          className="form-control border-0 px-8 min-h-45px"
                          name="compose_subject"
                          placeholder="Subject"
                        />
                      </div>
                      {/*end::Subject*/}
                      {/*begin::Message*/}
                      <div
                        id="kt_inbox_compose_editor"
                        className="border-0 h-125px h-lg-250px"
                      />
                      {/*end::Message*/}
                      {/*begin::Attachments*/}
                      <div
                        className="dropzone dropzone-multi px-8 py-4"
                        id="kt_inbox_compose_attachments"
                      >
                        <div className="dropzone-items">
                          <div
                            className="dropzone-item"
                            style={{ display: "none" }}
                          >
                            <div className="dropzone-file">
                              <div
                                className="dropzone-filename"
                                title="some_image_file_name.jpg"
                              >
                                <span data-dz-name>
                                  some_image_file_name.jpg
                                </span>
                                <strong>
                                  (<span data-dz-size>340kb</span>)
                                </strong>
                              </div>
                              <div
                                className="dropzone-error"
                                data-dz-errormessage
                              />
                            </div>
                            <div className="dropzone-progress">
                              <div className="progress">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-valuenow={0}
                                  data-dz-uploadprogress
                                />
                              </div>
                            </div>
                            <div className="dropzone-toolbar">
                              <span className="dropzone-delete" data-dz-remove>
                                {/*begin::Close*/}
                                <span
                                  className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                                  data-bs-dismiss="modal"
                                >
                                  {/*begin::Svg Icon | path: '.svg/icons/Navigation/Close.svg.'*/}
                                  <span className="svg-icon svg-icon-1">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      width="24px"
                                      height="24px"
                                      viewBox="0 0 24 24"
                                      version="1.1"
                                    >
                                      <g
                                        stroke="none"
                                        strokeWidth={1}
                                        fill="none"
                                        fillRule="evenodd"
                                      >
                                        <g
                                          transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                                          fill="#000000"
                                        >
                                          <rect
                                            x={0}
                                            y={7}
                                            width={16}
                                            height={2}
                                            rx={1}
                                          />
                                          <rect
                                            opacity="0.3"
                                            transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)"
                                            x={0}
                                            y={7}
                                            width={16}
                                            height={2}
                                            rx={1}
                                          />
                                        </g>
                                      </g>
                                    </svg>
                                  </span>
                                  {/*end::Svg Icon*/}
                                </span>
                                {/*end::Close*/}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end::Attachments*/}
                    </div>
                    {/*end::Body*/}
                    {/*begin::Footer*/}
                    <div className="d-flex align-items-center justify-content-between py-5 ps-8 pe-5 border-top">
                      {/*begin::Actions*/}
                      <div className="d-flex align-items-center me-3">
                        {/*begin::Send*/}
                        <button className="btn btn-primary me-4 px-6">
                          Send
                        </button>
                        {/*end::Send*/}
                        {/*begin::Other*/}
                        <a
                          href="#"
                          className="btn btn-icon btn-active-light-primary me-2"
                          id="kt_inbox_compose_attachments_select"
                        >
                          {/*begin::Svg Icon | path: '.svg/icons/Files/Cloud-upload.svg.'*/}
                          <span className="svg-icon svg-icon-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth={1}
                                fill="none"
                                fillRule="evenodd"
                              >
                                <polygon points="0 0 24 0 24 24 0 24" />
                                <path
                                  d="M5.74714567,13.0425758 C4.09410362,11.9740356 3,10.1147886 3,8 C3,4.6862915 5.6862915,2 9,2 C11.7957591,2 14.1449096,3.91215918 14.8109738,6.5 L17.25,6.5 C19.3210678,6.5 21,8.17893219 21,10.25 C21,12.3210678 19.3210678,14 17.25,14 L8.25,14 C7.28817895,14 6.41093178,13.6378962 5.74714567,13.0425758 Z"
                                  fill="#000000"
                                  opacity="0.3"
                                />
                                <path
                                  d="M11.1288761,15.7336977 L11.1288761,17.6901712 L9.12120481,17.6901712 C8.84506244,17.6901712 8.62120481,17.9140288 8.62120481,18.1901712 L8.62120481,19.2134699 C8.62120481,19.4896123 8.84506244,19.7134699 9.12120481,19.7134699 L11.1288761,19.7134699 L11.1288761,21.6699434 C11.1288761,21.9460858 11.3527337,22.1699434 11.6288761,22.1699434 C11.7471877,22.1699434 11.8616664,22.1279896 11.951961,22.0515402 L15.4576222,19.0834174 C15.6683723,18.9049825 15.6945689,18.5894857 15.5161341,18.3787356 C15.4982803,18.3576485 15.4787093,18.3380775 15.4576222,18.3202237 L11.951961,15.3521009 C11.7412109,15.173666 11.4257142,15.1998627 11.2472793,15.4106128 C11.1708299,15.5009075 11.1288761,15.6153861 11.1288761,15.7336977 Z"
                                  fill="#000000"
                                  fillRule="nonzero"
                                  transform="translate(11.959697, 18.661508) rotate(-90.000000) translate(-11.959697, -18.661508)"
                                />
                              </g>
                            </svg>
                          </span>
                          {/*end::Svg Icon*/}
                        </a>
                        <a
                          href="#"
                          className="btn btn-icon btn-active-light-primary"
                        >
                          {/*begin::Svg Icon | path: '.svg/icons/Map/Marker1.svg.'*/}
                          <span className="svg-icon svg-icon-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth={1}
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x={0} y={0} width={24} height={24} />
                                <path
                                  d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z"
                                  fill="#000000"
                                  fillRule="nonzero"
                                />
                              </g>
                            </svg>
                          </span>
                          {/*end::Svg Icon*/}
                        </a>
                        {/*end::Other*/}
                      </div>
                      {/*end::Actions*/}
                      {/*begin::Toolbar*/}
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-icon btn-active-light-primary me-2"
                          data-bs-toggle="tooltip"
                          title="More actions"
                        >
                          {/*begin::Svg Icon | path: '.svg/icons/General/Settings-2.svg.'*/}
                          <span className="svg-icon svg-icon-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth={1}
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x={0} y={0} width={24} height={24} />
                                <path
                                  d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z"
                                  fill="#000000"
                                />
                              </g>
                            </svg>
                          </span>
                          {/*end::Svg Icon*/}
                        </button>
                      </div>
                      {/*end::Toolbar*/}
                    </div>
                    {/*end::Footer*/}
                  </form>
                  {/*end::Form*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
