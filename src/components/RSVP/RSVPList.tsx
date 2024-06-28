import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface RSVP {
  id: number;
  guestName: string;
  status: string;
}

const RSVPList: React.FC = () => {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  useEffect(() => {
    async function fetchRSVPs() {
      try {
        const response = await axios.get<RSVP[]>('/api/rsvps');
        setRsvps(response.data);
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
      }
    }
    fetchRSVPs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rsvps.map((rsvp) => (
        <div key={rsvp.id} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-script text-weddingGold mb-2">{rsvp.guestName}</h2>
          <p className="text-gray-700"><strong>Status:</strong> {rsvp.status}</p>
        </div>
      ))}
    </div>
  );
};

export default RSVPList;
