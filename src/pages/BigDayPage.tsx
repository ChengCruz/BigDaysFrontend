import React from 'react';
import BigDayList from '../components/BigDay/BigDayList';
import BigDayForm from '../components/BigDay/BigDayForm';

const BigDayPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">Big Days</h1>
      <BigDayForm />
      <BigDayList />
    </div>
  );
};

export default BigDayPage;
