import React, { useState } from 'react';
import axios from 'axios';

interface Guest {
  firstName: string;
  lastName: string;
  email: string;
}

const GuestForm: React.FC = () => {
  const [form, setForm] = useState<Guest>({ firstName: '', lastName: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/guests', form);
      alert('Guest added successfully');
      setForm({ firstName: '', lastName: '', email: '' });
    } catch (error) {
      console.error('Error adding guest:', error);
      alert('Failed to add Guest');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-script text-weddingGold mb-4">Add a Guest</h2>
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2">
        Add Guest
      </button>
    </form>
  );
};

export default GuestForm;
