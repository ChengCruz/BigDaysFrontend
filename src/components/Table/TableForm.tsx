import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Table {
  id?: number;
  number: string;
  capacity: number;
}

const TableForm: React.FC<{ initialData?: Table; onSave?: () => void }> = ({ initialData, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Table>({
    defaultValues: initialData || { number: '', capacity: 0 },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: Table) => {
    try {
      if (initialData?.id) {
        await axios.put(`/api/tables/${initialData.id}`, data);
        toast.success('Table updated successfully');
      } else {
        await axios.post('/api/tables', data);
        toast.success('Table added successfully');
      }
      reset();
      if (onSave) onSave();
    } catch (error) {
      console.error('Error saving table:', error);
      toast.error('Failed to save Table');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Table Number</label>
        <input
          type="text"
          {...register('number', { required: 'Table number is required' })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.number && <p className="text-red-600">{errors.number.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Capacity</label>
        <input
          type="number"
          {...register('capacity', { required: 'Capacity is required', min: { value: 1, message: 'Capacity must be at least 1' } })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.capacity && <p className="text-red-600">{errors.capacity.message}</p>}
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} Table
      </button>
    </form>
  );
};

export default TableForm;
