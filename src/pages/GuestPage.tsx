import React from 'react';
import GuestList from '../components/Guest/GuestList';
import GuestForm from '../components/Guest/GuestForm';

const GuestPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">Guests</h1>
      <GuestForm />
      <GuestList />
    </div>
  );
};

export default GuestPage;
