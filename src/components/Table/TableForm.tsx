import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Guest, Table } from "../types";
import DraggableGuest from "./DraggableGuest";

const TableForm: React.FC<{ initialData?: Table; onSave?: () => void }> = ({
  initialData,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Table>({
    defaultValues: initialData || { number: "", capacity: 0, guests: [] },
  });
  const [guests, setGuests] = useState<Guest[]>([]);
  const [seatAssignments, setSeatAssignments] = useState<Guest[]>(
    initialData?.guests || []
  );
  const [selectedValue, setSelectedValue] = useState();
  const selectInputRef = useRef<any>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await axios.get<Guest[]>("/api/guests");
        setGuests(response.data);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    }
    fetchGuests();
  }, []);

  const onSubmit = async (data: Table) => {
    const tableData = { ...data, guests: seatAssignments };
    try {
      if (initialData?.id) {
        await axios.put(`/api/tables/${initialData.id}`, tableData);
        toast.success("Table updated successfully");
      } else {
        await axios.post("/api/tables", tableData);
        toast.success("Table added successfully");
      }
      reset();
      if (onSave) onSave();
    } catch (error) {
      console.error("Error saving table:", error);
      toast.error("Failed to save Table");
    }
  };

  const handleGuestChange = (selectedGuests: any) => {
    const newGuests: Guest[] = selectedGuests
      ? selectedGuests.map((guest: any) => guest.value)
      : [];
    setSeatAssignments([
      ...seatAssignments,
      ...newGuests.filter((g) => !seatAssignments.includes(g)),
    ]);
  };

  const moveGuest = (dragIndex: number, hoverIndex: number) => {
    const updatedSeatAssignments = Array.from(seatAssignments);
    const [movedGuest] = updatedSeatAssignments.splice(dragIndex, 1);
    updatedSeatAssignments.splice(hoverIndex, 0, movedGuest);
    setSeatAssignments(updatedSeatAssignments);
  };

  const deleteGuest = (index: number) => {
    const updatedSeatAssignments = Array.from(seatAssignments);
    updatedSeatAssignments.splice(index, 1);
    setSeatAssignments(updatedSeatAssignments);
  };

  const clearAllGuests = () => {
    selectInputRef.current.clearValue();
    setSeatAssignments([]);
  };

  const renderSeats = () => {
    const seats = [];
    const capacity = initialData?.capacity || 0;
    const topRow = Math.ceil(capacity / 2);
    const bottomRow = capacity - topRow;

    for (let i = 0; i < capacity; i++) {
      const isTopRow = i < topRow;
      const rowIndex = isTopRow ? i : i - topRow;
      const rowLength = isTopRow ? topRow : bottomRow;
      const topPercentage = isTopRow ? "10%" : "75%";
      const leftPercentage = `${(100 / (rowLength + 1)) * (rowIndex + 0.6)}%`;

      seats.push(
        <div
          key={i}
          className="absolute w-12 h-12 bg-weddingPink text-white rounded-full flex items-center justify-center"
          style={{ top: topPercentage, left: leftPercentage }}
        >
          {seatAssignments[i] ? seatAssignments[i].firstName : i + 1}
        </div>
      );
    }
    return seats;
  };

  const availableGuests = guests.filter((g) => !seatAssignments.includes(g));

  return (
    <DndProvider backend={HTML5Backend}>
     <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full">
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold">Table Number</label>
    <input
      type="text"
      {...register("number", { required: "Table number is required" })}
      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
    />
    {errors.number && (
      <p className="text-red-600">{errors.number.message}</p>
    )}
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold">Capacity</label>
    <input
      type="number"
      {...register("capacity", {
        required: "Capacity is required",
        min: { value: 1, message: "Capacity must be at least 1" },
      })}
      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
    />
    {errors.capacity && (
      <p className="text-red-600">{errors.capacity.message}</p>
    )}
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold">Assign Guests</label>
    <Select
      ref={selectInputRef}
      isMulti
      isClearable={false}
      controlShouldRenderValue={false}
      options={availableGuests.map((guest) => ({
        label: `${guest.firstName} ${guest.lastName}`,
        value: guest,
      }))}
      onChange={handleGuestChange}
      className="w-full mb-4"
    />
    <div className="flex flex-wrap bg-gray-100 p-4 rounded-lg">
      {seatAssignments.map((guest, index) => (
        <DraggableGuest
          key={guest.id}
          guest={guest}
          index={index}
          moveGuest={moveGuest}
          deleteGuest={deleteGuest}
        />
      ))}
    </div>
  </div>
  <button
    type="submit"
    className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200"
  >
    {initialData ? "Update" : "Add"} Table
  </button>
  <button
    type="button"
    onClick={clearAllGuests}
    className="bg-red-600 text-white rounded p-2 ml-2 hover:bg-red-800 transition duration-200"
  >
    Clear All
  </button>
  <div className="mt-6">
    <h3 className="text-2xl mb-4">Virtual Table</h3>
    <div className="relative w-full h-64 border rounded flex flex-wrap justify-center items-center">
      <div className="absolute w-24 h-24 bg-weddingGold text-white rounded-full flex items-center justify-center text-2xl">
        {initialData?.number || "T"}
      </div>
      {renderSeats()}
    </div>
  </div>
</form>

    </DndProvider>
  );
};

export default TableForm;
