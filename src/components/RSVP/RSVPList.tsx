// src/components/RSVP/RSVPList.tsx

import React, { useState, useEffect } from 'react';
import CustomModal from '../CustomModal';
import RSVPForm from './RSVPForm';
import { RSVP } from '../types';

const RSVPList: React.FC<{ rsvps: RSVP[]; onEdit: (rsvp: RSVP) => void }> = ({ rsvps, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRSVP, setSelectedRSVP] = useState<RSVP | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortCriteria, setSortCriteria] = useState('guestName');
  const [filteredRSVPs, setFilteredRSVPs] = useState<RSVP[]>(rsvps);

  useEffect(() => {
    let filtered = rsvps;

    if (filterStatus) {
      filtered = filtered.filter(rsvp => rsvp.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(rsvp =>
        rsvp.guestName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortCriteria === 'guestName') {
        return a.guestName.localeCompare(b.guestName);
      } else {
        return a.status.localeCompare(b.status);
      }
    });

    setFilteredRSVPs(filtered);
  }, [searchTerm, filterStatus, sortCriteria, rsvps]);

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
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search RSVPs"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="ml-4">
          <label className="mr-2">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
        <div className="ml-4">
          <label className="mr-2">Sort by:</label>
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="border rounded p-2"
          >
            <option value="guestName">Guest Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRSVPs.map((rsvp) => (
          <div key={rsvp.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">{rsvp.guestName}</h2>
            <p className="text-gray-700 mb-1"><strong>Status:</strong> {rsvp.status}</p>
            {rsvp.guestType && (
              <p className="text-gray-700 mb-1"><strong>Type:</strong> {rsvp.guestType}</p>
            )}
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
          <RSVPForm initialData={selectedRSVP} onSave={(updatedRSVP) => {
            onEdit(updatedRSVP);
            closeModal();
          }} />
        </CustomModal>
      )}
    </div>
  );
};

export default RSVPList;
