const Footer = () => {
  return (
    <>
      <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
        <div className="container ">
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted fw-bold me-2">
              © 2021 Picxls | Engineered by
            </span>
            <a
              href="https://www.vayuz.com"
              target="_blank"
              className="text-gray-800 text-hover-primary fw-bold"
            >
              VAYUZ Technologies
            </a>
          </div>
          <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
            <li className="menu-item"></li>
            <li className="menu-item"></li>
            <li className="menu-item"></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
