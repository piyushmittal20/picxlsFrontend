import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CmsPageList from "./pages/cmsPages/CmsPageList";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CountryListPage from "./pages/masterSettingsPages/manageCountry/CountryListPage";
import CityListPage from "./pages/masterSettingsPages/manageCity/CityListPage";
import StateListPage from "./pages/masterSettingsPages/manageState/StateListPage";
import AddCityPage from "./pages/masterSettingsPages/manageCity/AddCityPage";
import AddCountryPage from "./pages/masterSettingsPages/manageCountry/AddCountryPage";
import AddStatePage from "./pages/masterSettingsPages/manageState/AddStatePage";
import EditCountryPage from "./pages/masterSettingsPages/manageCountry/EditCountryPage";
import EditCityPage from "./pages/masterSettingsPages/manageCity/EditCityPage";
import EditStatePage from "./pages/masterSettingsPages/manageState/EditStatePage";
import EditCmsPage from "./pages/cmsPages/EditCmsPage";
import UserListPage from "./pages/userPages/UserListPage";
import AddUserPage from "./pages/userPages/AddUserPage";
import EditUserPage from "./pages/userPages/EditUserPage";
import StartagList from "./pages/startagPages/StartagList";
import AddStartagPage from "./pages/startagPages/AddStartagPage";
import EditStartagPage from "./pages/startagPages/EditStartagPage";
import verifyRequestList from "./pages/userPages/RequestListPage";
import RequestViewPage from "./pages/userPages/RequestViewPage";
import PostListPage from "./pages/postPages/PostListPage";
import PostViewPage from "./pages/postPages/PostViewPage";
import StartagViewPage from "./pages/startagPages/StartagViewPage";
import UserViewPage from "./pages/userPages/UserViewPage";
import Sidebar from "./components/Sidebar";
import TaxListPage from "./pages/taxPages/TaxListPage";
import TaxViewPage from "./pages/taxPages/TaxViewPage";
import EditTaxPage from "./pages/taxPages/EditTaxPage";
import AddTaxPage from "./pages/taxPages/AddTaxPage";
import ContactListPage from "./pages/contactPages/ContactListPage";
import ContactViewPage from "./pages/contactPages/ContactViewPage";
import ReplyContactPage from "./pages/contactPages/ReplyContactPage";

function App() {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  return (
    <div className="App">
      {adminInfo && <Sidebar />}
      <Route path="/admin-login" exact component={Login} />
      <div className="wrapper d-flex flex-column flex-row-fluid">
        {adminInfo && <Navbar />}
        <Switch>
          <Route path="/" exact component={Dashboard} />

          <Route path="/CMS" exact component={CmsPageList} />
          <Route path="/editpage/:id" exact component={EditCmsPage} />
          <Route path="/countrylist" exact component={CountryListPage} />
          <Route path="/addcountry" exact component={AddCountryPage} />
          <Route path="/editcountry/:id" exact component={EditCountryPage} />
          <Route path="/citylist" exact component={CityListPage} />
          <Route path="/addcity" exact component={AddCityPage} />
          <Route path="/editcity/:id" exact component={EditCityPage} />
          <Route path="/statelist" exact component={StateListPage} />
          <Route path="/addstate" exact component={AddStatePage} />
          <Route path="/editstate/:id" exact component={EditStatePage} />
          <Route path="/userlist" exact component={UserListPage} />
          <Route path="/addUser" exact component={AddUserPage} />
          <Route path="/edituser/:id" exact component={EditUserPage} />
          <Route path="/startaglist" exact component={StartagList} />
          <Route
            path="/startaglist/page/:pageNumber"
            exact
            component={StartagList}
          />
          <Route path="/addstartag" exact component={AddStartagPage} />
          <Route path="/editstartag/:id" exact component={EditStartagPage} />
          <Route path="/userlist" exact component={UserListPage} />
          <Route
            path="/userlist/page/:pageNumber"
            exact
            component={UserListPage}
          />
          <Route path="/requestList" exact component={verifyRequestList} />
          <Route path="/viewrequest/:id" exact component={RequestViewPage} />
          <Route path="/postlist" exact component={PostListPage} />
          <Route
            path="/postlist/page/:pageNumber"
            exact
            component={PostListPage}
          />
          <Route path="/viewpost/:id" exact component={PostViewPage} />
          <Route path="/viewstartag/:id" exact component={StartagViewPage} />
          <Route path="/viewuser/:id" exact component={UserViewPage} />
          <Route path="/taxlist" exact component={TaxListPage} />
          <Route
            path="/taxlist/page/:pageNumber"
            exact
            component={TaxListPage}
          />
          <Route path="/addtax" exact component={AddTaxPage} />
          <Route path="/viewtax/:id" exact component={TaxViewPage} />
          <Route path="/edittax/:id" exact component={EditTaxPage} />
          <Route path="/contactlist" exact component={ContactListPage} />
          <Route
            path="/contactlist/page/:pageNumber"
            exact
            component={TaxListPage}
          />
          <Route path="/contactview/:id" exact component={ContactViewPage} />
          <Route path="/answerconcern/:id" exact component={ReplyContactPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
export default App;
