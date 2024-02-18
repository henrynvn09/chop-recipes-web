import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <>
      <h1>ERROR 404. PAGE NOT FOUND.</h1>
      <p>
        The page you are looking for does not exist. Please return{' '}
        <Link to="/">home</Link>.
      </p>
    </>
  );
};

export default Error404;