import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Media, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'
import Layout from "../AppWrapper";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar'


const api = axios.create({
  baseURL: `https://afya-kwanza-backend.herokuapp.com`
})


const SaccoProfile = (props) => {

  const [data, setData] = useState({})

  const getProfile = async () => {

    try {
      const res = await api.get("/saccos/sacco/profile", {
        headers: { token: localStorage.tokenated }
      });

      
      // const data = await res.json();
      // console.log("data from server==>", res.data)
      setData(res.data.sacco_info)

    } catch (err) {
      console.error(err.message);
    }
  };

  const onChange = e => setData({...data, [e.target.name]: e.target.value})

  const handleSubmit = async e =>{
    e.preventDefault();

    const {sacco_name, sacco_email,admin_email,admin_firstname,admin_lastname,admin_phonenumber} = data

    try {
      const res = await api.put(`/saccos/update/${data.sacco_id}`, {sacco_name, sacco_email,admin_email,admin_firstname,admin_lastname,admin_phonenumber})
      // console.log("response data=>", res.data.data)

      localStorage.setItem('firstname_update', res.data.data.admin_firstname)
      localStorage.setItem('lastname_update', res.data.data.admin_lastname)
      localStorage.setItem('firstname_role', res.data.data.role)

      toast.success(res.data.msg)
    } catch (error) {
      console.log("Error==>", error.message)
      error.message == 'Request failed with status code 500' &&  toast.error('There is another sacco with that email!')

     
    }


  }


  useEffect(() => {
    getProfile()

  }, [])

 

  return (
    <Fragment>
      <Layout>
        <Breadcrumb parent="Dashboard" title="Edit Sacco Profile" />
        <Container fluid={true}>
          <div className="edit-profile" style={{marginTop:'3%'}}>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xl="4">
                  <Card style={{ boxShadow: '5px 5px 20px #263238'}}>
                    <CardHeader>
                      <h4 className="card-title mb-0">Sacco Profile</h4>
                      {/* <div className="card-options">
                      <a className="card-options-collapse" href="#javascript">
                        <i className="fe fe-chevron-up"></i>
                      </a>
                      <a className="card-options-remove" href="#javascript">
                        <i className="fe fe-x"></i>
                      </a>
                    </div> */}
                    </CardHeader>
                    <CardBody style={{ marginBottom: "15%" }}>
                      <Row className="mb-4">
                        <div className="col-auto">
                        <Avatar maxInitials={1} size={65} round={true} name={data.sacco_name} /> 
                          {/* <Media className="img-70 rounded-circle" alt="" src={require("../../assets/images/user/7.jpg")} /> */}
                        </div>
                        <Col>
                          <h5 className="mb-1 mt-2">{data.sacco_name} Sacco</h5>
                          <p className="mb-2">Admin: {data.admin_firstname} {data.admin_lastname}</p>
                        </Col>
                      </Row>
                      <FormGroup>
                        <Label className="form-label">Sacco Name</Label>
                        <Input className="form-control" type="text" placeholder="First Name" name="sacco_name" defaultValue={data.sacco_name} onChange={e => onChange(e)} autoFocus/>
                      </FormGroup>
                      <FormGroup>
                        <Label className="form-label">Sacco Email</Label>
                        <Input className="form-control" type="text" placeholder="Last Name" name="sacco_email" defaultValue={data.sacco_email}  onChange={e => onChange(e)}/>
                      </FormGroup>

                    </CardBody>
                  </Card>
                </Col>
                <Col xl="8">
                  <div className="card" style={{ boxShadow: '5px 5px 20px #263238'}}>
                    <CardHeader>
                      <h4 className="card-title mb-0">Sacco Admin Profile</h4>
                      <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                          <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                          <i className="fe fe-x"></i>
                        </a>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col sm="6" md="6" style={{ marginTop: "5%" }}>
                          <FormGroup>
                            <Label className="form-label">First Name</Label>
                            <Input className="form-control" type="text" placeholder="First Name" name="admin_firstname" defaultValue={data.admin_firstname}  onChange={e => onChange(e)}/>
                          </FormGroup>
                        </Col>
                        <Col sm="6" md="6" style={{ marginTop: "5%" }}>
                          <FormGroup>
                            <Label className="form-label">Last Name</Label>
                            <Input className="form-control" type="text" placeholder="Last Name" name="admin_lastname" defaultValue={data.admin_lastname}  onChange={e => onChange(e)}/>
                          </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                          <FormGroup>
                            <Label className="form-label">Admin email</Label>
                            <Input className="form-control" type="email" placeholder="Sacco Name" name="admin_email" defaultValue={data.admin_email}  onChange={e => onChange(e)}/>
                          </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                          <FormGroup>
                            <Label className="form-label">Phone Number</Label>
                            <Input className="form-control" type="text" placeholder="Phone Number" name="admin_phonenumber" defaultValue={data.admin_phonenumber} onChange={e => onChange(e)} />
                          </FormGroup>
                        </Col>
{/* 
                        <Col md="12">
                        <FormGroup>
                          <Label className="form-label">Address</Label>
                          <Input className="form-control" type="text" placeholder="Home Address" />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label className="form-label">City</Label>
                          <Input className="form-control" type="text" placeholder="City" />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="3">
                        <FormGroup>
                          <Label className="form-label">Postal Code</Label>
                          <Input className="form-control" type="number" placeholder="ZIP Code" />
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup>
                          <Label className="form-label">Country</Label>
                          <Input type="select" name="select" className="form-control btn-square">
                            
                          </Input>
                        </FormGroup>
                      </Col> */}

                      </Row>
                    </CardBody>
                    <CardFooter className="text-right">
                      <button className="btn btn-primary" type="submit">Update</button>
                    </CardFooter>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </Layout>
    </Fragment>
  );
}

export default SaccoProfile;