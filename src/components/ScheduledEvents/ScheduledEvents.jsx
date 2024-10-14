import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderCircle from "../LoaderCircle/LoaderCircle";

const ScheduledEvents = () => {
  const [eventsData, setEventsData] = useState([]);
  const [editableEventId, setEditableEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loader state

  useEffect(() => {
    // Fetch events data from the API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://date-knight-backend.vercel.app/admin/getULEvenets");
        setEventsData(response.data);
      } catch (error) {
        toast.error("Failed to fetch events data.");
      } finally {
        setIsLoading(false); // Stop the loader once data is fetched
      }
    };
    fetchEvents();
  }, []);

  const handleEditClick = (event) => {
    setEditableEventId(event._id);
  };

  const handleInputChange = (e, id) => {
    const updatedEvents = eventsData.map((event) =>
      event._id === id ? { ...event, youtubeLink: e.target.value } : event
    );
    setEventsData(updatedEvents);
  };

  const handleKeyPress = async (e, event) => {
    if (e.key === "Enter") {
      try {
        // Call PATCH API using axios when Enter is pressed
        const response = await axios.patch(`https://date-knight-backend.vercel.app/admin/addLink/${event._id}`, {
          youtubeLink: event.youtubeLink,
        });
        // Show success message
        toast.success("YouTube link updated successfully!");
      } catch (error) {
        // Show error message
        toast.error("Failed to update YouTube link. Please try again.");
      } finally {
        setEditableEventId(null); // Close editing mode
      }
    }
  };

  const handleGoLive = (id) => {
    console.log(`Going live for event ID: ${id}`);
    // Add your go live logic here
  };

  if (isLoading) {
    return (
      <LoaderCircle/>
    );
  }

  return (
    <div className="p-6 md:p-8 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-orange-400 mt-8 mb-6">Scheduled Events</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl text-sm md:text-base">
          <thead>
            <tr className="bg-[#FFA768]">
              <th className="py-2 px-4 text-left font-medium text-gray-700 border-b rounded-tl-xl">ID</th>
              <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">CHALLENGER</th>
              <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">OPPONENT</th>
              <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">YOUTUBE LINK</th>
              <th className="py-2 px-4 text-left font-medium text-gray-700 border-b rounded-tr-xl">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {eventsData.map((event) => (
              <tr key={event._id} className="border-b last:border-b-0">
                <td className="py-2 px-4 border-r">{event._id}</td>
                <td className="py-2 px-4 border-r">{event.challenger.name}</td>
                <td className="py-2 px-4 border-r">{event.challengedUser.name}</td>
                <td className="py-2 px-4 border-r flex items-center">
                  <input
                    type="text"
                    value={event.youtubeLink || ""}
                    onChange={(e) => handleInputChange(e, event._id)}
                    onKeyPress={(e) => handleKeyPress(e, event)}
                    readOnly={editableEventId !== event._id}
                    className={`border border-gray-300 rounded focus:outline-none p-2 w-full ${
                      editableEventId === event._id ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                  <FaEdit
                    className="ml-2 text-2xl cursor-pointer text-orange-500"
                    onClick={() => handleEditClick(event)}
                  />
                </td>
                <td className="py-2 px-4 border-r">
                  <button
                    className={`py-1 px-3 rounded text-white ${
                      event.eventStatus === "live"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleGoLive(event._id)}
                    disabled={event.eventStatus === "live"}
                  >
                    Go Live
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduledEvents;
