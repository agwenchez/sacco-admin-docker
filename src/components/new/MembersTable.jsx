import React, { Fragment, useState, useEffect, forwardRef } from 'react';
import { Container } from 'reactstrap'
import { Grid, Button } from '@material-ui/core/'
import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, ViewColumn, SaveAlt, Search } from "@material-ui/icons";
import axios from 'axios';
import { useHistory, withRouter, Link } from "react-router-dom";
import Breadcrumb from '../../layout/breadcrumb';
import { toast } from 'react-toastify';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Layout from "../AppWrapper"
import ConfirmDelete from './ConfirmDelete'
import CustomizedProgressBars from './CircularProgress';

// import { Delete } from 'react-feather';


const tableIcons = {
  Add: forwardRef((props, ref) => <Button {...props} ref={ref} variant="contained" color="primary" >Add New</Button>),
  // Add: () => <Button variant="contained" color="primary" >Add New</Button> ,
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const api = axios.create({
  baseURL: `https://afya-kwanza-backend.herokuapp.com`
})

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const MembersTable = () => {
  const [name, setName] = useState([]); //table data
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(false)


  var columns = [
    { title: "id", field: "id", hidden: true },
    // { title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.first_name} /> },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone No", field: "phonenumber" },
    { title: "Location", field: "location" },
    { title: "Insruance Plan", field: "insurance_plan" },
    {
      cellStyle: {
        paddingLeft: "10%"
      },
      headerStyle: {
        paddingLeft: "10%"
      },
      render: rowData => (
        <Link
          to={{
            pathname: "/dashboard/members/edit",
            state: {
              id: rowData.member_id
            }
          }}
        >
          {/* <IconButton aria-label="delete"> */}
          <EditIcon style={{ color: 'black' }} />
          {/* </IconButton> */}
        </Link>
      )
    },
    {
      cellStyle: {
        paddingRight: "7%"
      },
      headerStyle: {
        paddingRight: "7%"
      },
      render: rowData => (<ConfirmDelete onDelete={() => handleDelete(rowData.member_id)} name={rowData.name} openDialog={openDialog} />)
    },

  ]

  let openDialog = false;


  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/members/delete/${id}`)

      const dataDelete = [...riders];
      const afterDelete = dataDelete.filter(rider => rider.member_id !== id);

      setRiders([...afterDelete]);
      if (res.status == 200) {
        toast.success(res.data)
      }

    } catch (error) {
      console.log("error occured=>", error.message)
      toast.error(error)
    }

  }

  useEffect(() => {

    setName(localStorage.sacco_name)
    setLoading(true)
    api.get(`/saccos/members/${name}`)
      .then(res => {
        // console.log("data =>", res.data)
        setRiders(res.data)
        setLoading(false)
      }
      ).catch(error => {
        console.log("Error", error)
      })

  }, [name])

  const history = useHistory();


  return (
    <Layout>
      <Fragment>

        <Container fluid={true}>
          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '10%', textAlign: 'center' }}>Sacco Members Table</h3>
            <Grid container spacing={10} style={{ paddingTop: '5%' }}>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2">
                <Button onClick={() => { history.push('/dashboard/members/new') }} variant="contained" color="primary" >
                  Add New
                </Button>
              </Grid>
            </Grid>

            {/* <Modal /> */}
            <Grid container spacing={1} style={{ marginBottom: '6%' }}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>


                {loading ? (<CustomizedProgressBars />) :
                  (<MaterialTable
                    title="Sacco Members"
                    style={{ zIndex: '0' }}
                    columns={columns}
                    data={riders}
                    icons={tableIcons}
                    options={{
                      exportButton: true,
                      selection: true,
                      // filtering: true,
                      actionsColumnIndex: -1,
                      search: true,
                      paginationType: 'normal',
                      pageSize: 10,
                      pageSizeOptions: [25, 50, 100, 200, 300, 400, 500, 600, 700]
                    }}
                    actions={[
                      {
                        tooltip: 'Remove All Selected Users',
                        icon: DeleteOutline,
                        onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                      }
                    ]}

                  />)}
              </Grid>

            </Grid>
          </div>
        </Container>
      </Fragment>
    </Layout>
  );
}

export default withRouter(MembersTable)