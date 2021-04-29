import React, { Fragment, useEffect, useState } from 'react';
import ThemeCustomizer from "../layout/theme-customizer"
import Layout from "./AppWrapper"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch, Redirect,useHistory } from "react-router-dom";
// import Dashboard from "./dashboard/dashboard"
import Default from "./dashboard/default"
import Login from "../components/new/Login"
import Members from "../components/new/MembersTable"
import Saccos from "../components/new/SaccoTable"
import MembersRegistration from "../components/new/Formik/SaccoMemberRegistration"
import SaccoRegistration from "../components/new/Formik/SaccoRegistration"
import Axios from 'axios';
import SaccoMemberRegistration from '../components/new/Formik/SaccoMemberRegistration';
import ProtectedRoute from "../auth/ProtectedRoute";
// import saccoProfile from "../components/users/userEdit";
import saccoProfile from "../components/new/SaccoProfile";
import { toast } from 'react-toastify';
import MemberEdit from './new/MemberEdit';

const App = () => {
 
  const [token,setToken]= useState('')
  const logout = ()=>{
  
      setToken(localStorage.removeItem("tokenated"))
      window.location.href = '/login'
    
  }

  useEffect(()=>{
    setInterval(logout, 60000*45);
  },[token])

  return (

    <Fragment>
      {/* <Layout /> */}

      <Router basename={'/'}>
        <Switch>
          <Route exact path="/dashboard/members/edit">
            <ProtectedRoute Component={MemberEdit}/>
          </Route>

          <Route exact path="/dashboard/members/new">
            <ProtectedRoute Component={SaccoMemberRegistration} />
          </Route>

          <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
          <Route exact path='/login' component={Login} />

          <Route exact path="/dashboard/members">
            <ProtectedRoute Component={Members} />
          </Route>         

          <Route exact path="/dashboard/sacco/profile">
            <ProtectedRoute Component={saccoProfile} />
          </Route>

          {/* <Route exact path="/dashboard/default">
            <ProtectedRoute Component={Default} />
          </Route> */}
          <Route exact path="/dashboard">
            <ProtectedRoute Component={Default} />
          </Route>

        </Switch>
      </Router>
      <ToastContainer />
      <ThemeCustomizer />
    </Fragment>
  );
}
export default App;