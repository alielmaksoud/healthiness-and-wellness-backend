import React from 'react';
import './SocialMedia.css';

import fb from '../../assets/social_media/fb.png';
import instagram from '../../assets/social_media/instagram.png';


const SocialMedia = () => (
  <div className="social-media">
    <div className="icons-wrapper">
      {<a href="" target="_blank" rel="noopener noreferrer"><img src={fb} alt="facebook" /></a>}
      {<a href="" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="instagram" /></a>}
      
    </div>
  </div>
);

export default SocialMedia;