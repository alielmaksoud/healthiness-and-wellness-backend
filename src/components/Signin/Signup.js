import React, { useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import { IconContext } from 'react-icons';
/* import Logo from '../../../src/assets/icons/logo.png'; */
import { useHistory } from "react-router-dom";
import CookieService from '../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Healthiness & Wellness
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop : theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: blue['#94aabe'],
    '&:hover': {
      backgroundColor: blue['#003366'],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'green',
    },
 
  },
}));

function Signup(props) {

  const classes = useStyles();
  let history = useHistory();
  const [display, setdisplay] = useState("none")
  const { register , handleSubmit, reset, errors } = useForm();
  const cookie = CookieService.get('Bearer');
  const [Verified, setVerified ] = useState("");
  const [Loading, setLoading] = useState(true);
  const [message, setmessage] = useState("");
  const [Genders, setGenders] = useState([]);
  const [Activities, setActivities] = useState([]);
  const [Status, setStatus] = useState([]);

  useEffect(() => {
    setLoading(true)
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/activity',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
                setActivities(res.data)

        }).catch(err => {
          console.log(err.request)
        })
       setLoading(false)
  },[]);



  useEffect(() => {
    setLoading(true)
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/gender',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
                setGenders(res.data)

        }).catch(err => {
          console.log(err.request)
        })
       setLoading(false)
  },[]);

  useEffect(() => {
    setLoading(true)
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/status',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
                setStatus(res.data)

        }).catch(err => {
          console.log(err.request)
        })
       setLoading(false)
  },[]);

  useEffect(() => {
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/user/verify',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(config)
        .then(res => {
            if(res.data.message === "Verified"){
                setVerified("true");
            }else {
              setVerified("error");
            }
        }).catch(err => {
          console.log(err.request)
          setVerified("error");
        })
    
  });

  const Auth = async (data) => {
    const fd = new FormData();
    fd.append("first_name", data.first_name)
    fd.append("last_name", data.last_name)
    fd.append("phone", data.phone)
    fd.append("email", data.email)
    fd.append('image', data.file[0])
    fd.append("password", data.password)
    fd.append("gender_id", data.gender_id)
    fd.append("activity_id", data.activity_id)
    fd.append("birth", data.birth)
    fd.append("height", data.height)
    fd.append("weight", data.weight)
    fd.append("blood", data.blood)
    fd.append("status_id", data.status_id)

    let headers = {
      headers: {
        'Content-Type':'form-data',
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios.post('http://localhost:8000/api/user/register', fd, headers)
   .then(res => {
      CookieService.set('Bearer ', res.data.access_token, { path: "/", 'max-Age': res.data.expires_in})
      CookieService.set('av ', res.data.av, { path: "/", 'max-Age': res.data.expires_in})
      history.push("/profile");
      window.location.replace("/signin");
    })
    .catch((error) => {
      if(error.response){
        setmessage(Object.entries(error.response.data.errors).map((item, index) => " " + item[1] + " "))
        setdisplay('inline');
      }else {
    setmessage("N e t w o r k  E r r o r")
    setdisplay({display: 'inline', color: 'red' })
  }
  })
}


 if(Verified === "true"){
      history.push("/profile");
      return (
        <div>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
        )
  }else if(Verified.length === 0){
    return (
    <div>
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
    )
  }
  else {
  return (
        <IconContext.Provider value={{ color: '#B5DFBB' }}>

      <div className='main-color' >
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h8">
          Welcome To Healthiness & Wellness
        </Typography>
        <Typography component="h4" variant="h8">
        To Benifits from a wide range of services we need you to set up an account. We understand that the information you are trusting us with is very sensitive and we want to 
        ensure you that we will keep your information as securely as possible
        </Typography>
        {errors.exampleRequired && <span>This field is lalaa</span>}
        {<span style={{display: display, color: 'red' }}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Auth(data))} className={classes.form}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            type="first_name"
            name="first_name"
            inputRef={register}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            type="last_name"
            name="last_name"
            inputRef={register}
          />
           </Grid>
            
            <Grid item xs={12} sm={6} >
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            type="phone"
            name="phone"
            inputRef={register}
          />
          </Grid>
            
            <Grid item xs={12} sm={6} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            inputRef={register}
          />
          </Grid>
            
            <Grid item xs={12} sm={6} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />
          </Grid>
            
            <Grid item xs={12} sm={6} >
           <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="height"
            label="Height"
            type="height"
            name="height"
            inputRef={register}
          />
          </Grid>
            
            <Grid item xs={12} sm={6} >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="weight"
            label="Weight"
            type="weight"
            name="weight"
            inputRef={register}
          />
          </Grid>
            
            <Grid item xs={12} sm={6} >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="blood"
            label="Blood Type"
            type="blood"
            name="blood"
            inputRef={register}
          />
          </Grid>
            
            <Grid item xs={12} sm={6} >
             <TextField
                id="gender_id"
                select
                required
                name="gender_id"
                inputRef={register}
                SelectProps={{
                native: true,
                }}
                helperText="Please select Your Gender"
                variant="outlined"
              >
                  {Genders.map((option) => {
                    return (
                    <option key={option.id} value={option.id}>
                      {option.gender}
                    </option>
                    )}
                  )}
              </TextField>
              </Grid>
            
            <Grid item xs={12} sm={6} >
              <TextField
              id="birth"
              label="Select you Birth Date"
              name="birth"
              type="date"
              defaultValue="2008-01-14"
              className={classes.textField}
              inputRef={register}
             /* onChange={(event) => event.target.value ? setBirth(event.target.value ) : null} */
             />
             </Grid>
            
            <Grid item xs={12} sm={6} >

              <TextField
                id="activity_id"
                select
                name="activity_id"
                inputRef={register}
                SelectProps={{
                native: true,
                }}
                helperText="Please select Your Activity"
                variant="outlined"
              >
                  {Activities.map((option) => {
                    return (
                    <option key={option.id} value={option.id}>
                      {option.activity}
                    </option>
                    )}
                  )}
              </TextField>
              </Grid>
            
            <Grid item xs={12} sm={6} >
              <TextField
                id="status_id"
                select
                name="status_id"
                inputRef={register}
                SelectProps={{
                native: true,
                }}
                helperText="Please Choose Subscription"
                variant="outlined"
              >
                  {Status.map((option) => {
                    return (
                    <option key={option.id} value={option.id}>
                      {option.status}
                    </option>
                    )}
                  )}
              </TextField>
              </Grid>
            
            <Grid item xs={12} >
            <label for="image">Image</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                inputRef={register}
              />
             </Grid>
            
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} >
            Signup
          </Button>
        </form>
        <Typography component="h1" variant="h5">
          Back to <Link color="blue" href="/signin">
        Signin
      </Link> 
        </Typography>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
    </div>
    </IconContext.Provider>
  );
  }
}


export default Signup;