import React, { useState, useEffect } from "react";
import LoaderCircle from "../LoaderCircle/LoaderCircle";


const ManageWinner = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchEvents = () => {
      setLoading(true); 
        const fetchedEvents = [
          {
            id: 24,
            challenger: "Joey Tribbs",
            opponent: "Chan Bing",
            date: "24-08-2000",
            status: "Completed",
            winner: "Joey Tribbs",
            winnerOptions: ["Joey Tribbs", "Chan Bing"],
            statusOptions: ["Completed", "Tied"],
          },
          {
            id: 18,
            challenger: "Name 2",
            opponent: "Name 2",
            date: "24-08-2000",
            status: "Tied",
            winner: "Pending",
            winnerOptions: ["Name 2", "Name 2"],
            statusOptions: ["Completed", "Tied"],
          },
          {
            id: 8,
            challenger: "Name 3",
            opponent: "Name 3",
            date: "24-08-2000",
            status: "Tied",
            winner: "Pending",
            winnerOptions: ["Name 3", "Name 3"],
            statusOptions: ["Completed", "Tied"],
          },
        ];

        setEvents(fetchedEvents);
        setLoading(false); // Set loading to false after data is fetched
       
    };

    fetchEvents();
  }, []);

  const handleWinnerChange = (e, index) => {
    const newEvents = [...events];
    newEvents[index].winner = e.target.value;
    setEvents(newEvents);
  };

  const handleStatusChange = (e, index) => {
    const newEvents = [...events];
    newEvents[index].status = e.target.value;
    setEvents(newEvents);
  };

  if (loading) {
    return <LoaderCircle />; 
  }

  return (
    <div className="p-6 md:p-8 shadow-lg rounded-xl overflow-hidden max-w-full mx-auto mt-10">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">
        Manage Winner
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl text-sm md:text-base">
          <thead>
            <tr className="bg-[#FFA768]">
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                ID
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                CHALLENGER
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                OPPONENT
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                EVENT DATE
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                EVENT STATUS
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 border-b">
                WINNER
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className="border-b last:border-b-0">
                <td className="py-3 px-4 border-r">{event.id}</td>
                <td className="py-3 px-4 border-r">{event.challenger}</td>
                <td className="py-3 px-4 border-r">{event.opponent}</td>
                <td className="py-3 px-4 border-r">{event.date}</td>
                <td className="py-3 px-4 border-r">
                  <select
                    value={event.status}
                    onChange={(e) => handleStatusChange(e, index)}
                    className={`select w-full select-xs max-w-xs text-sm ${
                      event.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {event.statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={event.winner}
                    onChange={(e) => handleWinnerChange(e, index)}
                    className="select select-xs w-full max-w-xs text-sm bg-gray-100 border-gray-300"
                  >
                    {event.winnerOptions.map((winner) => (
                      <option key={winner} value={winner}>
                        {winner}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWinner;
