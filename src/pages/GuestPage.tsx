import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GuestList from '../components/Guest/GuestList';
import GuestForm from '../components/Guest/GuestForm';
import { Guest } from '../components/types/Guest';

const GuestPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Guest[]>('/api/guests');
      setGuests(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching guests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">Guests</h1>
      <GuestForm onSave={fetchGuests} />
      <GuestList guests={guests} loading={loading} error={error} fetchGuests={fetchGuests} />
    </div>
  );
};

export default GuestPage;
