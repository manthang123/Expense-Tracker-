// Card.js
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, image, link }) => {
  return (
    <Link to={link} className="bg-gray-900 bg-opacity-75 p-6 rounded-lg shadow-lg text-center w-72 hover:bg-opacity-90 transition-all">
      <img src={image} alt={title} className="mb-4 w-full h-40 object-cover rounded" />
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-lg text-gray-300">{description}</p>
    </Link>
  );
};

export default Card;
