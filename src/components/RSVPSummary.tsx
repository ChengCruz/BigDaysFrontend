import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface RSVP {
  id: string;
  guestName: string;
  status: string;
}

type RSVPStatusCount = {
  Confirmed: number;
  Pending: number;
  Declined: number;
};

const RSVPSummary: React.FC = () => {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const response = await axios.get<RSVP[]>("/api/rsvps");
        setRsvps(response.data);
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      }
    };

    fetchRsvps();
  }, []);

  // Reduce function to count RSVP statuses
  const statusCount: RSVPStatusCount = rsvps.reduce(
    (acc: RSVPStatusCount, rsvp: RSVP) => {
      // Check if rsvp.status is a key in the accumulator object
      if (rsvp.status in acc) {
        acc[rsvp.status as keyof RSVPStatusCount] += 1;
      }
      return acc;
    },
    { Confirmed: 0, Pending: 0, Declined: 0 }
  );

  const data = [
    { name: "Confirmed", value: statusCount.Confirmed },
    { name: "Pending", value: statusCount.Pending },
    { name: "Declined", value: statusCount.Declined },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#f44336"];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6">RSVP Summary</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default RSVPSummary;
