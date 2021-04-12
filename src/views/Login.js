// import React, { Component } from 'react';
// import './login.css';
// import logo from "../images/logo.png";
// class Login extends Component {
//     render() {
//         return (
//                 <div class="container h-100">
//                     <div class="d-flex justify-content-center h-100">
//                         <div class="user_card">
//                             <div class="d-flex justify-content-center">
//                                 <div class="brand_logo_container">
//                                     <img src={logo} class="brand_logo" alt="Logo" />
//                                 </div>
//                             </div>
//                             <div class="d-flex justify-content-center form_container">
//                                 <form>
//                                     <div class="input-group mb-3">
//                                         <div class="input-group-append">
//                                             <span class="input-group-text"><i class="fas fa-user"></i></span>
//                                         </div>
//                                         <input type="text" name="" class="form-control input_user" value="" placeholder="username" />
//                                     </div>
//                                     <div class="input-group mb-2">
//                                         <div class="input-group-append">
//                                             <span class="input-group-text"><i class="fas fa-key"></i></span>
//                                         </div>
//                                         <input type="password" name="" class="form-control input_pass" value="" placeholder="password" />
//                                     </div>
//                                     <div class="form-group">
//                                         <div class="custom-control custom-checkbox">
//                                             <input type="checkbox" class="custom-control-input" id="customControlInline" />
//                                             <label class="custom-control-label" for="customControlInline">Remember me</label>
//                                         </div>
//                                     </div>
//                                     <div class="d-flex justify-content-center mt-3 login_container">
//                                         <button type="button" name="button" class="btn login_btn">Login</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         )
//     }
// }
// export default Login
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import SignInScreen from '../components/SignInScreen/SignInScreen'

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700],
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://wallpaperstock.net/wallpapers/thumbs1/53651wide.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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
    }
}));

export default function SignInSide() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <SignInScreen />
                </div>
            </Grid>
        </Grid>
    );
}
