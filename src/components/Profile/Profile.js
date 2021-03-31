import React from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { FcMenu } from "react-icons/fc";
import CookieService from '../Service/CookieService';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './Profile.css';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Account from '../Account/Account';
/* import Exercise from '../Exercise/Exercise'; */



export default function Profile() {


    return (
        <div>
          
            
           <div class="flex-container">
              <div class="flex-item-first">
                <Account />
              <br></br>
              </div>
              <div class="flex-item-second">
                <Cart />
              </div>
             <div class="flex-item-third">
               {/* <Exercise /> */}
               <Link to="/">
             <Button className="button-profile"  style={{ alignSelf:"center", width:"30%", color:"white", backgroundColor:"#f9735b" }} edge="start" aria-label="menu" aria-haspopup="true" /* onClick={() => () } */>
             Back
             </Button>
             </Link>
             </div>
             
            </div>
             
        </div>
    )
}


