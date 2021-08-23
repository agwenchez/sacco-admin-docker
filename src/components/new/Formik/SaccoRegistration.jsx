import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../layout/breadcrumb';
import { withRouter } from 'react-router';
import Layout from "../../AppWrapper"

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com`
})


const validationSchema = yup.object().shape({
    name: yup
        .string('Enter a name')
        .required('Name is a required field'),
    email: yup
        .string('Enter a sacco email')
        .email('Enter a valid email')
        .required('Email is required'),
    admin_name: yup
        .string('Enter Admin Name')
        .max(30, 'Admin name should be 30 characters max')
        .required('Amin Name is a required field'),
    admin_password: yup
        .string('Enter an admin password')
        .required('Admin password is a required field')
});


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        borderRadius: '15px',
        backgroundColor: 'white',
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
}));

const SaccoRegistration = () => {
    const classes = useStyles();
    // const [data, setData] = React.useState({});

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            admin_name: '',
            admin_password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                setSubmitting(true);
                const response = await api.post('/saccos/add', values)
                if (response.status === 201) {
                    toast.success(response.data)
                    resetForm()
                }
            } catch (error) {
                console.log("Some error occured=>", error.message)
                if (error.message === 'Request failed with status code 409') {

                    toast.error('Sacco with that name already exists')
                }
                else {
                    toast.error('Internal server error')
                }
                // resetForm()
            }

        },
    });


    return (
        <Layout>
            <div className={classes.root}>
                <Grid container spacing={3} >
                    <Grid item xs="12">
                        <Breadcrumb parent="Saccos" title="Sacco Registration" />
                    </Grid>
                    <Grid item xs="12">
                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="NAME"
                                        className={classes.textField}
                                        placeholder="Enter sacco name"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        size="small"
                                        variant="outlined"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        autoFocus
                                    />

                                </Grid>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="EMAIL"
                                        id="email"
                                        name="email"
                                        placeholder="Enter sacco email"
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sacoo_email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="ADMIN NAME"
                                        id="admin_name"
                                        name="admin_name"
                                        placeholder="Enter Admin name"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.admin_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.admin_name && Boolean(formik.errors.admin_name)}
                                        helperText={formik.touched.admin_name && formik.errors.admin_name}
                                    />
                                </Grid>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="ADMIN PASSWORD"
                                        id="admin_password"
                                        name="admin_password"
                                        placeholder="Enter Admin password"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.admin_password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.admin_password && Boolean(formik.errors.admin_password)}
                                        helperText={formik.touched.admin_password && formik.errors.admin_password}
                                    />
                                </Grid>

                            </Grid>
                            {/* <Grid container spacing={3}>
                        <Grid item xs>
                        <TextField
                            label="INSURANCE COVER"
                            id="insurance_cover"
                            name="insurance_cover"
                            placeholder="Insurance cover"
                            className={classes.textField}
                            margin="normal"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={formik.values.insurance_cover}
                            onChange={formik.handleChange}
                            error={formik.touched.insurance_cover && Boolean(formik.errors.insurance_cover)}
                            helperText={formik.touched.insurance_cover && formik.errors.insurance_cover}
                        />
                        </Grid>
                        <Grid item xs>
                        <TextField
                            id="sacco"
                            name="sacco"
                            select
                            label="Sacco"
                            className={classes.textField}
                            value={saccos}
                            style={{ marginTop:'1.8ch'}}
                            SelectProps={{
                                native: true,
                            }}
                            size="small"
                            value={formik.values.sacco}
                            onChange={formik.handleChange}
                            error={formik.touched.sacco && Boolean(formik.errors.sacco)}
                            helperText={formik.touched.sacco && formik.errors.sacco}
                            variant="outlined"
                            >
                            
                            {saccos.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.value}
                                </option>
                            ))}
                            
                        </TextField>
                        </Grid>
                    
                    </Grid> */}
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
        </Layout>
    );
}

export default withRouter(SaccoRegistration)