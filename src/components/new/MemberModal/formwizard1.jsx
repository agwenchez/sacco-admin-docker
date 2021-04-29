import React, { Fragment } from 'react';
import StepZilla from "react-stepzilla";
import Registration from './registration';
import Email from './email';
// import Birthdate from './birthdate';
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'

const FormWizard = () => {
    const steps =
        [
            { name: 'SACCO DETAILS', component: <Registration /> },
            { name: 'SACCO ADMIN DETAILS', component: <Email /> },
            // { name: 'Step 3', component: <Birthdate /> },
            
        ]
    return (
        <Fragment>
            
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CardHeader>
                                <h5>Multi Step Form</h5>
                            </CardHeader> */}
                            <CardBody>
                            <StepZilla 
                                steps={steps} 
                                showSteps={true} 
                                showNavigation={true} 
                                stepsNavigation={true}
                                prevBtnOnLastStep={true}
                                dontValidate={false} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </Fragment>
    );
};

export default FormWizard;