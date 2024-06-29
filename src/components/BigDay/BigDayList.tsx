import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import BigDayForm from "./BigDayForm";
import { toast } from "react-toastify";
import axios from "axios";
import useSearch from "../../hooks/useSearch";

interface BigDay {
  id: string;
  name: string;
  date: string;
  venue: string;
}

// interface apiResponse {
//   event_name: string;
//   date: Date;
//   venue: string;
// }
interface BigDayListProps {
  bigDays: BigDay[];
  fetchBigDays: () => void;
}

const BigDayList: React.FC<BigDayListProps> = ({ bigDays, fetchBigDays }) => {
  // const [bigDays, setBigDays] = useState<BigDay[]>([]);
  const [selectedBigDay, setSelectedBigDay] = useState<BigDay | null>(null);
  const [filteredBigDay, setFilteredBigDay] = useState<BigDay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch(bigDays, 'name');
  useEffect(() => {
    setFilteredBigDay(
      bigDays.filter((bigday) =>
        `${bigday.name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, bigDays]);
  // const fetchBigDays = async () => {
  //   try {
  //     // const response = await axios.get<BigDay[]>(BIGDAY_URL_GET);
  //     // const data = response.data;
  //     const response = await axios.get(BIGDAY_URL_GET);
  //     const data = JSON.parse(response.data.body);

  //     console.log("response: ", data);

  //     // Transform the response data to match the BigDay interface
  //     const transformedData = data?.map((item: any) => ({
  //       id: item.eventId,
  //       name: item.EventName,
  //       date: item.Date,
  //       venue: item.Venue,
  //     }));
  //     setBigDays(transformedData);
  //   } catch (error) {
  //     console.error("Error fetching big days:", error);
  //   }
  // };

  // useEffect(() => {
  //   // async function fetchBigDays() {
  //   //   try {
  //   //     const response = await axios.get<BigDay[]>(BIGDAY_URL_GET);
  //   //     // const response = await axios.get<BigDay[]>("/api/bigdays");
  //   //     setBigDays(response.data);
  //   //   } catch (error) {
  //   //     console.error("Error fetching big days:", error);
  //   //   }
  //   // }
  //   fetchBigDays();
  // }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/bigdays/${id}`);
      toast.success("Big Day deleted successfully");
      fetchBigDays(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting Big Day:", error);
      toast.error("Failed to delete Big Day");
    }
  };

  const openModal = (bigDay: BigDay) => {
    setSelectedBigDay(bigDay);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBigDay(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
              <input
          type="text"
          placeholder="Search Big Days"
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-weddingGold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBigDay.map((bigDay) => (
          <div key={bigDay.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-script text-weddingGold mb-2">
              {bigDay.name}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Date:</strong> {bigDay.date}
            </p>
            <p className="text-gray-700">
              <strong>Venue:</strong> {bigDay.venue}
            </p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => openModal(bigDay)}
                className="bg-weddingPink text-white rounded p-2 hover:bg-pink-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bigDay.id)}
                className="bg-red-600 text-white rounded p-2 hover:bg-red-800 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedBigDay && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Edit Big Day"
        >
          <BigDayForm
            initialData={selectedBigDay}
            onFormSubmit={fetchBigDays}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default BigDayList;
