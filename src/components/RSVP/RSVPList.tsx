import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import RSVPForm from './RSVPForm';

interface RSVP {
  id: number;
  guestName: string;
  status: string;
}

const RSVPList: React.FC = () => {
  const [rsvps, setRSVPs] = useState<RSVP[]>([]);
  const [selectedRSVP, setSelectedRSVP] = useState<RSVP | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchRSVPs() {
      try {
        const response = await axios.get<RSVP[]>('/api/rsvps');
        setRSVPs(response.data);
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
      }
    }
    fetchRSVPs();
  }, []);

  const openModal = (rsvp: RSVP) => {
    setSelectedRSVP(rsvp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRSVP(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search RSVPs"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rsvps.map((rsvp) => (
          <div key={rsvp.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">{rsvp.guestName}</h2>
            <p className="text-gray-700 mb-1"><strong>Status:</strong> {rsvp.status}</p>
            <button
              onClick={() => openModal(rsvp)}
              className="mt-4 bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {selectedRSVP && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Edit RSVP">
          <RSVPForm initialData={selectedRSVP} />
        </CustomModal>
      )}
    </div>
  );
};

export default RSVPList;
