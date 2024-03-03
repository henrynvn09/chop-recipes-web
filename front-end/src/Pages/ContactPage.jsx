import React from 'react'

import Navbar from '../Components/Navbar';

import ProtectedRoute from '../Components/ProtectedRoute';

const ContactPage = () => {
  ProtectedRoute();
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default ContactPage;