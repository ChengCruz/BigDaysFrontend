import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RSVP {
  id?: string;
  guestName: string;
  status: string;
  guestType?: string;
  eventHashKey?: string;
}

const CustomRSVPForm: React.FC = () => {
  const { hashKey } = useParams<{ hashKey: string }>();
  const [form, setForm] = useState<RSVP>({
    guestName: "",
    status: "",
    guestType: "",
    eventHashKey: hashKey,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/public-rsvps", form);
      // toast.success('RSVP submitted successfully');
      setForm({
        guestName: "",
        status: "",
        guestType: "",
        eventHashKey: hashKey,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast.error("Failed to submit RSVP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-weddingGold">
          RSVP for the Event
        </h1>
        <p className="text-center text-lg mb-6 text-gray-600">
          We are excited to have you join us! Please fill out the form below to
          RSVP.
        </p>
        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold">
                Guest Name
              </label>
              <input
                type="text"
                name="guestName"
                value={form.guestName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
                required
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Guest Type
              </label>
              <select
                name="guestType"
                value={form.guestType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-weddingGold"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-weddingGold text-white rounded-lg p-3 font-semibold hover:bg-weddingGold-dark transition duration-200"
            >
              Submit RSVP
            </button>
          </form>
        )}
        {submitted && (
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-weddingGold">
              Thank you for your RSVP!
            </p>
            <p className="text-gray-600 m-4">
              We look forward to seeing you at the event.
            </p>
            <Link to={'/'} className="bg-weddingPink opacity-80 text-white rounded-lg shadow-lg p-2 hover:bg-pink-300 transition">Return to Home</Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CustomRSVPForm;
