import React from 'react';
import './Layout.css';
import Footer from '../components/Footer/Footer';
import NavbarHome from '../components/Header/NavbarHome/NavbarHome.js'

function Layout(props) {
     
  return (
  <>
    <NavbarHome />

    <main className="main-content">
      {props.children}
    </main>
    <Footer />
  </>
   );
  }


export default Layout;