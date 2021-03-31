import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import {Menu, MenuItem} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import './Blog.css';
import axios from "axios";
import { setPageActionCreator } from '@material-ui/data-grid';
import CookieService from '../Service/CookieService';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 60,
  },
  tablecell: {
    fontSize: '10pt'
},
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',

  },

  image: {
    width: 200,
    height: 200,
  },

  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '50%',
    maxHeight: '50%',
  },
}));

export default function ComplexGrid(props) {
const { register , handleSubmit, reset } = useForm();
const { id, image,date,url, name, description, is_Program, is_class, is_blog, is_event} = props.details

const[CartId,setCartId]=useState([]);
const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("Item couldn't be added");
// const[ItemId,setItemId]=useState([]);
const cookie = CookieService.get('Bearer');
const ItemId=id;
const [Verified, setVerified ] = useState("");
  
  useEffect( () => {

    var config = {
      method: 'get',
     url: 'http://127.0.0.1:8000/api/user/cart',
      headers: { 
      'Authorization': `Bearer ${cookie}`, 
      'Content-Type': 'application/x-www-form-urlencoded'
    }};

        axios(config)
 /*       second way: axios.get('http://localhost:8000/api/homeitem',) */
        .then(res => {
          console.log(res.data,"adasdasdasd");
              setCartId(res.data.id)

        }).catch(err => {
          console.log(err.request)
        })
        
  },[]);

  useEffect(() => {
    var configg = {
      method: 'post',
      url: 'http://localhost:8000/api/user/verify',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(configg)
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
  console.log(CartId);

  

    const Submit = async () => {
      if(Verified === "true"){
      const data = new FormData();
      data.append("item_id", ItemId);
      data.append("cart_id", CartId);
      data.append("image",image);
      data.append('name',name);
      data.append('description',description);
      try {
        await axios.post("http://localhost:8000/api/user/cartItem", data, {
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          setmessage(name + " has been added")
          setdisplay({display: 'inline', color: 'green' })
          console.log(response.data);
         
        });
      } catch (error) {
        console.log(error);
      }
    }else{
      window.alert("you must sign in to Add to List");
      window.location.replace("/signin");
    };
    
} ; 


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
        setAnchorEl(null);
      };

  const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        Submit();

      };


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
          <img className={classes.img} alt="complex" src= {`http://localhost:8000/storage/${image}`} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Typography  style={ {fontWeight:"bold"}} variant="body1" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
                
               
              </Grid>
              <div>
              {<span style={display}>{message}</span>}
        </div>
         <Button className="buttonn"  style={{ alignSelf:"center", width:"50%", color:"white", backgroundColor:"#f9735b" }} edge="start" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
             Add To List
        </Button>

            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
