import React, { useState } from 'react';
import RefilcplusMenu from './products/refilcplus'; // import the product menu

const AdminCoupons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = () => {
    setIsModalOpen(true);
  };

  const products = [
    {
      id: 'refilcplus_basic',
      name: 'reFilc App Subscriptions',
      image: '/images/image.png' // path to the product image
    }
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer w-[300px]"
            onClick={handleProductClick}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-bold text-white text-center">
              {product.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Modal for the product */}
      {isModalOpen && (
        <RefilcplusMenu closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default AdminCoupons;
