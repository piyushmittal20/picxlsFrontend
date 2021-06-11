import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPannelLogo } from "../actions/logoActions";

const Sidebar = () => {
  const dispatch = useDispatch();

  const title = "Admin Panel Logo";

  const pannelLogo = useSelector((state) => state.pannelLogo);
  const { logo } = pannelLogo;

  const logoUpdate = useSelector((state) => state.logoUpdate);
  const { success: updateSuccess } = logoUpdate;

  useEffect(() => {
    dispatch(getPannelLogo(title));
  }, [title, updateSuccess]);

  return (
    <div className="wrapper">
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <div
            id="kt_aside"
            className="aside bg-blue"
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
            <div className="aside-secondary d-flex flex-row-fluid">
              {/*begin::Workspace*/}
              <div
                className="aside-workspace my-7 ps-5 pe-4 ps-lg-10 pe-lg-6"
                id="kt_aside_wordspace"
              >
                {/*begin::Logo*/}
                <div className="aside-logo py-2 pb-7" id="kt_aside_logo">
                  <Link to="/">
                    <img
                      alt="Logo"
                      src={logo && logo.image}
                      className="mh-50px"
                    />
                  </Link>
                </div>
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
                              <span className="menu-title">
                                Manage Startags
                              </span>
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
                              <span className="menu-title">
                                Manage Requests
                              </span>
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
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          Tax Management
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/taxlist">
                              <span className="menu-title">Manage Taxlist</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          Contact Us
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/contactlist">
                              <span className="menu-title">
                                Manage Contacts
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          Report Abuse Management
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link
                              className="menu-link py-2"
                              to="/reportabuselist"
                            >
                              <span className="menu-title">
                                Manage Report Abuse
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="menu-item show">
                        <h4 className="menu-content text-muted mb-0 fs-6 fw-bold text-uppercase">
                          Logo Management
                        </h4>
                        <div className="menu-sub menu-fit menu-sub-accordion show pb-10">
                          <div className="menu-item">
                            <Link className="menu-link py-2" to="/logolist">
                              <span className="menu-title">Manage Logo</span>
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
