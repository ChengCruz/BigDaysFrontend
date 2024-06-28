import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import TableForm from './TableForm';

interface Table {
  id: number;
  number: string;
  capacity: number;
}

const TableList: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTables() {
      try {
        const response = await axios.get<Table[]>('/api/tables');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    }
    fetchTables();
  }, []);

  const openModal = (table: Table) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTable(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Tables"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div key={table.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">Table {table.number}</h2>
            <p className="text-gray-700 mb-1"><strong>Capacity:</strong> {table.capacity}</p>
            <button
              onClick={() => openModal(table)}
              className="mt-4 bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {selectedTable && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Edit Table">
          <TableForm initialData={selectedTable} />
        </CustomModal>
      )}
    </div>
  );
};

export default TableList;
