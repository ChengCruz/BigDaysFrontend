import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RSVP {
  id?: number;
  guestName: string;
  status: string;
}

const RSVPForm: React.FC<{ initialData?: RSVP }> = ({ initialData }) => {
  const [form, setForm] = useState<RSVP>(initialData || { guestName: '', status: '' });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await axios.put(`/api/rsvps/${initialData.id}`, form);
        toast.success('RSVP updated successfully');
      } else {
        await axios.post('/api/rsvps', form);
        toast.success('RSVP added successfully');
      }
      setForm({ guestName: '', status: '' });
    } catch (error) {
      console.error('Error saving RSVP:', error);
      toast.error('Failed to save RSVP');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Guest Name</label>
        <input
          type="text"
          name="guestName"
          value={form.guestName}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        >
          <option value="" disabled>Select status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} RSVP
      </button>
    </form>
  );
};

export default RSVPForm;
