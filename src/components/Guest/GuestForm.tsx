import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Guest {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

const GuestForm: React.FC<{ initialData?: Guest }> = ({ initialData }) => {
  const [form, setForm] = useState<Guest>(initialData || { firstName: '', lastName: '', email: '' });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await axios.put(`/api/guests/${initialData.id}`, form);
        toast.success('Guest updated successfully');
      } else {
        await axios.post('/api/guests', form);
        toast.success('Guest added successfully');
      }
      setForm({ firstName: '', lastName: '', email: '' });
    } catch (error) {
      console.error('Error saving guest:', error);
      toast.error('Failed to save Guest');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} Guest
      </button>
    </form>
  );
};

export default GuestForm;
