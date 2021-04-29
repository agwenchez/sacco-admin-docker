import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
const Footer = (props) => {
  return (
    <Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md="12" className="footer-copyright text-center">
            {'Copyright '}&copy;
              Afya Kwanza
              {' '}
            {new Date().getFullYear()}
            {'.'}
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment>
  );
}

export default Footer;