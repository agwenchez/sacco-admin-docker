import React, { Fragment, useState, useEffect, forwardRef } from 'react';
import { Container } from 'reactstrap'
import { Grid, Button } from '@material-ui/core/'
import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, ViewColumn, SaveAlt, Search } from "@material-ui/icons";
import axios from 'axios';
import { useHistory, withRouter } from "react-router-dom";
// import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';
import Modal from './modal';
import Layout from "../AppWrapper"

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


// const api = axios.create({
//   baseURL: `https://afya-kwanza-backend.herokuapp.com`
// })

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const SaccoTable = () => {

  var columns = [
    { title: "id", field: "id", hidden: true },
    // { title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.first_name} /> },
    { title: "Name", field: "name" },
    // { title: "Sacco_email", field: "sacco_email" },
    { title: "Admin Name", field: "admin_name" },
    { title: "Admin Password", field: "admin_password" },
    { title: "Sacco Email", field: "sacco_email" },

  ]
  const [data, setData] = useState([]); //table data
  const [riders, setRiders] = useState([])

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    axios.get('/saccos/all')
      .then(res => {
        // console.log("data =>", res.data)
        setRiders(res.data)
        console.log("saccos =>", riders)
      }
      ).catch(error => {
        console.log("Error", error)
      })
  }, [])


  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    // console.log("Newdata==>",newData)
    let errorList = []
    if (newData.name === undefined) {
      errorList.push("Please enter a name")
    }
    if (newData.email === undefined) {
      errorList.push("Please enter an email")
    }
    if (newData.admin_password === undefined) {
      errorList.push("Please enter an admin password")
    }
    if (newData.admin_name === undefined) {
      errorList.push("Please enter an admin name")
    }


    if (errorList.length < 1) {
      console.log("SACCO ID==>", newData.sacco_id)
      axios.put("/saccos/update/" + newData.sacco_id, newData)
        .then(res => {
          console.log("server response", res)
          const dataUpdate = [...riders];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setRiders([...dataUpdate]);
          console.log("Response status ==>", res.status);
          if (res.status == 201) {
            toast.success(res.data)
          }
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages([`Update failed: ${error}`])
          toast.error(`Update failed: ${error}`);
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }

  }


  const handleRowDelete = (oldData, resolve) => {
    axios.delete("/saccos/delete/" + oldData.sacco_id)
    console.log("SACCO ID==>", oldData.sacco_id)
      .then(res => {
        const dataDelete = [...riders];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setRiders([...dataDelete]);
        // alert(res.data)
        console.log("API Response",res)
        if (res.status == 200) {
          toast.success(res.data)
        }
        resolve()
      })
      .catch(error => {
        console.log(error)
        toast.error(`Delete failed:${error}`)
        setIserror(true)
        resolve()
      })
  }

  const history = useHistory();


  return (
    <Layout>
      <Fragment>
        <Container fluid={true}>
          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '5%', marginBottom: '2.5%', textAlign: 'center' }}>Saccos Table</h3>
            <Grid container spacing={10}>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2">
                <Button onClick={() => { history.push('/dashboard/saccos/new') }} variant="contained" color="primary" >
                  Add New
                </Button>
              </Grid>
            </Grid>

            {/* <Modal /> */}
            <Grid container spacing={1} style={{ marginBottom: '6%' }}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                {/* <div>
                {iserror &&
                  <Alert severity="error">
                    {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                    })}
                  </Alert>
                }
              </div> */}
                <MaterialTable
                  title="Saccos"
                  style={{ zIndex: '0' }}
                  columns={columns}
                  data={riders}
                  icons={tableIcons}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);

                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        handleRowDelete(oldData, resolve)
                      }),
                  }}
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

                />
              </Grid>

            </Grid>
          </div>
        </Container>
      </Fragment>
    </Layout>
  );
}

export default SaccoTable;