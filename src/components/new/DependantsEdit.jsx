import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../layout/breadcrumb';
import { useHistory, withRouter } from "react-router-dom";
import Layout from "../AppWrapper"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
  })
  


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(4),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(10),
        borderRadius: '10px',
        backgroundColor: 'white',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

    },
    textField: {
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "85%"
        },
        width: '45ch',
    },
    div: {
        // display:'flex'
        textAlign: 'right'
    },
    button: {
        margin: theme.spacing(1),
        color: 'black',
        backgroundColor: '#7364F6',
        border: '1px solid black',
        borderRadius: '10px',
        marginTop: '20%'
    },
    form: {
        paddingTop: theme.spacing(4)
    }
}))



const DependantEdit = ({location}) => {

    const [data, setData] = useState({})
    const [id, setId] = useState("");
    const classes = useStyles()
    const history = useHistory()
    const [selectedDate, setSelectedDate] = React.useState();

    
    const getUser = async()=>{
   
        // console.log("member id==>", location.state.id)
        setId(location.state.id)
        try {
            const res = await api.get(`/dependants/dependant/${id}`)
            const dependant = res.data
            setData(dependant)
            // setSelectedDate(member.date_of_birth)
            
        } catch (error) {
            console.log("Error", error)
        }
       
    }

    useEffect(() => {

        getUser()
   
    }, [id])

    const handleDateChange = (date) => {
        setSelectedDate(date);
     };

    const onChange = e => setData({...data, [e.target.name]: e.target.value})

    const handleSubmit = async e =>{
      e.preventDefault();
  
      const { first_name, middle_name , last_name, gender, date_of_birth, relationship, member_id_number } = data
    
      try {
        const res = await api.put(`/dependants/update/${id}`,{ first_name, middle_name , last_name, gender, date_of_birth, relationship, member_id_number })
        toast.success(`Dependant: "${first_name} ${middle_name} ${last_name}" updated succesfully`)
        history.push({
            pathname: '/dashboard/members/dependants',
            state:{ id: member_id_number}
        })
      } catch (error) {
        toast.error(error)
      }
  
  
    }

    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Dependants" title="Edit Dependant" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238'}}>
                    <Grid container spacing={3} >
                        <Grid item xs="12">
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="first_name"
                                            name="first_name"
                                            label="FIRST NAME"
                                            className={classes.textField}
                                            placeholder="Enter first name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={data.first_name}
                                            onChange={e => onChange(e)}
                                            autoFocus
                                        />

                                    </Grid>
                                        <TextField
                                            id="middle_name"
                                            name="middle_name"
                                            label="MIDDLE NAME"
                                            className={classes.textField}
                                            placeholder="Enter middle name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            style={{ marginTop: '2.3%', marginLeft: '6.8%' }}
                                            size="small"
                                            variant="outlined"
                                            value={data.middle_name}
                                            onChange={e => onChange(e)}
                                        />
                                    

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="last_name"
                                            name="last_name"
                                            label="LAST NAME"
                                            className={classes.textField}
                                            placeholder="Enter last name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={data.last_name}
                                            onChange={e => onChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        label="DATE OF BIRTH"
                                        className={classes.textField}
                                        placeholder="Enter date of birth (format dd/MM/yyyy)"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ marginTop:'2.3%' }}
                                        size="small"
                                        variant="outlined"
                                        value={data.date_of_birth}
                                        onChange={e => onChange(e)}
                                        />  
                                        <TextField
                                            id="member_ID_number"
                                            name="member_ID_number"
                                            type="hidden"
                                            defaultValue={data.member_id_number}
                                        />

                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <TextField
                                            label="GENDER"
                                            id="gender"
                                            name="gender"
                                            placeholder="Gender"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={data.gender}
                                            onChange={e => onChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            label="RELATIONSHIP"
                                            id="relationship"
                                            name="relationship"
                                            placeholder="Enter Relationship"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={data.relationship}
                                            onChange={e => onChange(e)}
                                        />
                                    </Grid>

                                </Grid>
                                {/* <Button
                        type="button"
                        className="outline"
                        onClick={formik.handleReset}
                        disabled={!formik.dirty || formik.isSubmitting}
                    >
                    Reset
                    </Button> */}
                                <Grid container style={{ width: '86%', margin: '0 7%' }}>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3">

                                        <div className={classes.div}>
                                            <Button type="submit" size="medium" variant="raised" className={classes.button}>
                                                Submit
                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>

                </div>
            </>
        </Layout>
    );
}

export default withRouter(DependantEdit)