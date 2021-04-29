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
    baseURL: `https://afya-kwanza-backend.herokuapp.com`
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
        backgroundColor: '#313F9F',
        border: '1px solid black',
        borderRadius: '10px',
        marginTop: '20%'
    },
    form: {
        paddingTop: theme.spacing(4)
    }
}))



const MemberEdit = ({ location }) => {

    const [data, setData] = useState({})
    const [id, setId] = useState("");
    const classes = useStyles()
    const history = useHistory()

    const getUser = async () => {

        try {
            const res = await api.get(`/members/member/${id}`)
            console.log("Response from API", res.data)

            const member = res.data
            console.log("Member data=>", member)
            setData(member)
            // localStorage.setItem("user", JSON.stringify(res.data))
            // setData(JSON.parse(localStorage.getItem('user')))    
            console.log("state data=>", data)
        } catch (error) {
            console.log("Error", error)
        }

    }

    useEffect(() => {

        setId(location.state.id)
        console.log("member id==>", id)
        getUser()

    }, [id])


    const onChange = e => setData({ ...data, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault();

        //   alert(`Name after change :${data.name}`)

        const { name, email, location, insurance_plan, phonenumber, sacco } = data

        try {
            const res = await api.put(`/members/update/${id}`, { name, email, location, insurance_plan, phonenumber, sacco })
            // console.log("response object=>", res)
            toast.success(res.data)
            history.push('/dashboard/members')

        } catch (error) {
            toast.error(error)
        }


    }

    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Members" title="Edit Sacco Member" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238' }}>
                    <Grid container spacing={3} >
                        <Grid item xs="12">
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="NAME"
                                            className={classes.textField}
                                            placeholder="Enter name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={data.name}
                                            onChange={e => onChange(e)}
                                            autoFocus
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
                                            value={data.email}
                                            onChange={e => onChange(e)}
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
                                            value={data.phonenumber}
                                            onChange={e => onChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs="12" sm="6">
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
                                            value={data.sacco}
                                            inputProps={
                                                { readOnly: true, }
                                            }
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <TextField
                                            label="LOCATION"
                                            id="location"
                                            name="location"
                                            placeholder="Location"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={data.location}
                                            onChange={e => onChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            label="INSURANCE PLAN"
                                            id="insurance_plan"
                                            name="insurance_plan"
                                            placeholder="Insurance plan"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={data.insurance_plan}
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

export default withRouter(MemberEdit)