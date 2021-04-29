import React, { Fragment } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody,CardFooter,Form,FormGroup,Label,Input,Button} from 'reactstrap'
const FormDefault = () => { 
  return (
    <Fragment>
      {/* <Breadcrumb parent="Forms" title="Default Forms"/> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="12">
            <Row>
              <Col sm="12">
              <Card>
                  <CardHeader>
                    <h3>User Form</h3>
                  </CardHeader>
                  <CardBody>
                    <Form className="form-inline">
                      <Row>
                        <Col  xs="6"> 
                          <FormGroup >
                            <Label className="col-form-label " style={{marginRight: '5%'}} >First Name</Label>
                            <Input className="form-control" type="email" placeholder="Enter email" style={{width:'70%'}}/>
                            {/* <small className="form-text text-muted">{"We'll never share your email with anyone else."}</small> */}
                          </FormGroup>
                        </Col>
                        <Col  xs="6"> 
                          <FormGroup >
                            <Label className="col-form-label " style={{marginRight: '5%'}} >Last Name</Label>
                            <Input className="form-control" type="email" placeholder="Enter email" style={{width:'70%'}}/>
                            {/* <small className="form-text text-muted">{"We'll never share your email with anyone else."}</small> */}
                          </FormGroup>
                        </Col>
                        
                        <Col  xs="6"> 
                          <FormGroup >
                            <Label className="col-form-label " style={{marginRight: '5%'}} >Phone Number</Label>
                            <Input className="form-control" type="email" placeholder="Enter email" style={{width:'70%'}}/>
                            {/* <small className="form-text text-muted">{"We'll never share your email with anyone else."}</small> */}
                          </FormGroup>
                        </Col>
                        <Col  xs ="6"> 
                          <FormGroup>
                            <Label className="col-form-label " style={{marginRight: '5%'}} >Location</Label>
                            <Input className="form-control" type="password" placeholder="Password" style={{width:'70%'}}/>
                          </FormGroup>
                        </Col>
                        <Col  xs ="6"> 
                          <FormGroup>
                            <Label className="col-form-label " style={{marginRight: '5%'}} >Email</Label>
                            <Input className="form-control" type="password" placeholder="Password" style={{width:'70%'}}/>
                          </FormGroup>
                        </Col>
                        <Col  xs ="6"> 
                          <FormGroup>
                            <Label className="col-form-label " style={{marginRight: '5%'}} >Sacco</Label>
                            <Input className="form-control" type="password" placeholder="Password" style={{width:'70%'}}/>
                          </FormGroup>
                        </Col>
                      
                      </Row>
        
                      
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" className="mr-1">Submit</Button>
                    <Button color="secondary">Cancel</Button>
                  </CardFooter>
                </Card>
              </Col>
             
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default FormDefault;