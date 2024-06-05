import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Userpages/Login';
import Register from './Userpages/Register';
import ForgotPassword from './Userpages/ForgotPassword';
import RcsDetails from './Userpages/RcsDetails';
import Templatelist from './Userpages/Templateslist';
import Addtemplates from './Userpages/Addtemplate';
import Profile from './Userpages/ProfileDash';
import { Userdashboard } from './Userpages/Userdashboard';

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/sendrcs" exact element={<RcsDetails />} />
          <Route path="/templateslist" exact element={<Templatelist />} />
          <Route path="/addtemplates" exact element={<Addtemplates />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
