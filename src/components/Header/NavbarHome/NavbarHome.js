import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { FcMenu } from "react-icons/fc";
import axios from 'axios';
import Logo from '../../Image/logo.png';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';
import '../Header.css';
import CookieService from '../../Service/CookieService';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavbarHome() {

  const cookie = CookieService.get('Bearer');
  const [Verified, setVerified ] = useState("");
  const [message, setmessage] = useState("")
  
//////// verify

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

  /////logout 

  const av = CookieService.get('av');
  function logout(){
    const cookie = CookieService.get('Bearer');
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/user/logout',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(config)
        .then(res => {
           CookieService.remove('Bearer');
           CookieService.remove('av');
           window.location.replace("/")
        }).catch(err => {
           console.log(err)
           CookieService.remove('Bearer');
           CookieService.remove('av');
           window.location.replace("/")

        })

  }


 /////// hamburger menu

 const [click, setClick] = useState(false);
    const setButton = useState(true)[1];

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }, [setButton])


  //////// nav tim
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  
  const profile = () =>{
    window.location.replace("/signin");
 };

  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
  
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    > <div className="link-nav">
      <MenuItem onClick={profile}>My Account</MenuItem>
      <MenuItem onClick={()=> logout()}>Logout </MenuItem>
      </div>
    </Menu>
  );

    

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );



  return (
    <div className={classes.grow}>
      <AppBar position="static">
      <div className='navbar'>
        <Toolbar>
        <div className={classes.sectionDesktop}>
          
        <Link to="/" >
        <img className='logo' src={Logo} alt="Logo" /> 
        </Link>
          </div>
 

        <div className={classes.sectionMobile}>
        <nav className='navbar-mobile'>
                <div className="menu-icon-mobile" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu-mobile active' : 'nav-menu-mobile'}>
                <li className='nav-item-mobile'>
                        <Link to="/" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            HEALTHINESS & WELLNESS
                   </Link>
                    </li>
                <li className='nav-item-mobile'>
                        <Link to="/about" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            ABOUT US
                   </Link>
                    </li>
                    
                    <li className='nav-item-mobile'>
                        <Link to="/blog" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            BLOGS
                   </Link>
                    </li>
                    <li className='nav-item-mobile'>
                      <Link to="/program" className='nav-links-mobiles' onClick={closeMobileMenu}>
                          PROGRAMS  
                     </Link>
                    </li>
                    <li className='nav-item-mobile'>
                        <Link to="/event" className='nav-links-mobiles' onClick={closeMobileMenu}>
                           EVENTS
                   </Link>
                    </li>
                    <li className='nav-item-mobile'>
                        <Link to="/contact" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            CONTACT US
                   </Link>
                    </li>

                </ul>

            </nav>
           
        </div> 

        {/* <div className={classes.sectionMobile}>
          <div className="logo-mobile">
          <Link to="/" >
          <img className='logo' src={Logo} alt="Logo" />
          </Link>
          </div>
        </div> */}
        <div className={classes.sectionDesktop}>
        <div className="navbarrr">
            <ul>
            <li>
            <Link to="/about">ABOUT US</Link>
            </li>
            <li>
            <Link to="/blog">BLOGS</Link>
            </li>
            <li>
            <Link to="/program">PROGRAMS</Link>
            </li>
            <li>
            <Link to="/event">EVENTS</Link>
            </li>
            <li>
            <Link to="/contact">CONTACT US</Link>
            </li>
            </ul>
        </div> 
        </div>  
          

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <div className="account-logo">
          {/* <Link to='/signin'> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {/* </Link> */}
            </div>
          </div>
         <div className={classes.sectionMobile}>
           
           {/* <Link to='/signin'> */}
         <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {/* </Link> */}
            
          </div>
        </Toolbar>
        </div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

