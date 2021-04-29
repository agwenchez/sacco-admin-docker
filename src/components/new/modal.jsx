import React, { useState, Fragment } from 'react';
import FormWizard from "../new/form-layout/form-wizard-1/formwizard1"
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
// import { NewMessage, SendMessage, Close, VaryingModalContent } from '../../constant'


const Modals = (props) => {

  const [modal, setModal] = useState(false);

  const [VaryingContentone, setVaryingContentone] = useState(false);
  const [VaryingContenttwo, setVaryingContenttwo] = useState(false);
  const [VaryingContentthree, setVaryingContentthree] = useState(false);


  const VaryingContentonetoggle = () => setVaryingContentone(!VaryingContentone);
  const VaryingContenttwotoggle = () => setVaryingContenttwo(!VaryingContenttwo);
  const VaryingContentthreetoggle = () => setVaryingContentthree(!VaryingContentthree);


  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <div style={{ marginTop:'1.2%', marginBottom:'1.8%'}}  >
            <Button  style={{ float:'right'}} color="primary" onClick={VaryingContentonetoggle}>{"Add New"}</Button>
          </div>
          <Modal isOpen={VaryingContentone} toggle={VaryingContentonetoggle} size='xl'>
            <ModalHeader toggle={VaryingContentonetoggle}>
              New Sacco Registration
                     </ModalHeader>
            <ModalBody>
              <Form>
                <FormWizard />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={VaryingContentonetoggle}>Close</Button>
              <Button color="primary" onClick={VaryingContentonetoggle}>SendMessage</Button>
            </ModalFooter>
          </Modal>


        </Row>
      </Container>
    </Fragment>
  );
}

export default Modals;