import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { Database, ShoppingBag, MessageCircle, UserPlus, Layers, ShoppingCart, DollarSign, ArrowDown, ArrowUp, CloudDrizzle } from 'react-feather';
import CountUp from 'react-countup';


const InfoCards = () => {
  return (
    <>
    {/* <Row>
    <Col sm="12" xl="6" lg="6">
          <Card className="o-hidden">
            <CardBody className="bg-primary b-r-4 card-body">
              <div className="media static-top-widget">
                <div className="align-self-center text-center"><Database /></div>
                <div className="media-body"><span className="m-0">Saccos</span>
                  <h4 className="mb-0 counter"><CountUp end={6659} /></h4><Database className="icon-bg" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
    </Row> */}
      <Row style={{ paddingTop: '2%' }} >
        <Col sm="6" xl="3" lg="6">
          <Card className="o-hidden">
            <CardBody className="bg-primary b-r-4 card-body">
              <div className="media static-top-widget">
                <div className="align-self-center text-center"><Database /></div>
                <div className="media-body"><span className="m-0">Saccos</span>
                  <h4 className="mb-0 counter"><CountUp end={6659} /></h4><Database className="icon-bg" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" xl="3" lg="6">
          <Card className="o-hidden">
            <div className="bg-secondary b-r-4 card-body">
              <div className="media static-top-widget">
                <div className="align-self-center text-center"><ShoppingBag /></div>
                <div className="media-body"><span className="m-0">Members</span>
                  <h4 className="mb-0 counter"><CountUp end={9856} /></h4><ShoppingBag className="icon-bg" />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm="6" xl="3" lg="6">
          <Card className="o-hidden">
            <CardBody className="bg-primary b-r-4">
              <div className="media static-top-widget">
                <div className="align-self-center text-center"><MessageCircle /></div>
                <div className="media-body"><span className="m-0">Resolved Issues</span>
                  <h4 className="mb-0 counter"><CountUp end={893} /></h4><MessageCircle className="icon-bg" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" xl="3" lg="6">
          <Card className="o-hidden">
            <CardBody className="bg-primary b-r-4">
              <div className="media static-top-widget">
                <div className="align-self-center text-center"><UserPlus /></div>
                <div className="media-body"><span className="m-0">New Users</span>
                  <h4 className="mb-0 counter"><CountUp end={4563} />{"1"}</h4><UserPlus className="icon-bg" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

      </Row>

    </>
  )
}

export default InfoCards
