import React, { Fragment } from 'react';
import {useForm} from 'react-hook-form'
import {Row,Col,Form,Label,Input} from 'reactstrap'

const Registration = () => {
    const { register, handleSubmit, errors } = useForm(); 

    const onSubmit = data => {

        if (data !== '') {
            alert('You submitted the form and stuff!');
        } else {
            errors.showMessages();
        }
    };
    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-row" style={{marginTop:'5%'}}>
                            
                            <Col md="6 mb-3" >
                                <Label>Sacco Name</Label>
                                <Input style={{width:'90%'}} className="form-control" name="saccoName" type="text" placeholder="Enter sacco name" innerRef={register({ required: true })} />
                                {errors.saccoName && 'Sacco name is required'}
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                            
                            <Col md="6 mb-3">
                                <Label>Sacco type</Label>
                                <Input style={{width:'90%'}} className="form-control"  name="saccoType" type="text" placeholder="Enter the sacco type" innerRef={register({ required: true })} />
                                {errors.saccoType && 'Sacco type is required'}
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>

                        </div>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Registration;