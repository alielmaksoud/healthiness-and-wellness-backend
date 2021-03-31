import React from 'react';
import Logo from '../../components/Image/logo.png';
import './HomeDash.css';
import Title from '../DashTitle/Title';

function HomeDash() {
    return (
        <div className='logooo'>
            <Title />
           <img src={Logo} alt="Logo" />
        </div>
    )
}

export default HomeDash
