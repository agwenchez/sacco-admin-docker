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

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
  })

  
const validationSchema = yup.object().shape({
    phonenumber: yup
        .string('Enter phone number')
        .max(10, 'Phone number should be 10 characters max')
        .required('Phone number is a required field'),
    amount: yup
        .number("Enter a amount in digits")
        .required('Amount is a required field'),
});


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
        // margin: theme.spacing(1),
        color: 'black',
        backgroundColor: '#7364F6',
        border: '1px solid black',
        borderRadius: '10px',
        marginTop: '10%',
        // [theme.breakpoints.down('sm')]: {
        //     marginRight: theme.spacing(3),
        // }
    },
    form: {
        paddingTop: theme.spacing(4)
    }
}))



const Payment = () => {
    const classes = useStyles();
    const sacco_name = localStorage.sacco_name

    const formik = useFormik({
        initialValues: {
            phonenumber: '',
            amount:''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            try {
                setSubmitting(true);
                // console.log("Formik values", values)
                const {phonenumber,amount} = values
                const response = await api.post(`/billing/transaction/new/${phonenumber}/${amount}`)
               
                let {MerchantRequestID,CheckoutRequestID} = response.data
                resetForm()
                toast.success("Kindly enter mpesa pin on the prompt on your phone to complete payment")

                if(response.data.length !==0) {
                    console.log("Response =>", response.data)
                      
                    // setInterval(async() => {
                        try {
                            const added_trans = await api.post(`/billing/transaction_update/${MerchantRequestID}/${CheckoutRequestID}/${sacco_name}/${amount}`)
                            console.log('Added Trans to DB', added_trans.data)
                            
                        } catch (error) {
                            console.log("Some error occured on update transasction=>", error.message)
                        }
                        
                    // }, 5000);
                }
            } catch (error) {
                console.log("Some error occured=>", error.message)
                toast.error(error.message)
                error.message == 'Network Error' && toast.error("Kindly check your network connection!")
                // error.message == 'Request failed with status code 409' && toast.error("A member with that ID Number already exists")
                // error.message == 'Request failed with status code 500' && toast.error("Internal Server error")
            }

        },
    });


    //   console.log("here are the mf values=>", formik.values);
    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Dashboard" title="Lipa Na Mpesa" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238' }}>
                    <Grid container spacing={3}>
                        <Grid item xs="12">
                            <form onSubmit={formik.handleSubmit} className={classes.form}>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="phonenumber"
                                            name="phonenumber"
                                            label="PHONE NUMBER"
                                            className={classes.textField}
                                            placeholder="Enter phone number"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.phonenumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                                            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                                            autoFocus
                                        />

                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="amount"
                                            name="amount"
                                            label="AMOUNT"
                                            className={classes.textField}
                                            placeholder="Enter amount"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                                            helperText={formik.touched.amount && formik.errors.amount}

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
                                <Grid container style={{ width: '86%', margin: '0 8%' }}>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3">

                                        <div className={classes.div}>
                                            <Button type="submit" disabled={formik.isSubmitting} size="medium" variant="raised" className={classes.button}>
                                                submit
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

export default withRouter(Payment);