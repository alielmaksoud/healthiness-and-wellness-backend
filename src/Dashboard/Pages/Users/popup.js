import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 60,
  },
  tablecell: {
    fontSize: '10pt'
},
  /* root: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  }, */
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width:'100%',
   /*  borderRadius:'20px', */
    boxShadow:' 0 10px 20px rgba(14, 13, 13, 0.5)',
    
  },
  image: {
    width: 200,
    height: 200,
    
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    
  },
}));

export default function ComplexGrid(props) {
  let {status, email, birth, height, weight, blood ,image, first_name, last_name, phone, created_at} = props.details
  let {activity}= props.act;
  let {gender}= props.gend;
  /* let {act}=props; */

 console.log(image,'image')
  const classes = useStyles();

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
              <Typography variant="body1" gutterBottom>
                  {'First Name: '+ first_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {'Last Name: '+ last_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {'Email: '+ email}
                </Typography><Typography variant="body1" gutterBottom>
                  {'Subscription: '+ status}
                </Typography>
              {/*   <Typography variant="body2" gutterBottom>
                  {'Activity: '+ activity}
                </Typography> */}
                <Typography variant="body1">
                    {'Birth: '+ birth}
                  </Typography>
                  <Typography variant="body1">
                    {'Phone: '+ phone}
                  </Typography>
                  <Typography variant="body1">
                    {'Height: '+ height}
                  </Typography>
                  <Typography variant="body1">
                    {'Weight: '+ weight}
                  </Typography>
                  <Typography variant="body1">
                    {'Blood: '+ blood}
                  </Typography>
                  <Typography variant="body1">
                    {'Registered on: '+ created_at}
                  </Typography>
               
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
