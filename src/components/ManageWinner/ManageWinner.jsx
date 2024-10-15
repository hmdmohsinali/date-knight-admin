import React, { useState, useEffect } from "react";
import LoaderCircle from "../LoaderCircle/LoaderCircle";
import axios from "axios";
import { serverUrl } from "../../../api";
import { toast } from "react-toastify";

const ManageWinner = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${serverUrl}getScheduleEvents`);
        const data = response.data;
        
        
        const transformedData = data.map((event) => ({
          id: event._id,
          challenger: event.challenger.name,
          challengerId: event.challenger._id,
          opponent: event.challengedUser.name,
          opponentId: event.challengedUser._id,
          date: new Date(event.dateAllot).toLocaleDateString(),
          status: event.eventStatus,
         
          winnerId: event.challenger._id, // Default to challenger
          winnerOptions: [
            { id: event.challenger._id, name: event.challenger.name },
            { id: event.challengedUser._id, name: event.challengedUser.name },
          ],
          statusOptions: ["completed", "tied"],
        }));
        
        setEvents(transformedData);
     
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  

  const handleWinnerChange = async (e, index) => {
    const newEvents = [...events];
    const winnerId = e.target.value;
    newEvents[index].winnerId = winnerId;
    newEvents[index].winner = e.target.options[e.target.selectedIndex].text;
    setEvents(newEvents);

    // Send the PUT request to update the winner
    try {
      const eventId = newEvents[index].id;
      await axios.put(`${serverUrl}setWinner/${eventId}`, {
        userId: winnerId,
      });
      toast.success("Winner set successfully!");
    } catch (error) {
      console.error("Error setting winner:", error);
      toast.error("Failed to set winner.");
    }
  };

  const handleStatusChange = async (e, index) => {
    const newEvents = [...events];
    const eventStatus = e.target.value;
    const eventId = newEvents[index].id;
    newEvents[index].status = eventStatus;
    setEvents(newEvents);

    // Send the PUT request to update the status
    try {
      await axios.put(`${serverUrl}changeStatus/${eventId}`, {
        eventStatus,
      });

      toast.success("event status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return <LoaderCircle />;
  }

events.map((eventss) => {
  console.log(eventss.status)
})
  return (
    <div className="p-6 md:p-8 shadow-lg rounded-xl overflow-hidden max-w-full mx-auto mt-10">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">Manage Winner</h1>
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
                <td className="py-3 px-4 border-r">{event.id.slice(-4)}</td>
                <td className="py-3 px-4 border-r">{event.challenger}</td>
                <td className="py-3 px-4 border-r">{event.opponent}</td>
                <td className="py-3 px-4 border-r">{event.date}</td>
                <td className="py-3 px-4 border-r">
                  <select
                    value={event.status} 
                    onChange={(e) => handleStatusChange(e, index)}
                    className={`select w-full select-xs max-w-xs text-sm ${
                      event.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <option key={event.status} value={event.status}>
                        {event.status}
                      </option>
                                   
                    {event.statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                        
                  </select>
              
                </td>

                <td className="py-3 px-4">
                  <select
                    value={event.winnerId}
                    onChange={(e) => handleWinnerChange(e, index)}
                    className="select select-xs w-full max-w-xs text-sm bg-gray-100 border-gray-300"
                  >
                    {event.winnerOptions.map((winner) => (
                      <option key={winner.id} value={winner.id}>
                        {winner.name}
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
