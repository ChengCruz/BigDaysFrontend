import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface BigDay {
  id?: string;
  name: string;
  date: string;
  venue: string;
}

const BigDayForm: React.FC<{
  initialData?: BigDay;
  onFormSubmit?: () => void;
}> = ({ initialData, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BigDay>({
    defaultValues: initialData || { name: "", date: "", venue: "" },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: BigDay) => {
    try {
      if (initialData?.id) {
        await axios.put(`/api/bigdays/${initialData.id}`, data);
        toast.success("Big Day updated successfully");
      } else {
        await axios.post("/api/bigdays", data);
        toast.success("Big Day added successfully");
      }
      reset();
      if (onFormSubmit) onFormSubmit();
    } catch (error) {
      console.error("Error saving Big Day:", error);
      toast.error("Failed to save Big Day");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-lg p-6 mb-6"
    >
      {/* <h2 className="text-2xl font-script text-weddingGold mb-4">{initialData ? 'Edit Big Day' : 'Add a Big Day'}</h2> */}
      {!initialData && (
        <h2 className="text-2xl font-script text-weddingGold mb-4">
          {"Add a Big Day"}
        </h2>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Date</label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.date && <p className="text-red-600">{errors.date.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Venue</label>
        <input
          type="text"
          {...register("venue", { required: "Venue is required" })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
        />
        {errors.venue && <p className="text-red-600">{errors.venue.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-weddingGold text-white rounded p-2 hover:bg-weddingGold-dark transition duration-200"
      >
        {initialData ? "Update" : "Add"} Big Day
      </button>
    </form>
  );
};

export default BigDayForm;
