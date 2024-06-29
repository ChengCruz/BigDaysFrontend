import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import GuestForm from './GuestForm';
import useSearch from '../../hooks/useSearch';
import { toast } from 'react-toastify';

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { searchTerm, setSearchTerm } = useSearch(guests, 'firstName');

  useEffect(() => {
    async function fetchGuests() {
      setIsLoading(true);
      try {
        const response = await axios.get<Guest[]>('/api/guests');
        setGuests(response.data);
        setFilteredGuests(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching guests');
      } finally {
        setIsLoading(false);
      }
    }
    fetchGuests();
  }, []);

  useEffect(() => {
    setFilteredGuests(
      guests.filter((guest) =>
        `${guest.firstName} ${guest.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, guests]);

  const openModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGuest(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/guests/${id}`);
      setGuests(guests.filter(g => g.id !== id));
      toast.success('Guest deleted successfully');
    } catch (error) {
      console.error('Error deleting guest:', error);
      toast.error('Failed to delete Guest');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Guests"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuests.map((guest) => (
          <div key={guest.id} className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105">
            <h2 className="text-2xl font-script text-weddingGold mb-2">
              {guest.firstName} {guest.lastName}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Email:</strong> {guest.email}
            </p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => openModal(guest)}
                className="bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(guest.id)}
                className="bg-red-600 text-white rounded p-2 hover:bg-red-800 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedGuest && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Edit Guest">
          <GuestForm initialData={selectedGuest} onSave={closeModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default GuestList;
