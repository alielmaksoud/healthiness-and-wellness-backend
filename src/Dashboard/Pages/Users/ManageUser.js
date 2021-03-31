import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditUser from './EditUser';
import axios from 'axios';
import Card from './popup'
import Popup from 'reactjs-popup';



function ManageUser() {
  const [Users, setUsers] = useState([]);
  const [Status, setStatus] = useState([]);
  const [Activity, setActivity] = useState([]);
  const [Gender, setGender] = useState([]);
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [UserData, setUserData] = useState({})
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
    const useStyles = makeStyles((theme) => ({
        usersTable: {
          color: 'green',
          position: 'absolute',
          zIndex: '0',
          width: '70%',
          height: '80vh',
          marginTop: '1%',
          marginLeft: '15%',
         
        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: 'green',
        },
        manageusers : {
          /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
          height : '86vh',
        }
      }));
    const usersTable = useStyles();
    const cookie = CookieService.get('Bearer');

    

   const HandleEdit = () => {
      setEditing(!Editing)
    }
 
    useEffect( () => {
      setLoading(true)
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/admin/user/show',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config)
          .then(res => {
            console.log(res.data[2][0].gender, 'lalalalalalaalaaalalall')
                  /* setUsers(res.data[0].map((item, index)=>  
                    {return {
                        ...item,
                        delete: {id: item.id},
                        edit: {id: item.id, index: index },
                        image   : linkkk + item.picture,
                    }})); */
                    setUsers(res.data[0]);
                  setActivity(res.data[1][0].activity)
                  setGender(res.data[2][0].gender)
                    setLoading(false)
          }).catch(err => {
            console.log(err.request)
          })
    },[]);
    
    const DeleteUser = async (id) => {
        setLoading(true);
 
        var config = {
        method: 'Delete',
        url: `http://localhost:8000/api/admin/user/${id}`,
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
  
          axios(config)
          .then(res => {
            setmessage("User has been Deleted")
            setdisplay({display: 'inline', color: 'green' })
            /* props.Edit() */
            window.location.replace("/admin/ManageUser")
            setUsers(res.data.map(item =>  
              {return {
                  ...item,
                  delete: item.id,
                  edit: item.id,
                  /* image   : linkkk + item.picture */
              }}));
                  
          }).catch(err => {
            console.log(err.request)
          })

          /* axios(config2)
          .then(res => {
    
          }).catch(err => {
            console.log(err.request)
          }) */
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
      { field: 'id', headerName: 'ID', width:65},
      {
        field: 'First Name',
        headerName: 'First Name',
        width: 100,
        valueGetter: (params) =>
          `${params.getValue('first_name') || ''}`,
      },
      {
        field: 'Last Name',
        headerName: 'Last Name',
        width: 100,
        valueGetter: (params) =>
          `${params.getValue('last_name') || ''}`,
      },
      {
        field: 'Status',
        headerName: 'Status',
        width: 150,
        valueGetter: (params) =>
          `${params.getValue('status') || ''}`,
      },
      { field: 'email', headerName: 'Email' , width: 250 },
     
      {
        field: 'view',
        headerName: 'view',
        width: 110,
        renderCell: (params) => (
        
            <Popup trigger={<Button variant="contained" size="small" alt="Remy Sharp">View</Button>} modal nested position="right center">
            <Card details={params.row} act={Activity} gend={Gender}/>
          </Popup>
        ),
      },
      
     /*  {
        field: 'edit',
        headerName: 'Edit',
        renderCell: (params) => (
        
            <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
               () =>  {
                setUserData(Users[params.value.index]);
                setEditing(true);
               }}>
                Edit
            </Button>
        ),
      }, */
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: (params) => (
            <Button onClick={()=> DeleteUser(params.row.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Delete
            </Button>
        ),
      },
      
    ];
    console.log(HandleEdit)
    if(Loading){
      return (
        <div>
            <Backdrop className={usersTable.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
    }
    if(Editing){
      return (
        <div>
            <EditUser UserData={UserData} Edit={HandleEdit} />
        </div>
      )
    }else {
  return (
    <div className={usersTable.manageusers} >
    <div className={usersTable.usersTable} >
    {<span style={display}>{message}</span>}
      <DataGrid rows={Users} columns={columns} pageSize={8}/>
    </div>
    </div>
  );
    }
}


export default ManageUser;