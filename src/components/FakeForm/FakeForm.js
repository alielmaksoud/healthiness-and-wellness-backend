import React from 'react';
import './FakeForm.css';

const fakeForm = () => (
  <form className="questions-form">
    <input type="text" placeholder="Name" />
    <input type="text" placeholder="Email" />
    <textarea placeholder="Message"></textarea>
    <button className="button-footer">Send Message</button>
  </form>
);

export default fakeForm;