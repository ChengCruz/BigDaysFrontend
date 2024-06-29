import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableList from '../components/Table/TableList';
import TableForm from '../components/Table/TableForm';
import { Table } from '../components/types/Table';

const TablePage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Table[]>('/api/tables');
      setTables(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching tables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">Tables</h1>
      <TableForm onSave={fetchTables} />
      <TableList tables={tables} loading={loading} error={error} fetchTables={fetchTables} />
    </div>
  );
};

export default TablePage;
