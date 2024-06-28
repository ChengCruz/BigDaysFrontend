import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import BigDayForm from './BigDayForm';

interface BigDay {
  id: number;
  name: string;
  date: string;
  venue: string;
}

const BigDayList: React.FC = () => {
  const [bigDays, setBigDays] = useState<BigDay[]>([]);
  const [selectedBigDay, setSelectedBigDay] = useState<BigDay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBigDays() {
      try {
        const response = await axios.get<BigDay[]>('/api/bigdays');
        setBigDays(response.data);
      } catch (error) {
        console.error('Error fetching big days:', error);
      }
    }
    fetchBigDays();
  }, []);

  const openModal = (bigDay: BigDay) => {
    setSelectedBigDay(bigDay);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBigDay(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Big Days"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bigDays.map((bigDay) => (
          <div key={bigDay.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">{bigDay.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Date:</strong> {bigDay.date}</p>
            <p className="text-gray-700"><strong>Venue:</strong> {bigDay.venue}</p>
            <button
              onClick={() => openModal(bigDay)}
              className="mt-4 bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {selectedBigDay && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Edit Big Day">
          <BigDayForm initialData={selectedBigDay} />
        </CustomModal>
      )}
    </div>
  );
};

export default BigDayList;
