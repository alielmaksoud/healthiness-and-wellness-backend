import React, { useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import CookieService from '../Service/CookieService';
import { useHistory } from "react-router-dom";
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" style={{cursor: "alias", textDecoration: "none"}}>
        Kataleya
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyless = makeStyles((themee) => ({
  paperr: {
    paddingTop : themee.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  formm: {
    width: '100%', // Fix IE 11 issue.
    marginTop: themee.spacing(1),
  },
  submit: {
    margin: themee.spacing(1, 0, 0),
    marginLeft: "35%",
    marginRight: "35%",
    width: "25%",
    color: themee.palette.getContrastText(green[500]),
    backgroundColor:['#ed563b'],
    '&:hover': {
      backgroundColor:['#ed563b'],
    },
    backdrop: {
      zIndex: themee.zIndex.drawer + 1,
      color: 'green',
    },
    editclass : {
      backgroundColor: 'rgba(116, 255, 116, 0.145)'
    }
  },
  
}));

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



function EditAccount(props) {
  const classes = useStyles();
  const { register} = useForm();
  const cookie = CookieService.get('Bearer');
  let history = useHistory();
  const NewUserclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [UserData, setUserData] = useState(props.UserData);
  const [Loading, setLoading] = useState(true);
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

  const HandleChange = (e) => {
     let target = e.target.value
      setUserData({...UserData, [e.target.name]: target})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

     let id = UserData['id']
     const fdd = new FormData();
     

    fdd.append("first_name", UserData['first_name'])
    fdd.append("last_name", UserData['last_name'])
    fdd.append("email", UserData['email'])
    fdd.append("phone", UserData['phone'])
    fdd.append("password", UserData['password'])
    fdd.append("blood", UserData['blood'])
    fdd.append("height", UserData['height'])
    fdd.append("weight", UserData['weight'])
    fdd.append("activity_id", UserData['activity_id'])
    fdd.append("gender_id", UserData['gender_id'])
    fdd.append("status_id", UserData['status_id'])
    fdd.append("image", UserData['image'])
    fdd.append("birth", UserData['birth'])
    let headers = {
     'method' : 'POST',
      data : fdd,
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios(`http://localhost:8000/api/user/${id}?_method=PUT`, headers)
   .then(res => {

    setmessage("Account info has been Updated")
    setdisplay({display: 'inline', color: 'green' })
    props.Edit()
    window.location.replace("/profile")
   })
  .catch((error) => {
   if(error.response){
     console.log(error);
    setmessage(Object.entries(error.response.data.errors).map((item, index) => " " + item[1] + " "))
    setdisplay({display: 'inline', color: 'red' })
   }else {
    setmessage("N e t w o r k  E r r o r")
    setdisplay({display: 'inline', color: 'red' })
  }
  })

}  
  return (
    <div className={NewUserclass.editclass} >
    <Container component="main" maxWidth="md">
      <div className={NewUserclass.paperr}>
        <Typography component="h1" variant="h5">
          Update Your Account
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={(e)=> handleSubmit(e)} className={NewUserclass.formm} >
            
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.first_name}
                onChange={(e) => HandleChange(e)}
                autoComplete="first_name"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                inputRef={register}
                autoFocus

              />
            </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.last_name}
                onChange={(e) => HandleChange(e)}
                autoComplete="last_name"
                name="last_name"
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                inputRef={register}
                autoFocus

              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.email}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.phone}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.blood}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                fullWidth
                id="blood"
                label="Blood Type"
                name="blood"
                autoComplete="blood"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.height}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                required
                fullWidth
                id="height"
                label="Your Height"
                name="height"
                autoComplete="height"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.weight}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                fullWidth
                id="weight"
                label="Your Weight"
                name="weight"
                autoComplete="weight"
                inputRef={register}
              />
            </Grid>

            
            
            <Grid item xs={12} sm={6}>
            <TextField
              defaultValue={UserData.birth}
              onChange={(e) => HandleChange(e)}
              id="birth"
              fullWidth
              label="Select you Birth Date"
              name="birth"
              type="date"
              className={classes.textField}
              inputRef={register}
            
             />
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <TextField
                defaultValue={UserData.gender_id}
                onChange={(e) => HandleChange(e)}
                id="gender_id"
                select
                required
                fullWidth
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
              <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.activity_id}
                onChange={(e) => HandleChange(e)}
                id="activity_id"
                select
                fullWidth
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
              <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={UserData.status_id}
                onChange={(e) => HandleChange(e)}
                id="status_id"
                select
                fullWidth
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
              <Grid item xs={12}>
              <TextField
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                fullWidth
                name="image"
                type="file"
                id="image"
                helperText="Please Upload a Profile Picture"
                variant="outlined"
                inputRef={register}
              />
             </Grid>
              
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={NewUserclass.submit}
          >
            Save
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={()=> {
                props.Edit()
                history.push("/profile");
            }}
            className={NewUserclass.submit}
          >
            Back
          </Button>
        </form>
      </div>
      <Box mt={1.3}>
       {/*  <Copyright /> */}
      </Box>
    </Container>
    </div>
  );
}

export default EditAccount;