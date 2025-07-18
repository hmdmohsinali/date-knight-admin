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
        console.log("Fetched Events:", data);

        const transformedData = data.map((event) => ({
          id: event._id,
          challenger: event.challenger.trim(), // Remove any extra whitespace
          opponent: event.challengedUser.trim(),
          date: new Date(event.dateAllot).toLocaleDateString(),
          timeRemaining: event.dateAllot,
          status: event.eventStatus,
          votes: event.votes,
          winner: event.winner || "Tie", // Default to "Tie" if winner is not set
          winnerOptions: [
            { id: "challenger", name: event.challenger.trim() },
            { id: "opponent", name: event.challengedUser.trim() },
            { id: "Tie", name: "Tie" },
          ],
          statusOptions: ["completed", "tied"],
        }));

        setEvents(transformedData);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleWinnerChange = async (e, index) => {
    const newEvents = [...events];
    const selectedWinner = e.target.value;
    newEvents[index].winner = selectedWinner;
    setEvents(newEvents);

    try {
      const eventId = newEvents[index].id;
      await axios.put(`${serverUrl}setWinner/${eventId}`, {
        winner: selectedWinner,
      });
      toast.success("Winner set successfully!");
    } catch (error) {
      console.error("Error setting winner:", error);
      toast.error("Failed to set winner.");
    }
  };

  const handleStatusChange = async (e, index) => {
    const newEvents = [...events];
    const selectedStatus = e.target.value;
    newEvents[index].status = selectedStatus;
    setEvents(newEvents);

    try {
      const eventId = newEvents[index].id;
      await axios.put(`${serverUrl}changeStatus/${eventId}`, {
        eventStatus: selectedStatus,
      });
      toast.success("Event status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  const getTimeRemaining = (isoDate) => {
  const now = new Date();
  const target = new Date(isoDate);
  const diff = target - now;

  if (diff <= 0) return "Expired";

  const minutes = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;
  const days = Math.floor(diff / 86400000);

  let parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0 && days === 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(" ") + " left" : "Less than a minute left";
};


  if (loading) {
    return <LoaderCircle />;
  }

  return (
    <div className="p-6 md:p-8 shadow-lg rounded-xl overflow-hidden max-w-full mx-auto mt-10">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">Manage Winner</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl text-sm md:text-base">
          <thead>
            <tr className="bg-[#FFA768]">
              <th className="py-3 px-4 text-left font-medium text-white border-b">ID</th>
              <th className="py-3 px-4 text-left font-medium text-white border-b">CHALLENGER VOTES</th>
              <th className="py-3 px-4 text-left font-medium text-white border-b">OPPONENT VOTES</th>
              <th className="py-3 px-4 text-left font-medium text-white border-b">EVENT DATE</th>
              <th className="py-3 px-4 text-left font-medium text-white border-b">TIME REMAINING</th>
              <th className="py-3 px-4 text-left font-medium text-white border-b">EVENT STATUS</th>
              <th className="py-3 px-4 text-left font-medium text-white border-b">WINNER</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className="border-b last:border-b-0">
                <td className="py-3 px-4 border-r">{event.id.slice(-4)}</td>
                <td className="py-3 px-4 border-r">
                  <div className="flex flex-col">
                    <span className="font-semibold">{event.challenger}</span>
                    <span>{event.votes.challenger} Votes</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-r">
                  <div className="flex flex-col">
                    <span className="font-semibold">{event.opponent}</span>
                    <span>{event.votes.challengedUser} Votes</span>
                  </div>
                </td>
                <td className="py-3 px-4 border-r">{event.date}</td>
                {console.log(event,"eventevent")}
                <td className="py-3 px-4 border-r"> {getTimeRemaining(event.timeRemaining)}</td>
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
                    <option value={event.status}>{event.status}</option>
                    {event.statusOptions
                      .filter((status) => status !== event.status)
                      .map((status) => (
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
