const Footer = () => {
  return (
    <>
      <div class="footer py-4 d-flex flex-lg-column" id="kt_footer">
        <div class="container ">
          <div class="text-dark order-2 order-md-1">
            <span class="text-muted fw-bold me-2">© 2021 Picxls | Engineered by</span>
            <a
              href="https://www.vayuz.com"
              target="_blank"
              class="text-gray-800 text-hover-primary fw-bold"
            >
              VAYUZ Technologies
            </a>
          </div>
          <ul class="menu menu-gray-600 menu-hover-primary fw-bold order-1">
            <li class="menu-item">
              {/* <a href="general/faq.html" target="_blank" class="menu-link ps-0 pe-2">About</a> */}
            </li>
            <li class="menu-item">
              {/* <a href="general/faq.html" target="_blank" class="menu-link pe-0 pe-2">Contact</a> */}
            </li>
            <li class="menu-item">
              {/* <a href="general/faq.html" target="_blank" class="menu-link pe-0">Purchase</a> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
