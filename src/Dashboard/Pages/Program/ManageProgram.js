import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditProgram from './EditProgram';
import axios from 'axios';
import Card from './popup'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';

function ManageProgram() {
  const { register , handleSubmit } = useForm();
  const [Items, setItems] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [ItemData, setItemData] = useState({})
  const [display] = useState({display: 'None', color: 'red' });
  const [message] = useState("none");
  const [Blogs, setBlogs] = useState([]);
  const BlogItems = [];
  
    const useStyles = makeStyles((theme) => ({
      formm: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      rate:{
        display: 'flex',
        justifyContent: 'center',
      },
      input:{
        display: 'flex',
        justifyContent: 'center',
        marginBottom:'1%',
        marginTop:'1%'
      },
      submit: {
        marginLeft:'1%',
        width: "10%",
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: blue['#94aabe'],
        '&:hover': {
          backgroundColor: blue['#003366'],
        },
      },
        ItemsTable: {
          color: 'green',
          position: 'absolute',
          zIndex: '0',
          width: '70%',
          height: '70vh',
          marginTop: '1%',
          marginLeft: '15%',
         
        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: 'green',
        },
        manageItems : {
          /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
          height : '86vh',
        }
      }));

    const classes = useStyles();
    const cookie = CookieService.get('Bearer');

    

   const HandleEdit = () => {
      setEditing(!Editing)
    }
   
 
    useEffect( () => {
      setLoading(true)
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/item',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config)
          .then(res => {
                  console.log(res.data.data[0],'adadadadadad')
                  /* setItems(res.data.data[0]);
                    setLoading(false) */
                   /*  setItems(res.data.data.map((item, index)=>  
                    {return {
                        ...item,
                        delete: {id: item.id},
                        edit: {id: item.id, index: index },
                        
                    }})); */
                    setItems(res.data.data);
                    res.data.data.map((item) =>{
                     if (item.is_program){
                      BlogItems.push(item)
                     }
                      
                      });
                        
                      setBlogs(BlogItems)
    
                    setLoading(false)
          }).catch(err => {
            console.log(err)
          })
    },[]);

    console.log(Items)

    const DeleteItem = async (id) => {
      var config = {
      method: 'Delete',
      url: `http://localhost:8000/api/admin/item/${id}`,
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
          console.log(res)
          setItems(Items.filter(item => item.id !== id))  
          window.location.replace("/admin/ManageClass");  
        }).catch(err => {
          console.log(err)
        })
        setLoading(false)
  }
    const columns = [
        {
            field: 'image',
            headerName: 'Picture',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <img style={{width: '1', height: '1'}} alt="Remy Sharp" src= {`http://localhost:8000/storage/${params.row.image}`}/>
            ),
        },
      {
        field: 'Name',
        headerName: 'Name',
        width: 140,
        valueGetter: (params) =>
          `${params.getValue('name') || ''}`,
      },
      {
        field: 'Description',
        headerName: 'Description',
        width: 250,
        valueGetter: (params) =>
          `${params.getValue('description') || ''}`,
      },
      {
        field: 'Category',
        headerName: 'Category',
        width: 120,
        valueGetter: (params) =>
          `${params.getValue('category_name') || ''}`,
      },
      
      
      {
        field: 'view',
        headerName: 'view',
        width: 110,
        renderCell: (params) => (
        
            <Popup trigger={<Button variant="contained" size="small" alt="Remy Sharp">View</Button>} modal nested position="right center">
            <Card details={params.row}/>
          </Popup>
        ),
      },
      {
        field: 'edit',
        headerName: 'Edit',
        renderCell: (params) => (
        
            <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
               () =>  {
                 let dataofitem = Items[params.rowIndex]
                setItemData(dataofitem);
                setEditing(true);
               }}>
                Edit
            </Button>
        ),
      },
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: (params) => (
            <Button onClick={()=> DeleteItem(params.row.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Delete
            </Button>
        ),
      },
      
    ];
    console.log(HandleEdit)
    if(Loading){
      return (
        <div>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
    }
    if(Editing){
      return (
        <div>
            <EditProgram ItemData={ItemData} Edit={HandleEdit} />
        </div>
      )
    }else {
  return (
      <>
       
    <div className={classes.manageItems} >
    <div className={classes.ItemsTable} >
    {<span style={display}>{message}</span>}
      <DataGrid rows={Blogs} columns={columns} pageSize={8}/>
    </div>
    </div>
    </>
  );
 }
}


export default ManageProgram;