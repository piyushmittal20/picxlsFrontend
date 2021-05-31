import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminDashboardData } from "../actions/dashbordActions";
import Meta from "../components/Meta";
import LineChart from "../components/LineChart";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorToast from "../components/ErrorToast";

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const adminDashboard = useSelector((state) => state.adminDashboard);
  const { loading, error, last7Day, last14Day, last28Day, last24Hour } =
    adminDashboard;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin-login");
    } else {
      dispatch(adminDashboardData());
    }
  }, [history, adminInfo]);

  let data1;
  let data2;
  let data3;
  let data4;

  if (last7Day && last7Day.status === "fulfilled") {
    data1 = last7Day.value.data.userCount;
  }
  if (last14Day && last14Day.status === "fulfilled") {
    data2 = last14Day.value.data.userCount;
  }
  if (last28Day && last28Day.status === "fulfilled") {
    data3 = last28Day.value.data.userCount;
  }
  if (last24Hour && last24Hour.status === "fulfilled") {
    data4 = last24Hour.value.data.userCount;
  }

  return (
    <div className="" style={{ paddingBottom: "50px" }}>
      <Meta title="Dashboard - Picxls" />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error} />
      ) : (
        <div className="d-flex flex-column flex-root">
          <div className="page d-flex flex-row flex-column-fluid text-center">
            <div>
              <div className="">
                <div className="content" id="kt_content">
                  <div style={{ margin: "40px auto" }}>
                    <Link to="/userlist">
                      <LineChart
                        data1={data1}
                        data2={data2}
                        data3={data3}
                        data4={data4}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
