import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Table {
  id?: number;
  number: string;
  capacity: number;
}

const TableForm: React.FC<{ initialData?: Table }> = ({ initialData }) => {
  const [form, setForm] = useState<Table>(initialData || { number: '', capacity: 0 });

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
        await axios.put(`/api/tables/${initialData.id}`, form);
        toast.success('Table updated successfully');
      } else {
        await axios.post('/api/tables', form);
        toast.success('Table added successfully');
      }
      setForm({ number: '', capacity: 0 });
    } catch (error) {
      console.error('Error saving table:', error);
      toast.error('Failed to save Table');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Table Number</label>
        <input
          type="text"
          name="number"
          value={form.number}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} Table
      </button>
    </form>
  );
};

export default TableForm;
