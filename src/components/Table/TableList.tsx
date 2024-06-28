import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Table {
  id: number;
  number: string;
  capacity: number;
}

const TableList: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tables.map((table) => (
        <div key={table.id} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-script text-weddingGold mb-2">Table {table.number}</h2>
          <p className="text-gray-700"><strong>Capacity:</strong> {table.capacity}</p>
        </div>
      ))}
    </div>
  );
};

export default TableList;
