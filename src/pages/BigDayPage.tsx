import React, { useEffect, useState } from "react";
import axios from "axios";
import BigDayList from "../components/BigDay/BigDayList";
import BigDayForm from "../components/BigDay/BigDayForm";
import { BIGDAY_URL_GET } from "../utils/AWSURI";

interface BigDay {
  id: string;
  name: string;
  date: string;
  venue: string;
}

const BigDayPage: React.FC = () => {
  const [bigDays, setBigDays] = useState<BigDay[]>([]);

  const fetchBigDays = async () => {
    try {
      const response = await axios.get(BIGDAY_URL_GET);
      const data = response.data;
      // const data = JSON.parse(response.data.body);
      console.log(data);
      // const transformedData = data
      //   .map((item: any) => ({
      //     id: item.eventId,
      //     name: item.EventName,
      //     date: item.Date,
      //     venue: item.Venue,
      //   }))
      //   .sort(
      //     (a: BigDay, b: BigDay) =>
      //       new Date(b.date).getTime() - new Date(a.date).getTime()
      //   );

      const transformedData = data.sort(
        (a: BigDay, b: BigDay) => parseInt(b.id) - parseInt(a.id)
      );
      setBigDays(transformedData);
    } catch (error) {
      console.error("Error fetching big days:", error);
    }
  };

  useEffect(() => {
    fetchBigDays();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-script text-weddingGold text-center mb-6">
        Big Days
      </h1>
      <BigDayForm onFormSubmit={fetchBigDays} />
      <BigDayList bigDays={bigDays} fetchBigDays={fetchBigDays} />
    </div>
  );
};

export default BigDayPage;
