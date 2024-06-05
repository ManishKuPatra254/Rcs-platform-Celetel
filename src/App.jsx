import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './User/Login';
import Register from './User/Register';
import ForgotPassword from './User/ForgotPassword';
import RcsDetails from './User/RcsDetails';
import Templatelist from './User/Templateslist';
import Addtemplates from './User/Addtemplate';
import Profile from './User/ProfileDash';
import { Userdashboard } from './User/Userdashboard';
import Createcampaign from './User/Createcampaign';

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


          {/* user panel  .................................... */}

          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/sendrcs" exact element={<RcsDetails />} />
          <Route path="/templateslist" exact element={<Templatelist />} />
          <Route path="/addtemplates" exact element={<Addtemplates />} />
          <Route path="/createcampaign" exact element={<Createcampaign />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
