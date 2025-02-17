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
  root: {
    flexGrow: 1,
  },
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
  let { created_at, date, url, image, name, description, is_event, is_program, is_class, is_blog} = props.details
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
                  {'Title: '+ name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {'Description: '+ description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {'Created on: '+ created_at}
                </Typography>
                {/* <Typography variant="body1" gutterBottom>
                  {'Date: '+ date}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {'LINK: '+ url}
                </Typography> */}
                <Grid container direction="row">
                  <Typography variant="body2">
                    {is_event ? 'event:✔' : ''}
                  </Typography>
                  <Typography variant="body2">
                    {is_program ? 'program:✔' : ''}
                  </Typography>
                  <Typography variant="body2">
                    {is_class ? 'class:✔' : ''}
                  </Typography>
                  <Typography variant="body2">
                    {is_blog ? 'blog:✔' : ''}
                  </Typography>
                </Grid>
               
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
