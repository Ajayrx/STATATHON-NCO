import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [form, setForm] = useState({ nco_code: '', title: '', description: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/v1/admin', form);
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white">
      <h2 className="text-xl mb-2 font-semibold">Add New Job Code</h2>
      <input name="nco_code" placeholder="NCO Code" onChange={handleChange} className="block mb-2 w-full border p-2" />
      <input name="title" placeholder="Job Title" onChange={handleChange} className="block mb-2 w-full border p-2" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="block mb-2 w-full border p-2" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      {success && <p className="text-green-600 mt-2">✅ Added successfully</p>}
    </form>
  );
}

export default AdminPanel;
