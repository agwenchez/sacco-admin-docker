import React, { Fragment, useEffect, useState } from 'react';
import ThemeCustomizer from "../layout/theme-customizer"
import Layout from "./AppWrapper"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
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
import DependantsTable from './new/DependantsTable';
import DependantsEdit from './new/DependantsEdit';
import DependantsRegistration from './new/Formik/DependantsRegistration';
import HospitalsTable from './new/HospitalsTable';
import axios from 'axios'
import FileUpload from './new/FileUpload';
import Payment from './new/Payment';
import Transactions from './new/Transactions';
import SmsReminders from './new/SmsReminders';
import Flutterwave from './new/Flutterwave';
import Ecommerce from './new/Ecommerce';

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})


const App = () => {

  return (

    <Fragment>
      {/* <Layout /> */}

      <Router basename={'/afya/sacco-admin'}>
        <Switch>
          <Route exact path='/' render={() => <Redirect to="/dashboard" />} />

          <Route exact path='/login' component={Login}  render={() => localStorage.tokenated && <Redirect to="/dashboard" />}/>

          <Route exact path="/dashboard/ecommerce">
            <ProtectedRoute Component={Ecommerce} />
          </Route>

          <Route exact path="/dashboard/notifications/reminder/sms">
            <ProtectedRoute Component={SmsReminders} />
          </Route>

          <Route exact path="/dashboard/billing/transactions">
            <ProtectedRoute Component={Transactions} />
          </Route>

          <Route exact path="/dashboard/billing/payment">
            <ProtectedRoute Component={Payment} />
          </Route>

          <Route exact path="/dashboard/billing/card-payment">
            <ProtectedRoute Component={Flutterwave} />
          </Route>

          <Route exact path="/dashboard/members/import">
            <ProtectedRoute Component={FileUpload} />
          </Route>

          <Route exact path="/dashboard/hospitals">
            <ProtectedRoute Component={HospitalsTable} />
          </Route>
          <Route exact path="/dashboard/members/edit">
            <ProtectedRoute Component={MemberEdit} />
          </Route>

          <Route path="/dashboard/members/dependants/edit">
            <ProtectedRoute Component={DependantsEdit} />
          </Route>

          <Route path="/dashboard/members/dependants/new">
            <ProtectedRoute Component={DependantsRegistration} />
          </Route>

          <Route path="/dashboard/members/dependants">
            <ProtectedRoute Component={DependantsTable} />
          </Route>

          <Route exact path="/dashboard/members/new">
            <ProtectedRoute Component={SaccoMemberRegistration} />
          </Route>

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