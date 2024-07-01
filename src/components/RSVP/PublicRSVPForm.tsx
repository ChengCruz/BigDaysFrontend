import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RSVP } from '../types';

const PublicRSVPForm: React.FC = () => {
  const { hashKey } = useParams<{ hashKey: string }>();
  const [form, setForm] = useState<RSVP>({ guestName: '', status: '', guestType: '', eventHashKey: hashKey });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/public-rsvps', form);
      toast.success('RSVP submitted successfully');
      setForm({ guestName: '', status: '', guestType: '', eventHashKey: hashKey });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast.error('Failed to submit RSVP');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">RSVP for the Event</h1>
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
          Submit RSVP
        </button>
      </form>
    </div>
  );
};

export default PublicRSVPForm;
