import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Draggable from 'react-draggable';
import Select from 'react-select';
import { Guest, Table } from '../types';

const TableForm: React.FC<{ initialData?: Table; onSave?: () => void }> = ({ initialData, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Table>({
    defaultValues: initialData || { number: '', capacity: 0, guests: [] },
  });
  const [guests, setGuests] = useState<Guest[]>([]);
  const [seatAssignments, setSeatAssignments] = useState<Guest[]>(initialData?.guests || []);
  const [draggedGuestIndex, setDraggedGuestIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await axios.get<Guest[]>('/api/guests');
        setGuests(response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    }
    fetchGuests();
  }, []);

  const onSubmit = async (data: Table) => {
    const tableData = { ...data, guests: seatAssignments };
    try {
      if (initialData?.id) {
        await axios.put(`/api/tables/${initialData.id}`, tableData);
        toast.success('Table updated successfully');
      } else {
        await axios.post('/api/tables', tableData);
        toast.success('Table added successfully');
      }
      reset();
      if (onSave) onSave();
    } catch (error) {
      console.error('Error saving table:', error);
      toast.error('Failed to save Table');
    }
  };

  const handleGuestChange = (selectedGuests: any) => {
    setSeatAssignments(selectedGuests ? selectedGuests.map((guest: any) => guest.value) : []);
  };

  const handleDragStart = (index: number) => {
    setDraggedGuestIndex(index);
  };

  const handleDragStop = (index: number) => {
    if (draggedGuestIndex !== null && draggedGuestIndex !== index) {
      const updatedSeatAssignments = [...seatAssignments];
      const draggedGuest = updatedSeatAssignments.splice(draggedGuestIndex, 1)[0];
      updatedSeatAssignments.splice(index, 0, draggedGuest);
      setSeatAssignments(updatedSeatAssignments);
    }
    setDraggedGuestIndex(null);
  };

  const renderSeats = () => {
    const seats = [];
    const capacity = initialData?.capacity || 0;
    const halfCapacity = Math.ceil(capacity / 2);
    const topRow = Math.min(halfCapacity, Math.floor(capacity / 2));
    const bottomRow = capacity - topRow;

    for (let i = 0; i < capacity; i++) {
      const isTopRow = i < topRow;
      const rowClass = isTopRow ? "top-2" : "bottom-2";
      const rowLength = isTopRow ? topRow : bottomRow;
      const leftPercentage = `${(100 / (rowLength + 1)) * (i % halfCapacity + 1)}%`;

      seats.push(
        <Draggable
          key={i}
          axis="x"
          bounds="parent"
          onStart={() => handleDragStart(i)}
          onStop={() => handleDragStop(i)}
        >
          <div
            className={`absolute w-12 h-12 bg-weddingPink text-white rounded-full flex items-center justify-center ${rowClass}`}
            style={{ left: leftPercentage }}
          >
            {seatAssignments[i] ? seatAssignments[i].firstName.charAt(0) : i + 1}
          </div>
        </Draggable>
      );
    }
    return seats;
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
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Assign Guests</label>
        <Select
          isMulti
          options={guests.map(guest => ({ label: `${guest.firstName} ${guest.lastName}`, value: guest }))}
          onChange={handleGuestChange}
          value={seatAssignments.map(guest => ({ label: `${guest.firstName} ${guest.lastName}`, value: guest }))}
          className="w-full"
        />
      </div>
      <button type="submit" className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200">
        {initialData ? 'Update' : 'Add'} Table
      </button>
      <div className="mt-6">
        <h3 className="text-2xl mb-4">Virtual Table</h3>
        <div className="relative w-full h-64 border rounded flex flex-wrap justify-center items-center">
          <div className="absolute w-24 h-24 bg-weddingGold text-white rounded-full flex items-center justify-center text-2xl">
            {initialData?.number || 'T'}
          </div>
          {renderSeats()}
        </div>
      </div>
    </form>
  );
};

export default TableForm;
