import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BIGDAY_URL_ADD, BIGDAY_URL_UPDATE } from "../../utils/AWSURI";

interface BigDay {
  id?: string;
  name: string;
  date: string;
  venue: string;
}
interface apiResponse {
  event_name: string;
  date: Date;
  venue: string;
}

const BigDayForm: React.FC<{
  initialData?: BigDay;
  onFormSubmit?: () => void;
}> = ({ initialData, onFormSubmit }) => {
  const [form, setForm] = useState<BigDay>(
    initialData || { name: "", date: "", venue: "" }
  );

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newData: apiResponse = {
        event_name: form.name,
        date: new Date(form.date),
        venue: form.venue,
      };
      if (initialData?.id) {
        await axios.put(`${BIGDAY_URL_UPDATE}/${initialData.id}`, newData);
        // await axios.put(`/api/bigdays/${initialData.id}`, newData);
        toast.success("Big Day updated successfully");
      } else {
        await axios.post(BIGDAY_URL_ADD, newData);
        // await axios.post("/api/bigdays", newData);
        toast.success("Big Day added successfully");
      }
      setForm({ name: "", date: "", venue: "" });
      console.log('typeof onFormSubmit ',typeof onFormSubmit)
      if (typeof onFormSubmit === "function") onFormSubmit(); // Call the callback to refresh the list
    } catch (error) {
      console.error("Error saving big day:", error);
      toast.error("Failed to save Big Day");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Venue</label>
        <input
          type="text"
          name="venue"
          value={form.venue}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          required
        />
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
