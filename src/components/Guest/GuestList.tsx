import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import GuestForm from './GuestForm';

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGuest(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Guests"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guests.map((guest) => (
          <div key={guest.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">{guest.firstName} {guest.lastName}</h2>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> {guest.email}</p>
            <button
              onClick={() => openModal(guest)}
              className="mt-4 bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {selectedGuest && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Edit Guest">
          <GuestForm initialData={selectedGuest} />
        </CustomModal>
      )}
    </div>
  );
};

export default GuestList;
