import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our website.</p>
      <Link to="/Clientes">
        <button>Table view</button>
      </Link>
      
    </div>
  );
};

export default Home;