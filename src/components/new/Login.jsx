import React, { useState } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, CssBaseline } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import image from '../../assets/images/insurance2.jpg'
import CustomizedProgressBars from './CircularProgress';


const api = axios.create({
  baseURL: `https://afya-kwanza-backend.herokuapp.com`
})

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(15, 4),
    // [theme.breakpoints.down('sm')]:{
    //     margin: theme.spacing(15, 4)
    // },
    // [theme.breakpoints.down('md')]:{
    //     margin: theme.spacing(30, 4)
    // },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '55%', // Fix IE 11 issue.
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      width: '95%'
    },
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '50px'
  },
}));


const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false)

  const { email, password } = inputs;

  const onChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { email, password };
      setLoading(true)
      const res = await api.post('/saccos/admin/login', body)

      if (res.data.token) {
        const response = await api.get("/saccos/sacco/profile", {
          headers: { token: res.data.token }
        });
        const data = response.data
        localStorage.setItem('sacco_name', data.sacco_info.sacco_name)
        localStorage.setItem('lastname', data.sacco_info.admin_lastname)
        localStorage.setItem('firstname', data.sacco_info.admin_firstname)
        localStorage.setItem('role', data.sacco_info.role)
        localStorage.setItem('members', data.members)
        localStorage.setItem("tokenated", res.data.token);

        setLoading(false)
        
        localStorage.tokenated &&
          history.push('/dashboard')
          toast.success("Logged in Successfully");

      } else {
        // setAuth(false);
        console.log("error=>", res.msg)
        // if(res)
        toast.error(res.msg);
      }
    } catch (err) {
      setLoading(false)
      // console.log('error message==>', err.message)
      err.message === 'Network Error' && toast.error("kindly check your internet connection!")
      err.message === 'Request failed with status code 404' && toast.error('Email or Password is invalid');
      err.message === 'Request failed with status code 409' && toast.error('Password is incorrect');

    }
  };



  return (
    <>
      { loading ? (<CustomizedProgressBars/>) :
        (
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={5} className={classes.image} />
            <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ marginBottom: '3%' }}>
                  Sacco Admin Login
          </Typography>
                <form className={classes.form} onSubmit={onSubmitForm}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    // autoComplete="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                  />
                  {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Login
            </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                </Link>
                    </Grid>
                    {/* <Grid item style={{display:'none'}}>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        )}
    </>
  );
}
export default withRouter(Login);