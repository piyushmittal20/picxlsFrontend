import {useEffect} from "react";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

const Dashboard = ({history}) => {

  const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

  useEffect(() => {
    if(!adminInfo) {
      history.push('/admin-login')
    }
  }, [history, adminInfo])

  return (
    <>
      {/*begin::Main*/}
      {/*begin::Root*/}
      <div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="page d-flex flex-row flex-column-fluid">
          {/*begin::Aside*/}
          <div
            id="kt_aside"
            className="aside bg-info"
            data-kt-offcanvas="true"
            data-kt-offcanvas-name="aside"
            data-kt-offcanvas-activate="{default: true, lg: false}"
            data-kt-offcanvas-overlay="true"
            data-kt-offcanvas-width="{default:'200px', '300px': '250px'}"
            data-kt-offcanvas-direction="left"
            data-kt-offcanvas-toggle="#kt_aside_toggler"
            data-kt-offcanvas-close
          >
            {/*begin::Secondary*/}
            <div className="aside-secondary d-flex flex-row-fluid bg-white">
              {/*begin::Workspace*/}
              <div
                className="aside-workspace my-7 ps-5 pe-4 ps-lg-10 pe-lg-6"
                id="kt_aside_wordspace"
              >
                {/*begin::Logo*/}
                {/*<div className="aside-logo py-2 pb-7" id="kt_aside_logo">
                  <a href="../index-2.html">
                    <img
                      alt="Logo"
                      src="../assets/media/logos/logo-compact.svg"
                      className="mh-50px"
                    />
                  </a>
                </div>*/}
                {/*end::Logo*/}
                {/*begin::Aside Menu*/}
                {/*begin::Menu*/}
                <div
                  className="menu menu-column menu-rounded menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-6"
                  data-kt-menu="true"
                >
                  <div
                    className="hover-scroll-y pe-4 pe-lg-5"
                    id="kt_aside_menu_scroll"
                    data-kt-scroll="true"
                    data-kt-scroll-height="auto"
                    data-kt-scroll-dependencies="#kt_aside_logo"
                    data-kt-scroll-wrappers="#kt_aside_wordspace"
                    data-kt-scroll-offset="10px"
                  >
                    <div className="menu-wrapper menu-column menu-fit">
                      <div className="menu-item here show">
                      
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/">
                              <span className="menu-title">Dashboard</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                            Master Settings
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/countrylist">
                              <span className="menu-title">Manage Country</span>
                            </Link>
                          </div>
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/statelist">
                              <span className="menu-title">Manage State</span>
                            </Link>
                          </div>
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/citylist">
                              <span className="menu-title">Manage City</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          CMS
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/CMS">
                              <span className="menu-title">Manage Pages</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          User Management
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/userlist">
                              <span className="menu-title">Manage Users</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          Startag Management
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/startaglist">
                              <span className="menu-title">Manage Startags</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          User Verification Management
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/requestList">
                              <span className="menu-title">Manage Verification Requests</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          Post Management
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/postlist">
                              <span className="menu-title">Manage Posts</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*end::Menu*/}
              </div>
              {/*end::Workspace*/}
            </div>
            {/*end::Secondary*/}
          </div>
          {/*end::Aside*/}
          {/*begin::Wrapper*/}
          <div
            className="wrapper d-flex flex-column flex-row-fluid"
            id="kt_wrapper"
          >
            {/*begin::Main*/}
            <div className="d-flex flex-column flex-column-fluid">
              {/*begin::Content*/}
              <div
                className="content fs-6 d-flex flex-column-fluid"
                id="kt_content"
              >
                {/*begin::Container*/}
                <div className="container">
                  {/*begin::Row*/}
                  <div className="row g-0 g-xl-5 g-xxl-8"></div>
                  {/*end::Row*/}
                  {/*begin::Row*/}
                  <div className="row g-0 g-xl-5 g-xxl-8">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-8"></div>
                  </div>
                  {/*end::Row*/}
                  {/*begin::Row*/}
                  <div className="row g-0 g-xl-5 g-xxl-8">
                    <div className="col-xxl-4">
                      {/*begin::Stats Widget 6*/}

                      {/*end::Stats Widget 6*/}
                    </div>
                  </div>
                  {/*end::Row*/}

                  {/*begin::Row r*/}
                  <div className="row g-0 g-xl-5 g-xxl-8">
                    <div className="col-xl-4">
                      {/*begin::Stats Widget 8*/}
                      <div className="card card-custom card-stretch-50 mb-5 mb-xxl-8">
                        {/*begin::Body*/}
                        <div className="card-body">
                          <div
                            id="kt_stats_widget_8_carousel"
                            className="carousel carousel-custom slide"
                            data-bs-ride="carousel"
                            data-bs-interval={8000}
                          >
                            {/*begin::Heading*/}
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                              {/*begin::Label*/}
                              <span className="fs-6 text-muted fw-bolder pe-2">
                                Projects
                              </span>
                              {/*end::Label*/}
                              {/*begin::Carousel Indicators*/}
                              <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                                <li
                                  data-bs-target="#kt_stats_widget_8_carousel"
                                  data-bs-slide-to={0}
                                  className="ms-1 active"
                                />
                                <li
                                  data-bs-target="#kt_stats_widget_8_carousel"
                                  data-bs-slide-to={1}
                                  className="ms-1"
                                />
                                <li
                                  data-bs-target="#kt_stats_widget_8_carousel"
                                  data-bs-slide-to={2}
                                  className="ms-1"
                                />
                              </ol>
                              {/*end::Carousel Indicators*/}
                            </div>
                            {/*end::Heading*/}
                            {/*begin::Carousel*/}
                            <div className="carousel-inner pt-8">
                              {/*begin::Item*/}
                              <div className="carousel-item active">
                                {/*begin::Section*/}
                                <div className="d-flex flex-column justify-content-between h-100">
                                  {/*begin::Title*/}
                                  <h3 className="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">
                                    Admin Launch Day
                                  </h3>
                                  {/*end::Title*/}
                                  {/*begin::Text*/}
                                  <p className="text-gray-600 fw-bold pt-3 mb-0">
                                    To start a blog, think of a topic about and
                                    first brainstorm ways to write details
                                  </p>
                                  {/*end::Text*/}
                                </div>
                                {/*end::Section*/}
                              </div>
                              {/*end::Item*/}
                              {/*begin::Item*/}
                              <div className="carousel-item">
                                {/*begin::Section*/}
                                <div className="d-flex flex-column justify-content-between h-100">
                                  {/*begin::Title*/}
                                  <h3 className="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">
                                    Reached 50,000 Sales
                                  </h3>
                                  {/*end::Title*/}
                                  {/*begin::Text*/}
                                  <p className="text-gray-600 fw-bold pt-3 mb-0">
                                    To start a blog, think of a topic about and
                                    first brainstorm ways to write details
                                  </p>
                                  {/*end::Text*/}
                                </div>
                                {/*end::Section*/}
                              </div>
                              {/*end::Item*/}
                              {/*begin::Item*/}
                              <div className="carousel-item">
                                {/*begin::Section*/}
                                <div className="d-flex flex-column justify-content-between h-100">
                                  {/*begin::Title*/}
                                  <h3 className="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">
                                    Reached 50,000 Sales
                                  </h3>
                                  {/*end::Title*/}
                                  {/*begin::Text*/}
                                  <p className="text-gray-600 fw-bold pt-3 mb-0">
                                    To start a blog, think of a topic about and
                                    first brainstorm ways to write details
                                  </p>
                                  {/*end::Text*/}
                                </div>
                                {/*end::Section*/}
                              </div>
                              {/*end::Item*/}
                            </div>
                            {/*end::Carousel*/}
                          </div>
                        </div>
                        {/*end::Body*/}
                        {/*begin::Footer*/}
                        <div className="card-footer border-0 pt-0 pb-10">
                          {/*begin::Text*/}
                          <div className="d-flex text-muted fw-bold fs-6 pb-4">
                            <span className="flex-grow-1">Progress</span>
                            <span className>78%</span>
                          </div>
                          {/*end::Text*/}
                          {/*begin::Progress*/}
                          <div className="progress h-6px bg-light-danger">
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              style={{ width: "70%" }}
                              aria-valuenow={24}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          {/*end::Progress*/}
                        </div>
                        {/*end::Footer*/}
                      </div>
                      {/*end::Stats Widget 8*/}
                      {/*begin::Stats Widget 9*/}
                      <div className="card card-custom card-stretch-50 mb-5 mb-xxl-8">
                        {/*begin::Body*/}
                        <div className="card-body">
                          <div
                            id="kt_stats_widget_9_carousel"
                            className="carousel carousel-custom slide"
                            data-bs-ride="carousel"
                            data-bs-interval={8000}
                          >
                            {/*begin::Top*/}
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                              {/*begin::Label*/}
                              <span className="text-muted fw-bolder pe-2">
                                Today’s Schedule
                              </span>
                              {/*end::Label*/}
                              {/*begin::Carousel Indicators*/}
                              <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                                <li
                                  data-bs-target="#kt_stats_widget_9_carousel"
                                  data-bs-slide-to={0}
                                  className="ms-1 active"
                                />
                                <li
                                  data-bs-target="#kt_stats_widget_9_carousel"
                                  data-bs-slide-to={1}
                                  className="ms-1"
                                />
                                <li
                                  data-bs-target="#kt_stats_widget_9_carousel"
                                  data-bs-slide-to={2}
                                  className="ms-1"
                                />
                              </ol>
                              {/*end::Carousel Indicators*/}
                            </div>
                            {/*end::Top*/}
                            {/*begin::Carousel*/}
                            <div className="carousel-inner pt-9">
                              {/*begin::Item*/}
                              <div className="carousel-item active">
                                {/*begin::Section*/}
                                <div className="flex-grow-1">
                                  {/*begin::Title*/}
                                  <h3 className="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">
                                    UI/UX Design Updates
                                  </h3>
                                  {/*end::Title*/}
                                  {/*begin::Text*/}
                                  <p className="text-primary fs-1 fw-bolder pt-3 mb-0">
                                    11:15AM - 12:30PM
                                  </p>
                                  {/*end::Text*/}
                                </div>
                                {/*end::Section*/}
                              </div>
                              {/*end::Item*/}
                              {/*begin::Item*/}
                              <div className="carousel-item">
                                {/*begin::Section*/}
                                <div className="flex-grow-1">
                                  {/*begin::Title*/}
                                  <h3 className="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">
                                    UI/UX Design Updates
                                  </h3>
                                  {/*end::Title*/}
                                  {/*begin::Text*/}
                                  <p className="text-primary fs-1 fw-bolder pt-3 mb-0">
                                    16:15AM - 11:20PM
                                  </p>
                                  {/*end::Text*/}
                                </div>
                                {/*end::Section*/}
                              </div>
                              {/*end::Item*/}
                              {/*begin::Item*/}
                              <div className="carousel-item">
                                {/*begin::Section*/}
                                <div className="flex-grow-1">
                                  {/*begin::Title*/}
                                  <h3 className="fs-3 text-gray-800 text-hover-primary fw-bolder cursor-pointer">
                                    UI/UX Design Updates
                                  </h3>
                                  {/*end::Title*/}
                                  {/*begin::Text*/}
                                  <p className="text-primary fs-1 fw-bolder pt-3 mb-0">
                                    13:15AM - 14:30PM
                                  </p>
                                  {/*end::Text*/}
                                </div>
                                {/*end::Section*/}
                              </div>
                              {/*end::Item*/}
                            </div>
                            {/*end::Carousel*/}
                          </div>
                        </div>
                        {/*end::Body*/}
                        {/*begin::Footer*/}
                        <div className="card-footer border-0 d-flex align-items-center justify-content-between pt-0 pb-10">
                          {/*begin::Label*/}
                          <span className="text-muted fs-6 fw-bold pe-2">
                            256 R St. Manhattan NY..
                          </span>
                          {/*end::Label*/}
                          <a
                            href="#"
                            className="btn btn-sm btn-primary fw-bolder px-6"
                            data-bs-toggle="modal"
                            data-bs-target="#kt_modal_select_location"
                          >
                            Map
                          </a>
                        </div>
                        {/*end::Footer*/}
                      </div>
                      {/*end::Stats Widget 9*/}
                    </div>
                    <div className="col-xl-8">
                      {/*begin::Table Widget 2*/}
                      <div className="card card-custom card-stretch">
                        {/*begin::Header*/}
                        <div className="card-header border-0 pt-5">
                          <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bolder text-dark fs-3">
                              Achievement
                            </span>
                            <span className="text-muted mt-2 fw-bold fs-6">
                              890,344 Sales
                            </span>
                          </h3>
                          <div className="card-toolbar">
                            <ul className="nav nav-pills nav-pills-sm nav-light">
                              <li className="nav-item">
                                <a
                                  className="nav-link btn btn-active-light btn-color-muted py-2 px-4 active fw-bolder me-2"
                                  data-bs-toggle="tab"
                                  href="#kt_tab_pane_2_1"
                                >
                                  Day
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link btn btn-active-light btn-color-muted py-2 px-4 fw-bolder me-2"
                                  data-bs-toggle="tab"
                                  href="#kt_tab_pane_2_2"
                                >
                                  Week
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link btn btn-active-light btn-color-muted py-2 px-4 fw-bolder"
                                  data-bs-toggle="tab"
                                  href="#kt_tab_pane_2_3"
                                >
                                  Month
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/*end::Header*/}
                        {/*begin::Body*/}
                        <div className="card-body pt-3 pb-0 mt-n3">
                          <div className="tab-content mt-4" id="myTabTables2">
                            {/*begin::Tap pane*/}
                            <div
                              className="tab-pane fade show active"
                              id="kt_tab_pane_2_1"
                              role="tabpanel"
                              aria-labelledby="kt_tab_pane_2_1"
                            >
                              {/*begin::Table*/}
                              <div className="table-responsive">
                                <table className="table table-borderless align-middle">
                                  <thead>
                                    <tr>
                                      <th className="p-0 w-50px" />
                                      <th className="p-0 min-w-150px" />
                                      <th className="p-0 min-w-120px" />
                                      <th className="p-0 min-w-70px" />
                                      <th className="p-0 min-w-70px" />
                                      <th className="p-0 min-w-50px" />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="px-0 py-3">
                                        <div className="symbol symbol-55px mt-1 me-5">
                                          <span className="symbol-label bg-light-primary align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/001-boy.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Brad Simmons
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          HTML, CSS Coding
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $1,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-primary">
                                          +28%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-0 py-3">
                                        <div className="symbol symbol-55px mt-1">
                                          <span className="symbol-label bg-light-danger align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/018-girl-9.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Jessie Clarcson
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Most Successful
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $1,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-danger">
                                          +52%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-0 py-3">
                                        <div className="symbol symbol-55px mt-1">
                                          <span className="symbol-label bg-light-warning align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/047-girl-25.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Lebron Wayde
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Awesome Users
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $3,400,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-warning">
                                          +34%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-0 py-3">
                                        <div className="symbol symbol-55px mt-1">
                                          <span className="symbol-label bg-light-success align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/043-boy-18.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Kevin Leonard
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Awesome Userss
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $35,600,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-success">
                                          +230%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-0 py-3">
                                        <div className="symbol symbol-55px mt-1">
                                          <span className="symbol-label bg-light-info align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/024-boy-9.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Randy Trent
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Business Analyst
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $45,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-success">
                                          +340%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {/*end::Table*/}
                            </div>
                            {/*end::Tap pane*/}
                            {/*begin::Tap pane*/}
                            <div
                              className="tab-pane fade"
                              id="kt_tab_pane_2_2"
                              role="tabpanel"
                              aria-labelledby="kt_tab_pane_2_2"
                            >
                              {/*begin::Table*/}
                              <div className="table-responsive">
                                <table className="table table-borderless align-middle">
                                  <thead>
                                    <tr>
                                      <th className="p-0 w-50px" />
                                      <th className="p-0 min-w-150px" />
                                      <th className="p-0 min-w-120px" />
                                      <th className="p-0 min-w-70px" />
                                      <th className="p-0 min-w-70px" />
                                      <th className="p-0 min-w-50px" />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="p-0 py-3">
                                        <div className="symbol symbol-55px mt-1 me-5">
                                          <span className="symbol-label bg-light-warning align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/047-girl-25.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Lebron Wayde
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Awesome Users
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $3,400,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-warning">
                                          +34%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 py-3">
                                        <div className="symbol symbol-55px mt-1">
                                          <span className="symbol-label bg-light-success align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/043-boy-18.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Kevin Leonard
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Awesome Userss
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $35,600,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-success">
                                          +230%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 py-3">
                                        <div className="symbol symbol-55px mt-1">
                                          <span className="symbol-label bg-light-info align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/024-boy-9.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Randy Trent
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Business Analyst
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $45,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-success">
                                          +340%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 py-3">
                                        <div className="symbol symbol-55px me-5 mt-1">
                                          <span className="symbol-label bg-light-primary align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/001-boy.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Brad Simmons
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          HTML, CSS Coding
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $1,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-primary">
                                          +28%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 py-3">
                                        <div className="symbol symbol-55px mt-1">
                                          <span className="symbol-label bg-light-danger align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/018-girl-9.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Jessie Clarcson
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Most Successful
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $1,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-danger">
                                          +52%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {/*end::Table*/}
                            </div>
                            {/*end::Tap pane*/}
                            {/*begin::Tap pane*/}
                            <div
                              className="tab-pane fade"
                              id="kt_tab_pane_2_3"
                              role="tabpanel"
                              aria-labelledby="kt_tab_pane_2_3"
                            >
                              {/*begin::Table*/}
                              <div className="table-responsive">
                                <table className="table table-borderless align-middle">
                                  <thead>
                                    <tr>
                                      <th className="p-0 w-50px" />
                                      <th className="p-0 min-w-150px" />
                                      <th className="p-0 min-w-120px" />
                                      <th className="p-0 min-w-70px" />
                                      <th className="p-0 min-w-70px" />
                                      <th className="p-0 min-w-50px" />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="p-0 pb-3 pt-1">
                                        <div className="symbol symbol-55px mt-3 me-5">
                                          <span className="symbol-label bg-light-danger align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/018-girl-9.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Jessie Clarcson
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Most Successful
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $1,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-danger">
                                          +52%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 pb-3 pt-1">
                                        <div className="symbol symbol-55px mt-3">
                                          <span className="symbol-label bg-light-warning align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/047-girl-25.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Lebron Wayde
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Awesome Users
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $3,400,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-warning">
                                          +34%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 pb-3 pt-1">
                                        <div className="symbol symbol-55px mt-3">
                                          <span className="symbol-label bg-light-success align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/043-boy-18.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Kevin Leonard
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Awesome Userss
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $35,600,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-success">
                                          +230%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 pb-3 pt-1">
                                        <div className="symbol symbol-55px me-5 mt-3">
                                          <span className="symbol-label bg-light-primary align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/001-boy.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Brad Simmons
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          HTML, CSS Coding
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $1,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-primary">
                                          +28%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="p-0 pb-3 pt-1">
                                        <div className="symbol symbol-55px mt-3">
                                          <span className="symbol-label bg-light-info align-items-end">
                                            <img
                                              alt="Logo"
                                              src="../assets/media/svg/avatars/024-boy-9.svg"
                                              className="mh-40px"
                                            />
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-0">
                                        <a
                                          href="#"
                                          className="text-gray-800 fw-bolder text-hover-primary fs-6"
                                        >
                                          Randy Trent
                                        </a>
                                        <span className="text-muted fw-bold d-block mt-1">
                                          Business Analyst
                                        </span>
                                      </td>
                                      <td />
                                      <td className="text-end">
                                        <span className="text-gray-800 fw-bolder d-block fs-6">
                                          $45,200,000
                                        </span>
                                        <span className="text-muted fw-bold d-block mt-1 fs-7">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <span className="fw-bolder text-success">
                                          +340%
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <a
                                          href="#"
                                          className="btn btn-icon btn-bg-light btn-active-primary btn-sm"
                                        >
                                          {/*begin::Svg Icon | path: '.svg/icons/Navigation/Arrow-right.svg.'*/}
                                          <span className="svg-icon svg-icon-4">
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
                                                <rect
                                                  fill="#000000"
                                                  opacity="0.3"
                                                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)"
                                                  x={11}
                                                  y={5}
                                                  width={2}
                                                  height={14}
                                                  rx={1}
                                                />
                                                <path
                                                  d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z"
                                                  fill="#000000"
                                                  fillRule="nonzero"
                                                  transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          {/*end::Svg Icon*/}
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {/*end::Table*/}
                            </div>
                            {/*end::Tap pane*/}
                          </div>
                        </div>
                        {/*end::Body*/}
                      </div>
                      {/*end::Table Widget 2*/}
                    </div>
                  </div>
                  {/*end::Row*/}

                  {/*begin::Modals*/}

                  {/*end::Modals*/}
                </div>
                {/*end::Container*/}
              </div>
              {/*end::Content*/}
            </div>
            {/*end::Main*/}
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Page*/}
      </div>
      {/*end::Root*/}
    </>
  );
};

export default Dashboard;
