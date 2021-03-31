import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CookieService from '../../Service/CookieService';
import { useHistory } from "react-router-dom";
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paperr: {
    paddingTop : theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height : '86vh',
  },

  formm: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
    marginLeft: "35%",
    marginRight: "35%",
    width: "30%",
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: blue['#94aabe'],
    '&:hover': {
      backgroundColor: blue['#003366'],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },
}));



function EditEvent(props) {
  const { register , handleSubmit } = useForm();
  const cookie = CookieService.get('Bearer');
  const classes = useStyles();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("Item couldn't be added");
  const [Loading, setLoading] = useState(true)
  const [Categories, setCategories] = useState([]);
  const [Index, setIndex] = useState(1);
  let history = useHistory();
  const {ItemData} = props;
  const [inputList, setInputList] = useState(ItemData.item_attributes);
  const [IsEvent, setIsEvent] = useState(ItemData.is_event ? 1 : 0);
  const [IsClass, setIsClass] = useState(ItemData.is_class ? 1 : 0);
  const [IsProgram, setIsProgram] = useState(ItemData.is_program ? 1 : 0);
  const [IsBlog, setIsBlog] = useState(ItemData.is_blog ? 1 : 0);

  useEffect(() => {
    setLoading(true)
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/category',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
                setCategories(res.data)

        }).catch(err => {
          console.log(err.request)
        })
       setLoading(false)
  },[]);

  

 
  const Create = async (data) => {
    console.log(data,"data")
    const fd = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if(`${key}` === 'file'){
        fd.append('image', data.file[0])
      }
      else if(`${key}` === 'is_class' ){
        data.is_class ? fd.append('is_class', 1) :  fd.append('is_class', 0)
      }
      else if (`${key}` === 'is_event'){
        data.is_event ? fd.append('is_event', 1) :  fd.append('is_event', 0)
      }
      else if (`${key}` === 'is_program'){
        data.is_program ? fd.append('is_program', 1) :  fd.append('is_program', 0)
      }
      else if (`${key}` === 'is_blog'){
        data.is_blog ? fd.append('is_blog', 1) :  fd.append('is_blog', 0)
      }
        else fd.append(`${key}`, `${value}`)
    }
    for (var dataaa of fd) {
      console.log(dataaa);
    }
    let headers = {
      headers: {
        'Content-Type':'form-data',
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios.post(`http://localhost:8000/api/admin/item/${ItemData.id}?_method=PUT`, fd, headers)
   .then(res => {
    setmessage(data.name + " has been updated")
    setdisplay({display: 'inline', color: 'green' })
    window.location.replace("/admin/ManageItems")

   })
  .catch((error) => {
    console.log(error)
   if(error.response){
     
    setmessage(Object.entries(error.response.data.errors).map((item, index) => " " + item[1] + " "))
    setdisplay({display: 'inline', color: 'red' })
   }else {
    setmessage("N e t w o r k  E r r o r")
    setdisplay({display: 'inline', color: 'red' })
  }
  })
}
const handleChangeClass = (event) => {
  IsClass === 1 ? setIsClass(0) : setIsClass(1)
};
const handleChangeEvent = (event) => {
  IsEvent === 1 ? setIsEvent(0) : setIsEvent(1)
};
const handleChangeProgram = (event) => {
  IsProgram === 1 ? setIsProgram(0) : setIsProgram(1)
};
const handleChangeBlog = (event) => {
  IsBlog === 1 ? setIsBlog(0) : setIsBlog(1)
};

 if(Loading) {
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
    <div  style={{backgroundColor: 'white'}} className={classes.editclass} >
    <Container component="main" maxWidth="md">
      <div className={classes.paperr}>
        <Typography component="h1" variant="h6">
          Update
        </Typography>
        {<span style={display}>{message}</span>}
        

        <form
         onSubmit={handleSubmit((data) => Create(data))}
          className={classes.formm} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={ItemData.name}
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                inputRef={register}
                autoFocus
              />
            </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                id="category_id"
                select
                required
                fullWidth
                defaultValue={ItemData.category_id}
                name="category_id"
                inputRef={register}
                SelectProps={{
                native: true,
                }}
                helperText="Please select Category"
                variant="outlined"
              >
                  {Categories.map((option) => {
                    return (
                    <option key={option.id} value={option.id}>
                      {option.category_name}
                    </option>
                    )}
                  )}
              </TextField>
              </Grid>
             <Grid item xs={12} sm={6}>
               <TextField
                rowsMin={1} 
                rows={2}
                autoComplete="description"
                name='description'
                defaultValue={ItemData.description}
                variant="outlined"
                required
                fullWidth
                id='description'                
                label="Description"
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                rowsMin={1} 
                rows={2}
                autoComplete="url"
                name='url'
                defaultValue={ItemData.url}
                variant="outlined"
                required
                fullWidth
                id='url'                
                label="LINK"
                inputRef={register}
                autoFocus
              />
            </Grid>
           <Grid item xs={12} sm={6}> 
            <TextField
            fullWidth
            autoComplete="date"
              id="date"
              label="Enter due Date"
              name="date"
              type="date"
              defaultValue={ItemData.date}
              className={classes.textField}
              inputRef={register}
             /* onChange={(event) => event.target.value ? setBirth(event.target.value ) : null} */
             />
            </Grid>
            <Grid item xs={12} sm={6}>
            {/* <Grid item xs={12} sm={6} style={{marginBottom:'2%'}}> */}
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
            <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                id = 'is_class'
                  checked= {IsClass}
                  onChange={handleChangeClass}
                  name='is_class'
                  color="primary"
                  inputRef={register}
                />
              }
              label="CLass"
            />
            </Grid>
           <Grid item xs={12} sm={6}> 
            <FormControlLabel
              control={
                <Checkbox
                id = 'is_event'
                  checked= {IsEvent}
                  onChange={handleChangeEvent}
                  name='is_event'
                  color="primary"
                  inputRef={register}
                />
              }
              label="Event"
            />
            </Grid>
           <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                id = 'is_program'
                  checked= {IsProgram}
                  onChange={handleChangeProgram}
                  name='is_program'
                  color="primary"
                  inputRef={register}
                />
              }
              label="Program"
            />
           </Grid>
           <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                id = 'is_blog'
                  checked= {IsBlog}
                  onChange={handleChangeBlog}
                  name='is_blog'
                  color="primary"
                  inputRef={register}
                />
              }
              label="Blog"
            />
            </Grid>
         
           

          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Update Item
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={()=> {
                history.push("/admin/ManageEvent");
            }}
            className={classes.submit}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );
 }
}

export default EditEvent;