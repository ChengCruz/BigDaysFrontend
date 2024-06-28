import React, { useState } from 'react';
import axios from 'axios';

interface Table {
  number: string;
  capacity: number;
}

const TableForm: React.FC = () => {
  const [form, setForm] = useState<Table>({ number: '', capacity: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/tables', form);
      alert('Table added successfully');
      setForm({ number: '', capacity: 0 });
    } catch (error) {
      console.error('Error adding table:', error);
      alert('Failed to add Table');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-script text-weddingGold mb-4">Add a Table</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Table Number</label>
        <input
          type="text"
          name="number"
          value={form.number}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2">
        Add Table
      </button>
    </form>
  );
};

export default TableForm;
