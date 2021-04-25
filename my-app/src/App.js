import { Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Dashboard from './pages/Dashboard';
import Navbar from "./components/Navbar";
import CmsPageList from "./pages/cmsPages/CmsPageList";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CountryListPage from './pages/masterSettingsPages/manageCountry/CountryListPage';
import CityListPage from './pages/masterSettingsPages/manageCity/CityListPage';
import StateListPage from './pages/masterSettingsPages/manageState/StateListPage';
import AddCityPage from './pages/masterSettingsPages/manageCity/AddCityPage';
import AddCountryPage from './pages/masterSettingsPages/manageCountry/AddCountryPage';
import AddStatePage from './pages/masterSettingsPages/manageState/AddStatePage';
import EditCountryPage from './pages/masterSettingsPages/manageCountry/EditCountryPage';
import EditCityPage from './pages/masterSettingsPages/manageCity/EditCityPage';
import EditStatePage from './pages/masterSettingsPages/manageState/EditStatePage';
import EditCmsPage from './pages/cmsPages/EditCmsPage';
import UserListPage from './pages/userPages/UserListPage';
import AddUserPage from './pages/userPages/AddUserPage';
import EditUserPage from './pages/userPages/EditUserPage';
import StartagList from './pages/startagPages/StartagList';
import AddStartagPage from './pages/startagPages/AddStartagPage';
import EditStartagPage from './pages/startagPages/EditStartagPage';
import verifyRequestList from './pages/userPages/RequestListPage';
import RequestViewPage from './pages/userPages/RequestViewPage';

function App() {  

  const adminLogin = useSelector(state => state.adminLogin)
	const {adminInfo} = adminLogin

  return (    
    <div className="App">    
    {adminInfo && <Navbar />}
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/admin-login" exact component={Login} />
      <Route path="/CMS" exact component={CmsPageList} />  
      <Route path='/editpage/:id' exact component={EditCmsPage} />
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
      <Route path="/addstartag" exact component={AddStartagPage} />
      <Route path="/editstartag/:id" exact component={EditStartagPage} />
      <Route path="/userlist" exact component={UserListPage} />
      <Route path="/requestList" exact component={verifyRequestList} />
      <Route path="/viewrequest/:id" exact component={RequestViewPage} />
    </Switch>
    <Footer />
    </div>
  );
}
export default App;