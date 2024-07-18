import React from 'react';
import Card from './card';
const Home = ({ isLoggedIn }) => {
  const cards = [
    {
      title: 'Piggy Bank',
      description: 'This is a sample description for Piggy Bank',
      image: 'https://img.freepik.com/free-vector/hand-drawn-bankruptcy-broken-piggy-bank_23-2148498564.jpg?t=st=1721260079~exp=1721263679~hmac=7d7ec17f1fdda339f5e16ae70787107f8997a05ada47ba6dc99ed927a49e8371&w=740',
    },
    {
      title: 'Token Shop',
      description: 'This is a sample description for Token Shop',
      image: 'https://img.freepik.com/free-vector/man-with-strategy-shopping-car-coins_24877-53525.jpg?t=st=1721260132~exp=1721263732~hmac=fc54967588f6018022f8e758360f9d06e97e44264b03f239742b65e5c588473f&w=826',
    },
    {
      title: 'Investment Section',
      description: 'This is a sample description for Card 4',
      image: 'https://img.freepik.com/free-vector/investment-data-concept-illustration_114360-5159.jpg?t=st=1721260236~exp=1721263836~hmac=be5dc9de96b7d8e5d12d46f33edca188eb9e60a17565ad9d1acadcf42885b3d0&w=740',
    },
    {
      title: 'Loan',
      description: 'This is a sample description for Card 5',
      image: 'https://img.freepik.com/free-vector/premium-cash-reward-bonus-work-done-best-employee-rewarding-promotion-order-efficiency-stimulation-boss-subordinate-cartoon-characters_335657-2984.jpg?semt=sph',
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-6">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            description={card.description} 
            image={card.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;