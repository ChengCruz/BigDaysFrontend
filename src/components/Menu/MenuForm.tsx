import React, { useState } from 'react';
import axios from 'axios';

interface Menu {
  name: string;
  description: string;
}

const MenuForm: React.FC = () => {
  const [form, setForm] = useState<Menu>({ name: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/menus', form);
      alert('Menu added successfully');
      setForm({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding menu:', error);
      alert('Failed to add Menu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-script text-weddingGold mb-4">Add a Menu</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2">
        Add Menu
      </button>
    </form>
  );
};

export default MenuForm;
