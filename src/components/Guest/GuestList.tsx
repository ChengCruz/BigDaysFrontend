import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import GuestForm from './GuestForm';
import useSearch from '../../hooks/useSearch';
import { toast } from 'react-toastify';
import { Guest } from '../types/Guest';

interface GuestListProps {
  guests: Guest[];
  loading: boolean;
  error: string | null;
  fetchGuests: () => void;
}

const GuestList: React.FC<GuestListProps> = ({ guests, loading, error, fetchGuests }) => {
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { searchTerm, setSearchTerm } = useSearch(guests, 'firstName');

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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/guests/${id}`);
      fetchGuests(); // Refresh the list after deletion
      toast.success('Guest deleted successfully');
    } catch (error) {
      console.error('Error deleting guest:', error);
      toast.error('Failed to delete Guest');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

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
            <p className="text-gray-700 mb-1">
              <strong>Status:</strong> {guest.status}
            </p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => openModal(guest)}
                className="bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(guest.id!)}
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
          <GuestForm initialData={selectedGuest} onSave={() => { fetchGuests(); closeModal(); }} />
        </CustomModal>
      )}
    </div>
  );
};

export default GuestList;
