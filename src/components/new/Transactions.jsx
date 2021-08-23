import React, { Fragment, useState, useEffect, forwardRef } from 'react';
import { Container } from 'reactstrap'
import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, ViewColumn, SaveAlt, Search } from "@material-ui/icons";
import axios from 'axios';
import { useHistory, withRouter, Link } from "react-router-dom";
// import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';
import Layout from "../AppWrapper"
import EditIcon from '@material-ui/icons/Edit';
import ConfirmDelete from './ConfirmDelete';
import { Button, Grid, Tooltip } from '@material-ui/core/';
import CustomizedProgressBars from './CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
  baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})


const Transactions = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  const history = useHistory();
  const sacco_name = localStorage.sacco_name

  var columns = [
    { render: rowData => rowData.tableData.id + 1,  width: '2%' },
    // { title: "Paybill", field: "paybill" },
    // { title: "Member ID No", field: "ID_number" },
    { title: "Phone Number", field: "phonenumber" },
    { title: "Amount", field: "amount" },
    { title: "MPESA code", field: "mpesa_confirmation_code" },
    { title: "Transaction Status", field: "transaction_status" },
    // { title: "Sacco", field: "sacco" },
    { title: "Date", field: "date"},
    // {
    //     render: rowData => (
    //       <Link
    //         to={{
    //           pathname: `/dashboard/billing/transaction/${rowData.transaction_id}`,
    //           state: {
    //             id: rowData.id_number
    //           }
    //         }}
    //       >
    //         <Tooltip title="View Transaction">
    //           <VisibilityIcon />
    //         </Tooltip>
    //       </Link>
    //     )
    //   }
  ]


  const getTransactions = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/billing/transaction/sacco/${sacco_name}`,{
        headers:{ token: localStorage.tokenated}
      })
      // const data = res.data.filter( trans => trans.transaction_status !== "Cancelled")
      setMembers(res.data)
      setLoading(false)
     

    } catch (error) {
      console.log("Error==>", error.message)
      toast.error('An error occured')
    }
  }

  useEffect(() => {

    getTransactions()

  }, [])






  // console.log("State Data==>", members)
  return (
    <Layout>
      <>
        <Container fluid={true}>
          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '5%', marginBottom: '2.5%', textAlign: 'center' }}>Transactions Table</h3>

            {/* <Modal /> */}
            <Grid container spacing={1} style={{ marginBottom: '6%' }}>
              <Grid item xs={12}>

                {loading ? (<CustomizedProgressBars />) :
                  (<MaterialTable
                    title="Transations"
                    style={{ zIndex: '0' }}
                    columns={columns}
                    data={members}
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
                      pageSizeOptions: [50, 100]
                    }}

                  />)}
              </Grid>

            </Grid>
          </div>
        </Container>
      </>
    </Layout>
  );
}

export default withRouter(Transactions)