import React from 'react';
import RSVPList from '../components/RSVP/RSVPList';
import RSVPForm from '../components/RSVP/RSVPForm';

const RSVPPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">RSVPs</h1>
      <RSVPForm />
      <RSVPList />
    </div>
  );
};

export default RSVPPage;
