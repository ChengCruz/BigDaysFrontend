import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal';
import TableForm from './TableForm';
import useSearch from '../../hooks/useSearch';
import { toast } from 'react-toastify';

interface Table {
  id: number;
  number: string;
  capacity: number;
}

const TableList: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [filteredTables, setFilteredTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { searchTerm, setSearchTerm } = useSearch(tables, 'number');

  useEffect(() => {
    async function fetchTables() {
      setIsLoading(true);
      try {
        const response = await axios.get<Table[]>('/api/tables');
        setTables(response.data);
        setFilteredTables(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching tables');
      } finally {
        setIsLoading(false);
      }
    }
    fetchTables();
  }, []);

  useEffect(() => {
    setFilteredTables(
      tables.filter((table) =>
        table.number.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tables]);

  const openModal = (table: Table) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTable(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tables/${id}`);
      setTables(tables.filter(t => t.id !== id));
      toast.success('Table deleted successfully');
    } catch (error) {
      console.error('Error deleting table:', error);
      toast.error('Failed to delete Table');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Tables"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTables.map((table) => (
          <div key={table.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">Table {table.number}</h2>
            <p className="text-gray-700 mb-1"><strong>Capacity:</strong> {table.capacity}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => openModal(table)}
                className="bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(table.id)}
                className="bg-red-600 text-white rounded p-2 hover:bg-red-800 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedTable && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Edit Table">
          <TableForm initialData={selectedTable} onSave={closeModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default TableList;
