import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RSVPList from '../components/RSVP/RSVPList';
import RSVPForm from '../components/RSVP/RSVPForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RSVP } from '../components/types';

const RSVPPage: React.FC = () => {
  const [rsvps, setRSVPs] = useState<RSVP[]>([]);
  const [selectedRSVP, setSelectedRSVP] = useState<RSVP | null>(null);
  const [eventHashKey, setEventHashKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRSVPs() {
      try {
        const response = await axios.get<RSVP[]>('/api/rsvps');
        setRSVPs(response.data);
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
      }
    }

    async function fetchEventHashKey() {
      try {
        const response = await axios.get('/api/event-hash-key');
        setEventHashKey(response.data);
      } catch (error) {
        console.error('Error fetching event hash key:', error);
      }
    }

    fetchRSVPs();
    fetchEventHashKey();
  }, []);

  const addOrUpdateRSVP = async (rsvp: RSVP) => {
    try {
      if (rsvp.id) {
        await axios.put(`/api/rsvps/${rsvp.id}`, rsvp);
        toast.success('RSVP updated successfully');
      } else {
        const response = await axios.post('/api/rsvps', rsvp);
        rsvp.id = response.data.id; // Assuming the new ID is returned in the response
        toast.success('RSVP added successfully');
      }

      setRSVPs((prevRSVPs) => {
        const existingRSVPIndex = prevRSVPs.findIndex((item) => item.id === rsvp.id);
        if (existingRSVPIndex !== -1) {
          const updatedRSVPs = [...prevRSVPs];
          updatedRSVPs[existingRSVPIndex] = rsvp;
          return updatedRSVPs;
        }
        return [...prevRSVPs, rsvp];
      });

      setSelectedRSVP(null);
    } catch (error) {
      console.error('Error saving RSVP:', error);
      toast.error('Failed to save RSVP');
    }
  };

  const handleSelectRSVP = (rsvp: RSVP) => {
    setSelectedRSVP(rsvp);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">RSVPs</h1>
      <RSVPForm initialData={selectedRSVP!} onSave={addOrUpdateRSVP} />
      <RSVPList rsvps={rsvps} onEdit={handleSelectRSVP} />
      {eventHashKey && (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-semibold">Public RSVP URL</h2>
          <p>
            Share this URL with your guests: 
            <a href={`/public-rsvp/${eventHashKey}`} className="text-blue-500">{`/public-rsvp/${eventHashKey}`}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default RSVPPage;
