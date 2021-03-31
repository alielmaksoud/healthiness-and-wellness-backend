import React, { useEffect, useState } from 'react';
import './Program.css';
import ProgramItem from './ProgramItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Title from "../ProgramTitle/Title";


function Program() {
  const [Items, setItems] = useState([])
  const [Programs, setPrograms] = useState([])
  

  const ProgramItems = [];


  useEffect( () => {
    
    axios.get('http://localhost:8000/api/item',{

})
    .then(res => {
            setItems(res.data.data);
            res.data.data.map((item) =>{
             if (item.is_program){
              ProgramItems.push(item)
             }
              
              });
                
              setPrograms(ProgramItems)

    }).catch(err => {
      console.log(err.request)
    })
},[]);

console.log(Programs,'programssss')


  return (
    <div className='cards__Features'>
      <h1><Title /></h1>
      <div className='cards__Features__container'>
        <ul className='cards__Features__items'>
          {Programs.map((data, key) => <ProgramItem key={key} data={data}/>)}
        </ul>
      </div>
      
    </div>
  );
}

export default Program;