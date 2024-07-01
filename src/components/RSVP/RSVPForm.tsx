import React, { useState, useEffect } from 'react';
import { RSVP } from '../types';

const RSVPForm: React.FC<{ initialData: RSVP | null; onSave: (rsvp: RSVP) => void }> = ({ initialData, onSave }) => {
  const [form, setForm] = useState<RSVP>(initialData || { guestName: '', status: '', guestType: '' });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm({ guestName: '', status: '', guestType: '' });
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
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Guest Type</label>
        <select
          name="guestType"
          value={form.guestType}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        >
          <option value="" disabled>Select type</option>
          <option value="Family">Family</option>
          <option value="Friend">Friend</option>
          <option value="VIP">VIP</option>
        </select>
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} RSVP
      </button>
    </form>
  );
};

export default RSVPForm;
