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
import { Button, Grid, Tooltip, IconButton } from '@material-ui/core/';
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
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})


const DependantsTable = ({ location }) => {
    const [dependants, setDependants] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [ID_number, setID] = useState('')
    const history = useHistory();

    var columns = [
        { render: rowData => rowData.tableData.id + 1},
        { title: "First Name", field: "first_name" ,  width: '2%'},
        { title: "Middle Name", field: "middle_name" ,  width: '2%'},
        { title: "Last Name", field: "last_name" ,  width: '2%'},
        { title: "D.O.B", field: "date_of_birth" ,  width: '2%'},
        { title: "Gender", field: "gender" ,  width: '2%'},
        { title: "Relationship", field: "relationship" ,  width: '2%'},
        {
            cellStyle: {
                paddingLeft: "2.5%"
            },
            headerStyle: {
                paddingLeft: "2.5%"
            },
            render: rowData => (
                <Link
                    to={{
                        pathname: "/dashboard/members/dependants/edit",
                        state: {
                            id: rowData.dependant_id
                        }
                    }}
                >
                    <Tooltip title="Edit">
                        <EditIcon style={{ color: 'black' }} />
                    </Tooltip>
                </Link>
            )
        },
        {

            render: rowData => (<ConfirmDelete onDelete={() => handleDelete(rowData.dependant_id)} name={`${rowData.first_name} ${rowData.last_name}`} openDialog={openDialog} />)
        },

    ]

    let openDialog = false;

    const handleDelete = async (id) => {
        try {
            const res = await api.delete(`/dependants/delete/${id}`)
            const dataDelete = [...dependants];
            const afterDelete = dataDelete.filter(dependant => dependant.dependant_id !== id);

            setDependants([...afterDelete]);
            if (res.status == 200) {
                toast.success(res.data)
            }

        } catch (error) {
            console.log("error occured=>", error)
            toast.error(error)
        }

    }

    const getDependants = async () => {
        const ID_number = location.state.id
        try {
            setLoading(true)
            const res = await api.get(`/dependants/all_dependants/${ID_number}`, {
                headers: { token: localStorage.tokeanted }
            })
            // console.log("Data from API==>", res.data)
            setLoading(false)
            setDependants(res.data)

        } catch (error) {
            console.log("Error==>", error.message)
        }
    }

    useEffect(() => {

        setID(location.state.id)
        getDependants()

        localStorage.setItem('ID_number', ID_number)
        // console.log("ID Number=>", localStorage.ID_number)
    }, [ID_number])


    return (
        <Layout>
            <>
                <Container fluid={true}>
                    <div style={{ width: '100%' }}>

                        <h3 style={{ paddingTop: '5%', marginBottom: '2.5%', textAlign: 'center' }}>Dependants Table</h3>
                        <Grid container spacing={10}>
                            <Grid item xs="2"></Grid>
                            <Grid item xs="2"></Grid>
                            <Grid item xs="2"></Grid>
                            <Grid item xs="2"></Grid>
                            <Grid item xs="2"></Grid>
                            <Grid item xs="2">
                                <Button onClick={() => { history.push('/dashboard/members/dependants/new') }} variant="contained" color="primary" >
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
                                        title="Dependants"
                                        style={{ zIndex: '0' }}
                                        columns={columns}
                                        data={dependants}
                                        icons={tableIcons}
                                        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                                        options={{
                                            exportButton: true,
                                            rowStyle: rowData => ({
                                                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : 'white'
                                            }),
                                            actionsColumnIndex: -1,
                                            search: true,
                                            paginationType: 'normal',
                                            pageSize: 5,
                                            //   pageSizeOptions: [ 5 ]
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
            </>
        </Layout>
    );
}

export default withRouter(DependantsTable)