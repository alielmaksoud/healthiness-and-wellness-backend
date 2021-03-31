import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Button } from '@material-ui/core';
import Card from './Popup'

function CardItemOffers(props) {
  let { id, image, name, description,category_name,date, url} = props.data

  let {data}= props


  return (
    <>
      <li className='cards__Offers__item'>
        <div className='cards__Offers__item__link'>
          <img
            className='cards__Offers__item__img'
            alt=''
            src= {  `http://localhost:8000/storage/${image} `}
            
          />
           <div className="cards__Offers__item__labels">
            <span className="cards__Offers__item__label">{category_name}</span>

          </div>
          <div className="cards__Offers__item__title">
            <p>{name}</p>
          </div>
          <div className='cards__Offers__item__info'>
            <p className='cards__Offers__item__text'>{description.slice(0,70)}</p>
            <span>...</span>
            <p className='cards__Offers__item__text'><span style={{ fontWeight: "bold" }} >Date: </span><span>{date}</span></p>
            
          </div>
          <Popup  trigger={<Button style={{ textDecoration:"none", textAlign:"center", fontSize: "small", backgroundColor:"#FF5733", width:"100%",color:"white"}} variant="contained" size="Large" alt="Remy Sharp">Show Details</Button>} modal nested position="right center">
            <Card details={data} />
            </Popup>

        </div>
        
      </li>
      

    </>

  );
}

export default CardItemOffers;