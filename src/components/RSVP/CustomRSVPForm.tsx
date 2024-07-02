import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface RSVP {
  id?: string;
  guestName: string;
  status: string;
  guestType?: string;
  email: string;
  phone: string;
  mealPreference: string;
  additionalGuests: number;
  comments: string;
  eventHashKey?: string;
}

const CustomRSVPForm: React.FC = () => {
  const { hashKey } = useParams<{ hashKey: string }>();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RSVP>();

  useEffect(() => {
    const validateHashKey = async () => {
      try {
        const response = await axios.get(`/api/validate-hash/${encodeURIComponent(hashKey!)}`);
        setIsValid(response.data.valid);
      } catch (error) {
        setIsValid(false);
      }
    };

    validateHashKey();
  }, [hashKey]);

  const onSubmit: SubmitHandler<RSVP> = async (data) => {
    try {
      await axios.post('/api/public-rsvps', { ...data, eventHashKey: hashKey });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    }
  };

  if (isValid === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-red-600">Invalid Access</h1>
          <p className="text-center text-lg mb-6 text-gray-600">The link you followed is invalid or expired.</p>
          <Link to='/' className="bg-weddingPink opacity-80 text-white rounded-lg shadow-lg p-2 hover:bg-pink-300 transition">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        {submitted ? (
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-weddingGold">Thank you for your RSVP!</p>
            <p className="text-gray-600 m-4">We look forward to seeing you at the event.</p>
            <Link to='/' className="bg-weddingPink opacity-80 text-white rounded-lg shadow-lg p-2 hover:bg-pink-300 transition">
              Return to Home
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center text-weddingGold">RSVP for the Event</h1>
            <p className="text-center text-lg mb-6 text-gray-600">We are excited to have you join us! Please fill out the form below to RSVP.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold">Guest Name</label>
                <input
                  type="text"
                  {...register('guestName', { required: 'Guest name is required' })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                />
                {errors.guestName && <p className="text-red-600">{errors.guestName.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Status</label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                >
                  <option value="" disabled>Select status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Declined">Declined</option>
                </select>
                {errors.status && <p className="text-red-600">{errors.status.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Guest Type</label>
                <select
                  {...register('guestType')}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                >
                  <option value="" disabled>Select type</option>
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Email Address</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' }
                  })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                />
                {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Meal Preference</label>
                <select
                  {...register('mealPreference')}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                >
                  <option value="" disabled>Select preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Additional Guests</label>
                <input
                  type="number"
                  {...register('additionalGuests', { min: 0, max: 10 })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                  min="0"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Comments or Special Requests</label>
                <textarea
                  {...register('comments')}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                  rows={4}
                />
              </div>
              <button type="submit" className="w-full bg-weddingGold text-white rounded-lg p-3 font-semibold hover:bg-weddingGold-dark transition duration-200">
                Submit RSVP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomRSVPForm;
