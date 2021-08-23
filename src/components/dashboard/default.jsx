import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import DatePicker from "react-datepicker";
import ApexCharts from 'react-apexcharts'
import ChartistChart from 'react-chartist';
import Knob from "knob";
import Layout from "../AppWrapper";
import { withRouter } from 'react-router-dom'
import { Currentlysale, Marketvalue } from './chartsData/apex-charts-data'
import { smallchart1data, smallchart1option, smallchart2data, smallchart2option, smallchart3data, smallchart3option, smallchart4data, smallchart4option } from './chartsData/chartist-charts-data'
import { Send, Clock } from 'react-feather';
import image from '../../assets/images/insurance1.png'
import { Database, ShoppingBag, MessageCircle, UserPlus } from 'react-feather';
import CountUp from 'react-countup';
import Charts from "../new/Charts";
import axios from 'axios'
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


const api = axios.create({
  baseURL: `https://afya-kwanza-backend.herokuapp.com`
})

const Default = (props) => {

  const [daytimes, setDayTimes] = useState()
  const today = new Date()
  const curHr = today.getHours()
  const curMi = today.getMinutes()
  const [meridiem, setMeridiem] = useState("AM")
  const [token, setToken] = useState('')
  const [firstname, setfirstName] = useState("")
  const [lastname, setlastName] = useState("")
  const [members, setMembers] = useState("")
  const [hospitals, setHospitals] = useState("")
  // const jwt_token = localStorage.tokenated
  const getProfile = async () => {
    // console.log("Stored token=>",token)
    try {
      const res = await api.get("/saccos/sacco/profile", {
        headers: { token: localStorage.tokenated }
      });

      // const data = await res.json();
      // console.log("data from server==>", res.data)
      const data = res.data
      setlastName(data.sacco_info.admin_lastname)
      setfirstName(data.sacco_info.admin_firstname)
      localStorage.setItem('sacco_name', data.sacco_info.sacco_name)
      localStorage.setItem('lastname', data.sacco_info.admin_lastname)
      localStorage.setItem('firstname', data.sacco_info.admin_firstname)
      setMembers(data.members)
      setHospitals(data.hospitals)
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {

    if (curHr < 12) {
      setDayTimes('Good Morning')
    } else if (curHr < 18) {
      setDayTimes('Good Afternoon')
    } else {
      setDayTimes('Good Evening')
    }

    if (curHr >= 12) {
      setMeridiem('PM')
    } else {
      setMeridiem('AM')
    }
    getProfile()


  }, [])

  return (
    <Fragment>
      <Layout>
        {/* <Breadcrumb title="Admin Dashboard" /> */}
        <h5 style={{ paddingTop: '3%', marginBottom: '3%', paddingLeft: '2%' }}>DASHBOARD</h5>
        <Container fluid={true}>
          <Row className="second-chart-list third-news-update">
            <Col xl="4 xl-50" lg="12" className="morning-sec box-col-12" style={{ marginBottom: '5%' }}>
              <Card className="o-hidden profile-greeting" style={{ backgroundImage: `url(${image})`, boxShadow: '5px 5px 20px #263238', height: '95%' }}>
                <CardBody style ={{ backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                  <div className="media">
                    <div className="badge-groups w-100">
                      <div className="badge f-12" style={{display:'flex'}}>
                        <Clock style={{ width: "30px", height: "30px" }} className="mr-1" />
                        <span id="txt"> <h3 style={{ color: 'black' }}>{curHr}:{curMi < 10 ? "0" + curMi : curMi} {meridiem}</h3></span>
                      </div>
                      {/* <div className="badge f-12"><i className="fa fa-spin fa-cog f-14"></i></div> */}
                    </div>
                  </div>
                  <div className="greeting-user text-center" >
                    {/* <div className="profile-vector"><img className="img-fluid" src={require("../../assets/images/insurance2.jpg")} alt="" /></div> */}
                    <h2 className="f-w-600" style={{ color: 'white' }}>
                      <span id="greeting">{daytimes},
                        <br />
                        {firstname} {lastname}
                      </span>
                    </h2>
                    {/* <p><span> {"Today's earrning is $405 & your sales increase rate is 3.7 over the last 24 hours"}</span></p> */}
                    {/* <div className="whatsnew-btn"><a className="btn btn-primary" href="#javascript">{"Whats New !"}</a></div> */}
                    {/* <div className="left-icon"><i className="fa fa-bell"> </i></div> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4 xl-50" lg="12" className="calendar-sec box-col-6">
              <Row>
                <Col sm="6" xl="6" lg="6">
                  <Card className="o-hidden" style={{ height: '80%', boxShadow: '5px 5px 20px #263238' }}>
                    <CardBody className="bg-secondary b-r-4 card-body">
                      <div className="media static-top-widget">
                        <div className="align-self-center text-center"><PaymentRoundedIcon /></div>
                        <div className="media-body"><span className="m-0">Amout collected</span>
                          <h4 className="mb-0 counter"><CountUp end={232000} /></h4><PaymentRoundedIcon className="icon-bg" />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="6" xl="6" lg="6">
                  <Card className="o-hidden" style={{ height: '80%', boxShadow: '5px 5px 20px #263238' }}>
                    <div className="bg-secondary b-r-4 card-body">
                      <div className="media static-top-widget">
                        <div className="align-self-center text-center"><PeopleAltIcon /></div>
                        <div className="media-body"><span className="m-0">Sacco Members</span>
                          <h4 className="mb-0 counter"><CountUp end={members} /></h4><PeopleAltIcon className="icon-bg" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col sm="6" xl="6" lg="6">
                  <Card className="o-hidden" style={{ height: '85%', boxShadow: '5px 5px 20px #263238', marginTop: '-5%' }}>
                    <CardBody className="bg-secondary b-r-4">
                      <div className="media static-top-widget">
                        <div className="align-self-center text-center"><LocalHospitalIcon /></div>
                        <div className="media-body"><span className="m-0">Registered Hospitals</span>
                          <h4 className="mb-0 counter"><CountUp end={hospitals} /></h4><LocalHospitalIcon className="icon-bg" />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="6" xl="6" lg="6">
                  <Card className="o-hidden" style={{ height: '85%', boxShadow: '5px 5px 20px #263238', marginTop: '-5%' }}>
                    <CardBody className="bg-secondary b-r-4">
                      <div className="media static-top-widget">
                        <div className="align-self-center text-center"><LocalAtmIcon /></div>
                        <div className="media-body"><span className="m-0">Monthly Expenditure</span>
                          <h4 className="mb-0 counter"><CountUp end={189000} /></h4><LocalAtmIcon className="icon-bg" />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col xl="8 xl-100" className="dashboard-sec box-col-12">
              <Card className="earning-card" style={{ boxShadow: '5px 5px 16px #263238' }} >
                <CardBody className="p-0">
                  <Row className="m-0">
                    <Col xl="3" className="earning-content p-0">
                      <Row className="m-0 chart-left">
                        <Col xl="12" className="p-0 left_side_earning">
                          <h5>Monthly Payments</h5>
                          <p className="font-roboto">{"Overview of last month"}</p>
                        </Col>
                        <Col xl="12" className="p-0 left_side_earning">
                          <h5>{"Ksh232,000"} </h5>
                          <p className="font-roboto">{"Total payments from members"}</p>
                        </Col>
                        <Col xl="12" className="p-0 left_side_earning">
                          <h5>{"Ksh189,000"}</h5>
                          <p className="font-roboto">{"Expenditure on treatment"}</p>
                        </Col>
                        <Col xl="12" className="p-0 left_side_earning">
                          <h5>{"67%"}</h5>
                          <p className="font-roboto">{"Performance analysis"}</p>
                        </Col>
                        <Col xl="12" className="p-0 left-btn"></Col>
                      </Row>
                    </Col>
                    <Col xl="9" className="p-0">
                      <div className="chart-right">
                        <Row className="m-0 p-tb">

                        </Row>
                        <Row>
                          <Col xl="12">
                            <CardBody className="p-0">
                              <div className="current-sale-container">
                                <ApexCharts id="chart-currently" options={Currentlysale.options} series={Currentlysale.series} type='area' height={240} />
                              </div>
                            </CardBody>
                          </Col>
                        </Row>
                      </div>
                      <Row className="border-top m-0">
                        <Col xl="4" md="6" sm="6" className="pl-0">
                          <div className="media p-0">
                            <div className="media-left bg-secondary"><i className="icofont icofont-cur-dollar"></i></div>
                            <div className="media-body">
                              <h6>Money In</h6>
                              <p>{"Ksh232,000"}</p>
                            </div>
                          </div>
                        </Col>
                        <Col xl="4" md="6" sm="6">
                          <div className="media p-0">
                            <div className="media-left" style={{ backgroundColor: 'red' }}><i className="icofont icofont-cur-dollar"></i></div>
                            <div className="media-body">
                              <h6>Money Out</h6>
                              <p>{"Ksh189,000"}</p>
                            </div>
                          </div>
                        </Col>
                        <Col xl="4" md="12" className="pr-0">
                          <div className="media p-0">
                            <div className="media-left bg-secondary"><i className="icofont icofont-cur-dollar"></i></div>
                            <div className="media-body">
                              <h6>Cash Balance</h6>
                              <p>{"Ksh43,000"}</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Charts />
            </Col>


          </Row>
        </Container>
      </Layout>
    </Fragment>
  );
}

export default withRouter(Default);