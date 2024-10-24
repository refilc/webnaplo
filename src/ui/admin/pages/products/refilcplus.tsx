import React, { useState, useEffect } from 'react';

const RefilcplusMenu = ({ closeModal }) => {
  const [authToken, setAuthToken] = useState('');
  const [formData, setFormData] = useState({
    product: 'refilcplus_basic',
    count: '',
    coupon_code: '',
    expire_date: ''
  });

  const products = [
    { id: 'refilcplus_basic', name: 'Basic Subscription' },
    { id: 'refilcplus_gold', name: 'Gold Subscription' }
  ];

  useEffect(() => {
    const accessToken = window.localStorage.getItem('admin_token') ?? '';
    setAuthToken(accessToken);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://api.refilc.hu/v4/payment/coupon/create';
    form.target = '_blank';

    const appendInput = (name, value) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    const expireDate = new Date(formData.expire_date).toISOString();

    appendInput('access_token', authToken);
    appendInput('product', formData.product);
    appendInput('count', formData.count);
    appendInput('coupon_code', formData.coupon_code);
    appendInput('expire_date', expireDate); // RFC3339 format

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    closeModal(); // close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Create Promotion Coupon</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Subscription Type</label>
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
            <label className="block text-gray-300 mb-2">Duration (months)</label>
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
            <label className="block text-gray-300 mb-2">Activation Code</label>
            <input
              type="text"
              value={formData.coupon_code}
              onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value })}
              placeholder="Enter activation code (optional)"
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Expiration Date</label>
            <input
              type="datetime-local"
              value={formData.expire_date}
              onChange={(e) => setFormData({ ...formData, expire_date: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefilcplusMenu;
