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
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})

const validationSchema = yup.object().shape({
    first_name: yup
        .string('Enter first name')
        .required('First name is a required field'),
    last_name: yup
        .string('Enter last name')
        .required('Last name is a required field'),
    gender: yup
        .string('Select a gender')
        .required('Gender is a required field'),
    date_of_birth: yup
        .string('Enter date of birth')
        .required('Date of birth is a required field'),
    relationship: yup
        .string('Select relationship')
        .required('Relationship is a required field'),
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

const relationship = [
    {
        name: ''
    },
    {
        name: 'Spouse'
    },
    {
        name: 'Son'
    },
    {
        name: 'Daughter' 
    },
    {
        name: 'Adopted' 
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
        marginTop: '20%'
    },
    form: {
        paddingTop: theme.spacing(4)
    }
}))



const DependantsRegistration = () => {
    const classes = useStyles();
    const ID_number = localStorage.ID_number
    const [token,setToken] = useState('')


    useEffect(() => {

        setToken(localStorage.tokenated)

    }, [])

    const formik = useFormik({
        initialValues: {
            first_name: '',
            middle_name:'',
            last_name:'',
            date_of_birth: '',
            relationship:'',
            member_ID_number: ID_number,
            gender: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            try {
                setSubmitting(true);
                const response = await api.post('/dependants/add', values, {
                    headers: { token: token }
                  })
                response.status === 201 && toast.success(`New dependant: "${values.first_name} ${values.middle_name} ${values.last_name}" added successfully`)
                resetForm()
            } catch (error) {
                error.message == 'Network Error' && toast.error("Kindly check your network connection!")
                error.message == 'Request failed with status code 409' && toast.error("Another member exists with that email/phonenumber")
                error.message == 'Request failed with status code 500' && toast.error("Internal Server error")
            }

        },
    });


    //   console.log("here are the mf values=>", formik.values);
    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Dependants" title="Dependants Registration" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238' }}>
                    <Grid container spacing={3} >
                        <Grid item xs="12">
                            <form onSubmit={formik.handleSubmit} className={classes.form}>
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
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                            helperText={formik.touched.first_name && formik.errors.first_name}
                                            autoFocus
                                        />

                                    </Grid>
                                    <Grid item xs="12" sm="6">
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
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.middle_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.middle_name && Boolean(formik.errors.middle_name)}
                                            helperText={formik.touched.middle_name && formik.errors.middle_name}
                                        />
                                        
                                    </Grid>

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
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                            helperText={formik.touched.last_name && formik.errors.last_name}
                                        />
                                        <TextField
                                            id="member_ID_number"
                                            name="member_ID_number"
                                            type="hidden"
                                            defaultValue={formik.values.ID_number}
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
                                            id="gender"
                                            name="gender"
                                            select
                                            label="GENDER"
                                            className={classes.textField}
                                            style={{ marginTop: '2.3ch' }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
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
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="RELATIONSHIP"
                                            id="relationship"
                                            name="relationship"
                                            select
                                            style={{ marginTop: '2.3ch' }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.relationship}
                                            onChange={formik.handleChange}
                                            error={formik.touched.relationship && Boolean(formik.errors.relationship)}
                                            helperText={formik.touched.relationship && formik.errors.relationship}
                                        >
                                             {relationship.map((option) => (
                                                <option key={option.name} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}

                                        </TextField>
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

export default withRouter(DependantsRegistration);