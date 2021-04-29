import React,{useState,useEffect} from 'react';
import man from '../assets/images/dashboard/profile.jpg';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'
// import {firebase_app,googleProvider,facebookProvider,twitterProvider,githubProvider, Jwt_token } from '../data/config'
import { handleResponse } from '../services/fack.backend'
// import { useAuth0 } from '@auth0/auth0-react'
// import { toast } from 'react-toastify';
import {withRouter} from 'react-router-dom'

import {Password, EmailAddress,RememberPassword,ForgotPassword } from '../constant';

const Logins = (props) => {
  
  
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("test123");
    // const [loading,setLoading] = useState(false) 
    const [togglePassword,setTogglePassword] = useState(false)

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );
    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    useEffect(() => {
      
    localStorage.setItem('profileURL', value);
    localStorage.setItem('Name', name);
    }, [value,name]);

    const loginWithJwt = (email,password) => {
  
      // setLoading(true)

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ({ email, password })
      };
      
      return fetch('/users/authenticate', requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        setValue(man);
        setName("Enock Agwenchez");
        localStorage.setItem('token', user);
        window.location.href = `/dashboard/`
        return user;
      });
    }

    return (
        <Container fluid={true} className="p-0">
        <Row>
        <Col xs="12">     
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html">
                  <img className="img-fluid for-light" src={require("../assets/images/logo/login.png")} alt=""/>
                  <img className="img-fluid for-dark" src={require("../assets/images/logo/logo_dark.png")} alt=""/>
                </a>
              </div>
              <div className="login-main login-tab"> 
  
     
                    <Form className="theme-form">
                    <div style={{ width: '10vh,', height: '10vh', display: 'flex', alignItems: 'center',justifyContent: 'center'}} >
                      <h4>Admin Login</h4>
                      </div>
                     
                      <FormGroup>
                        <Label className="col-form-label">{EmailAddress}</Label>
                        <Input className="form-control" type="email" required="" onChange={e => setEmail(e.target.value)} defaultValue={email} />
                      </FormGroup>
                      <FormGroup>
                        <Label className="col-form-label">{Password}</Label>
                        <Input className="form-control" type={togglePassword ?  "text" : "password"} onChange={e => setPassword(e.target.value)} defaultValue={password} required=""/>
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </FormGroup>
                      <div className="form-group mb-0">
                        <div className="checkbox ml-3">
                          <Input id="checkbox1" type="checkbox"/>
                          <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                        </div><a className="link" href="#javascript">{ForgotPassword}</a>
                      <div style={{ width: '10vh,', height: '10vh', display: 'flex', alignItems: 'center',justifyContent: 'center'}} >
                        <Button color="primary" className="btn" onClick={() => loginWithJwt(email,password)}>Login</Button>
                      </div>
                        
                      </div>
                      
                        
                    </Form>
                 
              </div>
            </div>
          </div>
        </Col>
        </Row>
        </Container>
    );
}

export default withRouter(Logins);