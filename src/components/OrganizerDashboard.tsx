// src/components/OrganizerDashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import RSVPSummary from './RSVPSummary';

interface RSVP {
  id: string;
  guestName: string;
  status: string;
  guestType: string;
  email: string;
  phone: string;
  mealPreference: string;
  additionalGuests: number;
  comments: string;
  eventHashKey: string;
}

const OrganizerDashboard: React.FC = () => {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [filteredRsvps, setFilteredRsvps] = useState<RSVP[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const response = await axios.get<RSVP[]>('/api/rsvps');
        setRsvps(response.data);
        setFilteredRsvps(response.data);
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
      }
    };

    fetchRsvps();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setStatusFilter(status);
    if (status === '') {
      setFilteredRsvps(rsvps);
    } else {
      setFilteredRsvps(rsvps.filter(rsvp => rsvp.status === status));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">RSVP Dashboard</h1>
      <div className="mb-4 flex justify-between">
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>
        <CSVLink
          data={filteredRsvps}
          filename={"rsvps.csv"}
          className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200"
        >
          Export CSV
        </CSVLink>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Guest Name</th>
            <th className="py-2">Status</th>
            <th className="py-2">Guest Type</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Meal Preference</th>
            <th className="py-2">Additional Guests</th>
            <th className="py-2">Comments</th>
          </tr>
        </thead>
        <tbody>
          {filteredRsvps.map(rsvp => (
            <tr key={rsvp.id}>
              <td className="border px-4 py-2">{rsvp.guestName}</td>
              <td className="border px-4 py-2">{rsvp.status}</td>
              <td className="border px-4 py-2">{rsvp.guestType}</td>
              <td className="border px-4 py-2">{rsvp.email}</td>
              <td className="border px-4 py-2">{rsvp.phone}</td>
              <td className="border px-4 py-2">{rsvp.mealPreference}</td>
              <td className="border px-4 py-2">{rsvp.additionalGuests}</td>
              <td className="border px-4 py-2">{rsvp.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <RSVPSummary />
    </div>
  );
};

export default OrganizerDashboard;
