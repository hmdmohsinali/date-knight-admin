import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderCircle from "../LoaderCircle/LoaderCircle";
import { serverUrl } from "../../../api";


const ScheduledEvents = () => {
  
  const [eventsData, setEventsData] = useState([]);
  const [editableEventId, setEditableEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingId, setIsSavingId] = useState(null); // Track the saving state for each event

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${serverUrl}getULEvenets`);
        setEventsData(response.data);
      } catch (error) {
        toast.error("Failed to fetch events data.");
      } finally {
        setIsLoading(false);
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


  const handleSaveClick = async (event) => {
    setIsSavingId(event._id); // Start loading spinner for this event
    try {
      const response = await axios.patch(`${serverUrl}addLink/${event._id}`, {
        youtubeLink: event.youtubeLink,
      });
      toast.success("YouTube link updated successfully!");
    } catch (error) {
      toast.error("Failed to update YouTube link. Please try again.");
    } finally {
      setEditableEventId(null);
      setIsSavingId(null); // Stop the loading spinner
    }
  };

  const handleGoLive = async (id) => {
    try {
      const response = await axios.post(`${serverUrl}liveEvent`, { eventId: id });
      toast.success("Event is now live!");
    } catch (error) {
      toast.error("Failed to go live. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <LoaderCircle />
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
                <td className="py-2 px-4 border-r">{event._id.slice(-4)}</td>
                <td className="py-2 px-4 border-r">{event.challenger.name}</td>
                <td className="py-2 px-4 border-r">{event.challengedUser.name}</td>
                <td className="py-2 px-4 border-r flex items-center">
                  <input
                    type="text"
                    value={event.youtubeLink || ""}
                    onChange={(e) => handleInputChange(e, event._id)}
                    readOnly={editableEventId !== event._id}
                    className={`border border-gray-300 rounded focus:outline-none p-2 w-full ${
                      editableEventId === event._id ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                  <FaEdit
                    className="ml-2 text-2xl cursor-pointer text-orange-500"
                    onClick={() => handleEditClick(event)}
                  />
                  {editableEventId === event._id && (
                    <button
                      onClick={() => handleSaveClick(event)}
                      className="ml-2 py-1 px-3 rounded bg-[#FFA768] hover:bg-[#f89751] text-white flex items-center"
                      disabled={isSavingId === event._id}
                    >
                      {isSavingId === event._id ? (
                      <div role="status py-1 px-3">
                      <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>

                  </div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  )}
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
