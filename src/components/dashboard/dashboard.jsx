import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import InfoCards from "../new/InfoCards";
import Charts from "../new/Charts";
import Breadcrumb from "../../layout/breadcrumb";
import Layout from "../AppWrapper"
import axios from 'axios'
import {withRouter} from 'react-router-dom';

const api = axios.create({
  baseURL:`https://afya-kwanza-backend.herokuapp.com`
})

const Dashboard = () => {
  
  const [token, setToken] = useState('')
  const [firstname, setfirstName] = useState("")
  const [lastname, setlastName] = useState("")

  // const jwt_token = localStorage.tokenated
  const getProfile = async () => {
    // console.log("Stored token=>",token)
    try {
      const res = await api.get("/saccos/sacco/profile", {
        headers: { token: localStorage.tokenated }
      });

      // const data = await res.json();
      // console.log("data from server==>", res.data)
      const data = res.data
      setlastName(data.sacco_info.admin_lastname)
      setfirstName(data.sacco_info.admin_firstname)
      localStorage.setItem('sacco_name', data.sacco_info.sacco_name)
      localStorage.setItem('lastname', data.sacco_info.admin_lastname)
      localStorage.setItem('firstname', data.sacco_info.admin_firstname)
      localStorage.setItem('role', data.sacco_info.role)
      localStorage.setItem('members', data.members)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {

    getProfile()


  }, [])


  return (
    <Layout>

    <Container fluid={true}>
      <Breadcrumb parent="Dashboard" title="Admin Dashboard" />
      <p>Welcome {firstname} {lastname}</p>
      <InfoCards />
      <Charts/>
    </Container>
    </Layout>
  );
}


export default Dashboard