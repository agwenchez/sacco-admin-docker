import React, { Fragment, useState, useEffect, forwardRef } from 'react';
import { Container } from 'reactstrap'
import { Grid, Button, Tooltip } from '@material-ui/core/'
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
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
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


const MembersTable = () => {
  const [name, setName] = useState([]); //table data
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);


  var columns = [
    // { title: "Avatar", render: rowData => <Avatar maxInitials={1} size={30} round={true} name={rowData === undefined ? " " : rowData.first_name} /> },
    { title: "Full Name", field: "full_name" },
    { title: "D.O.B", field: "date_of_birth" },
    { title: "ID No", field: "id_number" },
    { title: "Phone Number", field: "phonenumber" },
    { title: "Gender", field: "gender" },
    // { title: "Sacco", field: "sacco" },
    { title: "Route Name", field: "route_name" },
    { title: "Email", field: "email" },
    {
      cellStyle: {
        paddingLeft: "7%"
      },
      headerStyle: {
        paddingLeft: "7%"
      },
      render: rowData => (
        <Link
          to={{
            pathname: "/dashboard/members/dependants",
            state: {
              id: rowData.id_number
            }
          }}
        >
          <Tooltip title="Dependant(s)">
            <PeopleOutlineIcon style={{ color: 'black' }} />
          </Tooltip>
        </Link>
      )
    },
    {
      cellStyle: {
        paddingLeft: "4.5%"
      },
      headerStyle: {
        paddingLeft: "4.5%"
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
      // cellStyle: {
      //   paddingRight: "7%"
      // },
      // headerStyle: {
      //   paddingRight: "7%"
      // },
      render: rowData => (<ConfirmDelete onDelete={() => handleDelete(rowData.member_id)} name={rowData.full_name} openDialog={openDialog} />)
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

    // setName()
    setLoading(true)
    api.get(`/saccos/members/${localStorage.sacco_name}`)
      .then(res => {
        // console.log("data =>", res.data)
        setRiders(res.data)
        setLoading(false)
      }
      ).catch(error => {
        console.log("Error", error)
      })

  }, [])

  const history = useHistory();


  return (
    <Layout>
      <Fragment>

        <Container fluid={true}>
          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '5%', textAlign: 'center' }}>Sacco Members Table</h3>
            <Grid container spacing={10} style={{ paddingTop: '2.5%' }}>
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
                      rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : 'white'
                      }),
                      actionsColumnIndex: -1,
                      search: true,
                      paginationType: 'normal',
                      pageSize: 25,
                      pageSizeOptions: [ 50, 100, 200]
                    }}
                    // actions={[
                    //   {
                    //     tooltip: 'Remove All Selected Users',
                    //     icon: DeleteOutline,
                    //     onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                    //   }
                    // ]}

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