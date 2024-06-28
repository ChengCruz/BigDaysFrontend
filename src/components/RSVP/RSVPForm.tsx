import React, { useState } from 'react';
import axios from 'axios';

interface RSVP {
  guestName: string;
  status: string;
}

const RSVPForm: React.FC = () => {
  const [form, setForm] = useState<RSVP>({ guestName: '', status: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/rsvps', form);
      alert('RSVP added successfully');
      setForm({ guestName: '', status: '' });
    } catch (error) {
      console.error('Error adding RSVP:', error);
      alert('Failed to add RSVP');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-script text-weddingGold mb-4">Add an RSVP</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Guest Name</label>
        <input
          type="text"
          name="guestName"
          value={form.guestName}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="" disabled>Select status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2">
        Add RSVP
      </button>
    </form>
  );
};

export default RSVPForm;
