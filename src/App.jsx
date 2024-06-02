import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Layout } from './Layout/Layout'
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import RcsDetails from './pages/RcsDetails';
import Templatelist from './pages/Templateslist';
import Addtemplates from './pages/Addtemplate';
import Profile from './pages/ProfileDash';
import { Dashboard } from './pages/Dashboard';

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
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
