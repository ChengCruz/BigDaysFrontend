import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await axios.get<Guest[]>('/api/guests');
        setGuests(response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    }
    fetchGuests();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {guests.map((guest) => (
        <div key={guest.id} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-script text-weddingGold mb-2">{guest.firstName} {guest.lastName}</h2>
          <p className="text-gray-700 mb-1"><strong>Email:</strong> {guest.email}</p>
        </div>
      ))}
    </div>
  );
};

export default GuestList;
