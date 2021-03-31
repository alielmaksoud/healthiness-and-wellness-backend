import "./Home.css";
import Main from "../Main/Main";
import Member from "../Member/Member";
import Classes from "../OurClasses/Classes";
import Schedule from "../Schedule/Schedule";
import Trainers from "../Trainers/Trainers";
import Blog from "../Blog/Blog";
import Event from "../Event/Event";
import Program from "../Program/Program";
/* import Contact from './components/Contact/Contact'; */
import React from 'react'

function Home() {
  return (
    <div className="App">
    <Main />
    <Event />
    <Member />
    <Blog />
    <Classes />
    <Program />
    <Schedule />
    <Trainers />
  </div>
  )
}

export default Home;
