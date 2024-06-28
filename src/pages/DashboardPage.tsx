import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Summary {
  totalBigDays: number;
  totalGuests: number;
  totalTables: number;
  totalRSVPs: number;
}

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await axios.get<Summary>('/api/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">Dashboard</h1>
      {summary ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-script text-weddingGold mb-2">Total Big Days</h2>
            <p className="text-gray-700 text-3xl">{summary.totalBigDays}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-script text-weddingGold mb-2">Total Guests</h2>
            <p className="text-gray-700 text-3xl">{summary.totalGuests}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-script text-weddingGold mb-2">Total Tables</h2>
            <p className="text-gray-700 text-3xl">{summary.totalTables}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-script text-weddingGold mb-2">Total RSVPs</h2>
            <p className="text-gray-700 text-3xl">{summary.totalRSVPs}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">Loading summary...</p>
      )}
    </div>
  );
};

export default DashboardPage;
