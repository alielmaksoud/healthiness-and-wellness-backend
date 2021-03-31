import React, { useEffect, useState } from 'react';
import './Event.css';
import EventItem from './EventItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Title from "../EventTitle/Title";


function Event() {
  const [Items, setItems] = useState([])
  const [Events, setEvents] = useState([])
  

  const EventItems = [];


  useEffect( () => {

        axios.get('http://localhost:8000/api/item',{
  })
        .then(res => {
                setItems(res.data.data);
                res.data.data.map((item) =>{
                 if (item.is_event){
                  EventItems.push(item)
                 }
                  
                  });

                  setEvents(EventItems)


        }).catch(err => {
          console.log(err.request)
        })
  },[]);

  console.log(Events,'eventtttt')


  return (
    <div className='cards__Offers'>
      <h1><Title /></h1>
      <div className='cards__Offers__container'>
        <ul className='cards__Offers__items'>
          {Events.map((data, key) => <EventItem key={key} data={data} />)}
        </ul>
      </div>
      
    </div>
  );
}

export default Event;