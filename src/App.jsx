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

          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/sendrcs" exact element={<RcsDetails />} />
          <Route path="/templateslist" exact element={<Templatelist />} />
          <Route path="/addtemplates" exact element={<Addtemplates />} />
          <Route path="/createcampaign" exact element={<Createcampaign />} />
          <Route path="/userprofile" exact element={<Profile />} />
          <Route path="/chatdetails" exact element={<Chatdetails />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
