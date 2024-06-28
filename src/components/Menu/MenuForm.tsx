import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Menu {
  id?: number;
  name: string;
  description: string;
}

const MenuForm: React.FC<{ initialData?: Menu }> = ({ initialData }) => {
  const [form, setForm] = useState<Menu>(initialData || { name: '', description: '' });

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
        await axios.put(`/api/menus/${initialData.id}`, form);
        toast.success('Menu updated successfully');
      } else {
        await axios.post('/api/menus', form);
        toast.success('Menu added successfully');
      }
      setForm({ name: '', description: '' });
    } catch (error) {
      console.error('Error saving menu:', error);
      toast.error('Failed to save Menu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} Menu
      </button>
    </form>
  );
};

export default MenuForm;
