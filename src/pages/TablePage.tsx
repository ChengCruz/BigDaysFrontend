import React from 'react';
import TableList from '../components/Table/TableList';
import TableForm from '../components/Table/TableForm';

const TablePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">Tables</h1>
      <TableForm />
      <TableList />
    </div>
  );
};

export default TablePage;
