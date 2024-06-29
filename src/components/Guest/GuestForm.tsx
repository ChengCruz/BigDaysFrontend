import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Guest {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

const GuestForm: React.FC<{ initialData?: Guest; onSave?: () => void }> = ({ initialData, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Guest>({
    defaultValues: initialData || { firstName: '', lastName: '', email: '' },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: Guest) => {
    try {
      if (initialData?.id) {
        await axios.put(`/api/guests/${initialData.id}`, data);
        toast.success('Guest updated successfully');
      } else {
        await axios.post('/api/guests', data);
        toast.success('Guest added successfully');
      }
      reset();
      if (onSave) onSave();
    } catch (error) {
      console.error('Error saving guest:', error);
      toast.error('Failed to save Guest');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">First Name</label>
        <input
          type="text"
          {...register('firstName', { required: 'First name is required' })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Last Name</label>
        <input
          type="text"
          {...register('lastName', { required: 'Last name is required' })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' } })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} Guest
      </button>
    </form>
  );
};

export default GuestForm;
