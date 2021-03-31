import React, { useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import { IconContext } from 'react-icons';
import axios from 'axios'





const useStyles = makeStyles((theme) => ({
  paper: {
  /*   paddingTop : theme.spacing(10), */
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
    color: 'white',
    backgroundColor: ['#FF5733'],
    '&:hover': {
      backgroundColor:['#FF5733'],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'green',
    },
 
  },
}));

function Form(props) {

  const classes = useStyles();
  const [display, setdisplay] = useState("none")
  const { register , handleSubmit, errors } = useForm();
  const [message, setmessage] = useState("")


  const Auth = async (data) => {
   
     axios.post('http://localhost:8000/api/message',
    {
      name: data.name,
      title: data.title,
      email: data.email,
      content: data.content
      
    })
    .then(res => {
      setmessage("Message sent successfully! :) ");
      setdisplay({display: 'inline', color: 'green' })
      window.location.replace("/contact");
    })
  .catch((error) => {
    if(error.response){

      setmessage("N e t w o r k  E r r o r")
      setdisplay('inline');
    }
  })
}

  return (
        <IconContext.Provider value={{ color: '#B5DFBB' }}>

      <div className='main-color' >
    <Container component="main" maxWidth="xs">
  
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <EmailIcon />
        </Avatar>
      <Typography component="h2" variant="h8">
          Get In Touch
        </Typography>
        <Typography component="h4" variant="h8">
        For all enquires, please email us using this form below.
        </Typography>
        {errors.exampleRequired && <span>This field is lalaa</span>}
        {<span style={{display: display, color: 'red' }}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Auth(data))} className={classes.form}>
          
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name"
            type="name"
            name="name"
            inputRef={register}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Subject"
            type="title"
            name="title"
            autoComplete="title"
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="content"
            label="Your Message"
            type="content"
            id="content"
            autoComplete="content"
            inputRef={register}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} >
            Send Message
          </Button>
        </form>
      </div>
      <Box mt={8}>
      
      </Box>
    </Container>
    </div>
    </IconContext.Provider>
  );
  }



export default Form;