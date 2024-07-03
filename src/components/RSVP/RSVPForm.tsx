import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RSVP } from '../types';

interface Props {
  initialData?: RSVP;
  onSave: (rsvp: RSVP) => void;
}

const RSVPForm: React.FC<Props> = ({ initialData, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RSVP>({
    defaultValues: initialData || { guestName: '', status: '', guestType: '' },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: RSVP) => {
    onSave(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Guest Name</label>
        <input
          type="text"
          {...register('guestName', { required: 'Guest name is required' })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.guestName && <p className="text-red-600">{errors.guestName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Status</label>
        <select
          {...register('status', { required: 'Status is required' })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        >
          <option value="" disabled>Select status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>
        {errors.status && <p className="text-red-600">{errors.status.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Guest Type</label>
        <select
          {...register('guestType')}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        >
          <option value="" disabled>Select type</option>
          <option value="Family">Family</option>
          <option value="Friend">Friend</option>
          <option value="VIP">VIP</option>
        </select>
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} RSVP
      </button>
    </form>
  );
};

export default RSVPForm;
