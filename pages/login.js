import React, { useState } from 'react';
import { Typography, FormControl, InputLabel, makeStyles, Grid, Select, MenuItem } from '@material-ui/core';
import {  useFormik } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorIcon from '@material-ui/icons/Error';
import Link from 'next/link'
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as Yup from 'yup';
import { useUser } from '../lib/hooks'
import {Link as MUILink} from '@material-ui/core';
import useRequest from '../hooks/use-request';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  errorsBox: {
    backgroundColor: '#0e2542',
    color: theme.palette.error.main,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  typo: {
    padding: theme.spacing(1),
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.primary.main,
      // theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formHelperText: {
    color: 'red'
  }
}));


const Login = ({}) => {

  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);

  const { doRequest, errors } = useRequest();

  // useUser({ redirectTo: '/', redirectIfFound: true });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string(),
      username: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async values => {
      const res = await doRequest({
        url: isLogin ? `/api/login` : `/api/signup`,
        method: `POST`,
        body: values
      });
      console.log("res", res, isLogin);
      isLogin ? Router.push('/') : setIsLogin(true);
    //   try {
    //     const res = await fetch(isLogin ? `/api/login` : `/api/signup`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(values),
    //     })
    //     if (res.status === 200) {
    //       isLogin ? Router.push('/') : setIsLogin(true);
    //     } else {
    //       throw new Error(await res.text())
    //     }
    //   } catch (error) {
    //     console.error('An unexpected error happened occurred:', error)
    //   }
    },
  });
  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? `Login` : `Sign up`}
          </Typography>
          <form onSubmit={formik.handleSubmit} className={classes.form} noValidate autoComplete="off">
            { !isLogin &&
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="fullName"
                  required
                  label="First Name"
                  type="text"
                  InputProps={{
                    "aria-label": "first name"
                  }}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={ formik.touched.fullName && formik.errors.fullName ? 
                    formik.errors.fullName : null}
                  error={formik.touched.fullName && formik.errors.fullName ? true: false}
                />
              </Grid>
            }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="username"
                required
                label="Email"
                type="email"
                InputProps={{
                  "aria-label": "email"
                }}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={ formik.touched.username && formik.errors.username ? 
                  formik.errors.username : null}
                error={formik.touched.username && formik.errors.username ? true: false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                required
                type="password"
                label="Password"
                InputProps={{
                  "aria-label": "password"
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={ formik.touched.password && formik.errors.password ? 
                  formik.errors.password : null}
                error={formik.touched.password && formik.errors.password ? true: false}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={false}
            >
              {isLogin ? `Login` : `Sign up`}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                { isLogin &&
                  <MUILink
                    component="button"
                    variant="body2"
                    onClick={() => setIsLogin(false)}
                  >
                    Don't have an account? Sign Up
                  </MUILink>
                }
                { !isLogin &&
                  <MUILink
                    component="button"
                    variant="body2"
                    onClick={() => setIsLogin(true)}
                  >
                    Already have an account? Login
                  </MUILink>
                }
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Login;