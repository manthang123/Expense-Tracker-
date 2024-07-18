import React from 'react';

const TokenShop = ({ tokenBalance, setTokenBalance }) => {
  const accessories = [
    { id: 1, name: 'Hat', price: 5, image: 'https://fansarmy.in/cdn/shop/products/animecaps_2000x.jpg?v=1662883662' },
    { id: 2, name: 'Sunglasses', price: 3, image: 'https://m.media-amazon.com/images/I/81hh7Pz4w1L.AC_UY1100.jpg' },
    { id: 3, name: 'Shoes', price: 8, image: 'https://static.wixstatic.com/media/3323ea_96e75bf5be76426fbaa301590dbf4b8a~mv2.jpg/v1/fill/w_520,h_650,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/3323ea_96e75bf5be76426fbaa301590dbf4b8a~mv2.jpg' },
    { id: 4, name: 'Keyboard', price: 10, image: 'https://www.lapcare.com/cdn/shop/files/5_4065d436-38f6-42d3-bfa2-fa29861b03c1.webp?v=1712836040' },
    { id: 5, name: 'Mouse', price: 7, image: 'https://m.media-amazon.com/images/I/61dqRdrRUPL.jpg' },
    { id: 6, name: 'Headphones', price: 15, image: 'https://www.reliancedigital.in/medias/Noise-TWO-Bluetooth-Headphones-494352080-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w0MjU1NnxpbWFnZS9qcGVnfGltYWdlcy9oNzEvaDFmLzEwMTAxMDE3NzM5Mjk0LmpwZ3wzOWYwOTY5N2ZmMmVlYTE0YzdlMDZkODAxY2IzNDk4ZDc3NmIzM2ExMzQ3MWRjMTQwOTM1MjkyZmYyNDVmMGZi' },
    { id: 7, name: 'Monitor', price: 20, image: 'https://howensmonitor.com/cdn/shop/files/CX070PI-B-2.png?v=1716866313&width=1200' },
    { id: 8, name: 'Graphics Card', price: 30, image: 'https://m.media-amazon.com/images/I/81rDmutuwML.jpg' },
    { id: 9, name: 'CPU', price: 25, image: 'https://m.media-amazon.com/images/I/61L6qbhLx0L.AC_UF1000,1000_QL80.jpg' },
    { id: 10, name: 'RAM', price: 12, image: 'https://simmtronics.co.in/wp-content/uploads/2022/12/16_02.jpg' },
    { id: 11, name: 'SSD', price: 18, image: 'https://www.pmz.co.ke/wp-content/uploads/2023/06/hikvision-e1000-internal-ssd-m.2-pcie-gen-34-nvme-2280-256gb-hs-ssd-e1000-256g.png' },
    { id: 12, name: 'Motherboard', price: 22, image: 'https://static.gigabyte.com/StaticFile/Image/Global/3e678f8782951dcb31e3f913c632db2d/Product/11473/Png' },
  ];
  
  const handlePurchase = (price) => {
    if (tokenBalance >= price) {
      setTokenBalance(tokenBalance - price);
      alert('Purchase successful!');
    } else {
      alert('Not enough tokens!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">Token Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-2xl">
            <img
              src={accessory.image}
              alt={accessory.name}
              className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="text-center p-6 bg-black bg-opacity-70 rounded-lg">
                <h2 className="text-xl font-bold text-white mb-2">{accessory.name}</h2>
                <p className="text-lg text-gray-300 mb-4">{accessory.price} Tokens</p>
                <button
                  onClick={() => handlePurchase(accessory.price)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TokenShop;