import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../layout/breadcrumb';
import { useHistory, withRouter } from "react-router-dom";
import Layout from "../../AppWrapper"


const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com`
})

const validationSchema = yup.object().shape({
    full_name: yup
        .string('Enter full name')
        .required('Full name is a required field'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is a required field'),
    id_number: yup
        .string('Enter ID number')
        // .max(10, 'Phone number should be 10 characters max')
        .required('ID number is a required field'),
    phonenumber: yup
        .string('Enter phone number')
        .max(10, 'Phone number should be 10 characters max')
        .required('Phone number is a required field'),
    sacco: yup
        .string('Select a sacco')
        .required('Sacco is a required field'),
    route_name: yup
        .string('Enter a route name')
        .required('Route name is a required field'),
    gender: yup
        .string('Select a gender')
        .required('Gender is a required field'),
    date_of_birth:yup
        .string('Enter date of birth')
        .required('Date of birth is a required field')
});


const gender = [
    {
        name: ''
    },
    {
        name: 'Male'
    },
    {
        name: 'Female'
    }
]
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
        marginTop: '20%',
        // [theme.breakpoints.down('sm')]: {
        //     marginRight: theme.spacing(3),
        // }
    },
    form: {
        paddingTop: theme.spacing(4)
    }
}))



const SaccoMemberRegistration = () => {
    const classes = useStyles();
    const sacco_name = localStorage.sacco_name

    const formik = useFormik({
        initialValues: {
            full_name: '',
            date_of_birth:'',
            email: '',
            phonenumber: '',
            id_number:'',
            sacco: sacco_name,
            route_name: '',
            gender: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            try {
                setSubmitting(true);
                // console.log("Formik values", values)
                const response = await api.post('/members/add', values)
                // console.log("response object", response)
                toast.success(response.data)
                resetForm()
            } catch (error) {
                // console.log("Some error occured=>", error.message)
                error.message == 'Network Error' && toast.error("Kindly check your network connection!")
                error.message == 'Request failed with status code 409' && toast.error("A member with that ID Number already exists")
                error.message == 'Request failed with status code 500' && toast.error("Internal Server error")
            }

        },
    });


    //   console.log("here are the mf values=>", formik.values);
    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Members" title="Sacco Member Registration" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238' }}>
                    <Grid container spacing={3}>
                        <Grid item xs="12">
                            <form onSubmit={formik.handleSubmit} className={classes.form}>
                                <Grid container spacing={3}>
                                <Grid item xs="12" sm="6">
                                        <TextField
                                            id="full_name"
                                            name="full_name"
                                            label="FULL NAME"
                                            className={classes.textField}
                                            placeholder="Enter full name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.full_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                                            helperText={formik.touched.full_name && formik.errors.full_name}
                                            autoFocus
                                        />

                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                    <TextField
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            label="DATE OF BIRTH"
                                            className={classes.textField}
                                            placeholder="Enter date of birth"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.date_of_birth}
                                            onChange={formik.handleChange}
                                            error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                                            helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                                    
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="ID NUMBER"
                                            id="id_number"
                                            name="id_number"
                                            placeholder="ID Number"
                                            style={{ marginTop: '2.3ch' }}
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.id_number}
                                            onChange={formik.handleChange}
                                            error={formik.touched.id_number && Boolean(formik.errors.id_number)}
                                            helperText={formik.touched.id_number && formik.errors.id_number}
                                        />

                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="EMAIL"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="PHONE NUMBER"
                                            id="phonenumber"
                                            name="phonenumber"
                                            placeholder="Phone Number"
                                            style={{ marginTop: '2.3ch' }}
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.phonenumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                                            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                                        />
                                    </Grid>
                                    <Grid item xs="12" sm="6">

                                    <TextField
                                            id="gender"
                                            name="gender"
                                            select
                                            label="GENDER"
                                            className={classes.textField}
                                            // value={saccos}
                                            style={{ marginTop: '2.3ch' }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            defaultValue={""}
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                                            helperText={formik.touched.gender && formik.errors.gender}
                                            variant="outlined"
                                        >

                                            {gender.map((option) => (
                                                <option key={option.name} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}

                                        </TextField>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="ROUTE NAME"
                                            id="route_name"
                                            name="route_name"
                                            placeholder="Enter route name"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.route_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.route_name && Boolean(formik.errors.route_name)}
                                            helperText={formik.touched.route_name && formik.errors.route_name}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="sacco"
                                            name="sacco"
                                            label="Sacco"
                                            // type="hidden"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            defaultValue={formik.values.sacco}
                                            inputProps={
                                                { readOnly: true, }
                                            }
                                        // onChange={formik.handleChange}
                                        // error={formik.touched.sacco && Boolean(formik.errors.sacco)}
                                        // helperText={formik.touched.sacco && formik.errors.sacco}
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
                                            <Button type="submit" disabled={formik.isSubmitting} size="medium" variant="raised" className={classes.button}>
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

export default withRouter(SaccoMemberRegistration);