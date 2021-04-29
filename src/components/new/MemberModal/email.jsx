import React, { Fragment } from 'react';
import {Row,Col,Form,Label,Input} from 'reactstrap'
const Emails = (props) => {
    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Form className="needs-validation" noValidate>
                        <div className="form-row">
                            <Col md="6 mb-3" style={{marginTop:'6%'}}>
                                <Label htmlFor="saccoAdminName">Sacco Admin Name</Label>
                                <Input style={{width:'85%'}} className="form-control"type="text" placeholder="Enter sacco admin name" />
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                            <Col md="6 mb-3"  style={{marginTop:'6%'}}>
                                <Label htmlFor="saccoAdminEmail">Sacco Admin email</Label>
                                <Input style={{width:'85%'}} className="form-control"  type="email" placeholder="Enter sacco admin email" />
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                            <Col md="6 mb-3"  style={{marginTop:'2%'}}>
                                <Label htmlFor="saccoAdminPassword">Sacco Admin Password</Label>
                                <Input style={{width:'85%'}}className="form-control"type="password" placeholder="Enter sacco admin password" />
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                            <Col md="6 mb-3"  style={{marginTop:'2%'}}>
                                <Label htmlFor="saccoAmPassword2"> Confirm Password</Label>
                                <Input style={{width:'85%'}}className="form-control" type="password" placeholder="Confirm Password" />
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Emails;