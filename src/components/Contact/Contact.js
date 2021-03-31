import React from 'react';
import Form from './Form';
import Logo from '../Image/logo.png';
import './Contact.css';


const Contact = () => (
  <>
  <div class="flex-container-contact">
        <div class="flex-item-first-contact">
        <Form />
        </div>
        <div class="flex-item-second-contact">
        <img src={Logo} alt="Logo" />
        </div>
    </div>
     
  
  </>
);

export default Contact;