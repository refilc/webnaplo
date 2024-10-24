import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const refilc_sub = () => {
  const [authToken, setAuthToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // modal is open when this component renders
  const [loading, setLoading] = useState(false); // for showing the loading spinner
  const [couponData, setCouponData] = useState(null); // store coupon details
  const [formData, setFormData] = useState({
    product: 'refilcplus_basic',
    count: '',
    coupon_code: '',
    expire_date: ''
  });
  
  const [isCopied, setIsCopied] = useState(false); // state to track if the coupon is copied

  const location = useLocation();
  const productId = location.state?.productId ?? 'refilcplus_basic'; // default to basic

  const products = [
    { id: 'refilcplus_basic', name: 'Basic Subscription' },
    { id: 'refilcplus_gold', name: 'Gold Subscription' }
  ];

  useEffect(() => {
    setFormData({ ...formData, product: productId });
    const accessToken = window.localStorage.getItem('admin_token') ?? '';
    setAuthToken(accessToken);
  }, [productId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(couponData.coupon_code);
    setIsCopied(true); // change to check icon
  };

  const handleMouseLeave = () => {
    setIsCopied(false); // revert to copy icon when mouse leaves
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading spinner
    try {
      const expireDate = new Date(formData.expire_date).toISOString();

      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.refilc.hu/v4/payment/coupon/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: authToken,
          product: formData.product,
          count: formData.count,
          coupon_code: formData.coupon_code,
          expire_date: expireDate,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // set coupon details if the API call is successful
        setCouponData(data.data.promotion);
      } else {
        console.error('API Error:', data.message); // handle the API error
      }
    } catch (error) {
      console.error('Error while creating coupon:', error);
    } finally {
      setLoading(false); // stop loading spinner
    }
  };

  return (
    <div className="p-4">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
              </div>
            ) : couponData ? (
              <div className="text-white text-center">
                <h2 className="text-xl font-bold mb-4">Coupon created</h2>
                <div className="mb-4">
                  <img src="/public/image/products/refilc_sub.png" alt="Product" className="mx-auto" />
                </div>
                
                {/* Coupon code with 1xl text and copy image */}
                <div className="flex justify-center items-center mb-2">
                  <p className="text-xl font-bold">Coupon code: {couponData.coupon_code}</p>
                  <button 
                    onClick={handleCopy} 
                    onMouseLeave={handleMouseLeave}
                    className="ml-2"
                  >
                    <img 
                      src={isCopied ? '/public/image/check.svg' : '/public/image/copy.svg'} 
                      alt={isCopied ? "Copied" : "Copy"} 
                      className="w-5 h-5" 
                    />
                  </button>
                </div>
                
                <p>Duration: {couponData.count} month(s)</p>
                <p>Expires on: {new Date(couponData.expire_date).toLocaleDateString()}</p>
                
                {/* Coupon ID in small gray text */}
                <p className="text-xs text-gray-400 mt-2">Coupon ID: {couponData.public_id} or {couponData.id}</p>
                
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 mt-4 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Subscription Type
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                    placeholder="Enter number of months"
                    className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Activation Code
                  </label>
                  <input
                    type="text"
                    value={formData.coupon_code}
                    onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value })}
                    placeholder="Enter activation code (optional)"
                    className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.expire_date}
                    onChange={(e) => setFormData({ ...formData, expire_date: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default refilc_sub;
