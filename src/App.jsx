import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Auth/ForgotPassword';
import RcsDetails from './User/RcsDetails';
import Templatelist from './User/Templateslist';
import Addtemplates from './User/Addtemplate';
import Profile from './User/ProfileDash';
import { Userdashboard } from './User/Userdashboard';
import Createcampaign from './User/Createcampaign';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Admindashboard from './Admin/Admindashboard';
import Userlists from './Admin/Userlists';
import AdminProfile from './Admin/Adminprofile';
import Chatdetails from './User/Chatsinfo';
import ProtectedRoute from './Routes/Protectedroute';
import PageNotFound from './Routes/Page404';
import Reports from './User/Reports';
import { InitWebSocket } from './Routes/Websocket';

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>

          {/* common routes ................................. */}

          <Route path="/" element={<Login />} />
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/reset-password" exact element={<ForgotPassword />}></Route>

          {/* admin panel  .................................. */}

          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/userlists" element={<Userlists />} />
          <Route path="/adminprofile" element={<AdminProfile />} />

          {/* user panel  .................................... */}

          <Route path="/userdashboard" element={<ProtectedRoute Component={Userdashboard} />} />
          <Route path="/sendrcs" exact element={<ProtectedRoute Component={RcsDetails} />} />
          <Route path="/templateslist" exact element={<ProtectedRoute Component={Templatelist} />} />
          <Route path="/addtemplates" exact element={<ProtectedRoute Component={Addtemplates} />} />
          <Route path="/createcampaign" exact element={<ProtectedRoute Component={Createcampaign} />} />
          <Route path="/userprofile" exact element={<ProtectedRoute Component={Profile} />} />
          <Route path="/chatdetails" exact element={<ProtectedRoute Component={Chatdetails} />} />
          <Route path="/reports/:campaignId" exact element={<ProtectedRoute Component={Reports} />} />
          <Route path="*" exact element={<PageNotFound />} />
          <Route path="/webhook" exact element={<InitWebSocket />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
