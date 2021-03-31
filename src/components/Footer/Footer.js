import React from 'react';
import './Footer.css';
import SocialMedia from '../SocialMedia/SocialMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Overlay from "../Main/Overlay";
import ScrollUpButton from "react-scroll-up-button";
import FakeForm from '../FakeForm/FakeForm';
import Logo from '../Image/logo.png';


function Copyright() {
  return (
    
    <Typography variant="h7" color="white" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Healthiness & Wellness
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const Footer = () => (
<footer className="footer">
   <ScrollUpButton />
  <div className="footer__addr">
    <div ><img className="footer__logo" src={Logo} alt="Logo" /></div>
    <address>
    <SocialMedia />
      {/* <a className="footer__btn" href="mailto:ali.elmaksoud@gmail.com">Email US</a> */}
      </address>
  </div>
  <ul className="footer__nav">
  <li className="nav__item">
      <h2 className="nav__title">SECTIONS</h2>
      <ul className="nav__ul">
      <li>
          <a href="/blog">Blogs</a>
        </li>
        <li>
          <a href="/event">Events</a>
        </li>
        <li>
          <a href="/program">Programs</a>
        </li>
      </ul>
    </li>
  <li className="nav__item">
      <h2 className="nav__title">SERVICES</h2>
      <ul className="nav__ul">
      <li>
          <a href="#">YOGA</a>
        </li>
        <li>
          <a href="">GYM</a>
        </li>
        <li>
          <a href="">DIETICIAN</a>
        </li>
      </ul>
    </li>
    <li className="nav__item">
      <h2 className="nav__title">LEGAL</h2>
      <ul className="nav__ul">
      <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms of Use</a>
        </li>
        <li>
          <a href="/">Sitemap</a>
        </li>
      </ul>
    </li>
    <li className="nav__item nav__item--extra">
      <h2 className="nav__title">ABOUT</h2>
      <ul className="nav__ul">
        <li>
        <a href="/about">Who we are</a>
        </li>
        <li>
        <a href="#">Team</a>
        </li>
        <li>
        <a href="#">Careers</a>
        </li>

      </ul>
    </li>
    <li className="nav__item">
      <h2 className="nav__title">FEEDBACK</h2>
      <ul className="nav__ul">
        <li>
          <FakeForm />
        </li>
      </ul>
    </li>
  </ul>
  <div className="lineee"></div>

  <div className="legal">
  <p className="advertising"> { <Copyright />}</p>
  </div>
</footer>


  

);

export default Footer;


