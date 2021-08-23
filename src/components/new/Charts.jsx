import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Chart from 'react-apexcharts'
import {
  // apexColumnChartsone,
  apexMemberBarChart
} from "../charts/apexCharts/apexData";


const Charts = () => {
  return (
    <Row style={{ paddingTop: '2%' }}>
      {/* <Col sm="12" xl="12">
        <Card>
          <CardHeader>
            <h5>Monthly Expenditure </h5>
          </CardHeader>
          <CardBody>
            <div id="column-chart">
              <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={350} />
            </div>
          </CardBody>
        </Card>
      </Col> */}
      <Col sm="12" xl="12">
        <Card style={{ boxShadow: '5px 5px 16px #263238' }}>
          <CardHeader>
            <h5>Members Distribution Chart</h5>
          </CardHeader>
          <CardBody>
            <div id="basic-bar">
              <Chart options={apexMemberBarChart.options} series={apexMemberBarChart.series} type="bar" height={350} />
            </div>
          </CardBody>
        </Card>
      </Col>

    </Row>
  )
}

export default Charts
