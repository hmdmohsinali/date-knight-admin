import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderCircle from "../LoaderCircle/LoaderCircle";
import { serverUrl } from "../../../api";

const Modal = ({ isVisible, onClose, data }) => {
  if (!isVisible) return null;

  // Destructure data for easier access
  const { _id, challenger, challengedUser, votes, winner, eventStatus } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Event Summary</h2>

        {/* Event Details */}
        <div className="space-y-4">
          {/* ID */}
          <div className="flex">
            <span className="w-40 font-medium text-gray-700">Event ID:</span>
            <span className="text-gray-800">{_id}</span>
          </div>

          {/* Challenger */}
          <div className="flex">
            <span className="w-40 font-medium text-gray-700">Challenger:</span>
            <span className="text-gray-800">{challenger}</span>
          </div>

          {/* Challenged User */}
          <div className="flex">
            <span className="w-40 font-medium text-gray-700">Challenged User:</span>
            <span className="text-gray-800">{challengedUser}</span>
          </div>

          {/* Votes */}
          <div className="flex">
            <span className="w-40 font-medium text-gray-700">Votes:</span>
            <div className="text-gray-800">
              <div>Challenger: {votes.challenger}</div>
              <div>Challenged User: {votes.challengedUser}</div>
            </div>
          </div>

          {/* Winner */}
          <div className="flex">
            <span className="w-40 font-medium text-gray-700">Winner:</span>
            <span className="text-gray-800">{winner}</span>
          </div>

          {/* Event Status */}
          <div className="flex">
            <span className="w-40 font-medium text-gray-700">Status:</span>
            <span className="text-gray-800 capitalize">{eventStatus}</span>
          </div>
        </div>

        {/* Close Button at Bottom */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ScheduledEvents = () => {
  const [eventsData, setEventsData] = useState([]);
  const [editableEventId, setEditableEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingId, setIsSavingId] = useState(null);
  const [isEndingId, setIsEndingId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsSavingId(event._id);
    try {
      await axios.patch(`${serverUrl}addLink/${event._id}`, {
        youtubeLink: event.youtubeLink,
      });
      toast.success("YouTube link updated successfully!");
    } catch (error) {
      toast.error("Failed to update YouTube link. Please try again.");
    } finally {
      setEditableEventId(null);
      setIsSavingId(null);
    }
  };

  const handleGoLive = async (id) => {
    setIsSavingId(id);
    try {
      await axios.post(`${serverUrl}liveEvent`, { eventId: id });
      toast.success("Event is now live!");
      const updatedEvents = eventsData.map((event) =>
        event._id === id ? { ...event, eventStatus: "live" } : event
      );
      setEventsData(updatedEvents);
    } catch (error) {
      toast.error("Failed to go live. Please try again.");
    } finally {
      setIsSavingId(null);
    }
  };

  const handleEndClick = async (id) => {

    setIsEndingId(id);
    try {
      const response = await axios.put(`${serverUrl}completeEvent/${id}`);
      toast.success("Event ended successfully!");
      console.log(response.data);
      setModalData(response.data);
      setIsModalVisible(true);

      const updatedEvents = eventsData.map((event) =>
        event._id === id ? { ...event, eventStatus: "completed" } : event
      );
      setEventsData(updatedEvents);
    } catch (error) {
      toast.error("Failed to end the event. Please try again.");
    } finally {
      setIsEndingId(null);
    }
  };

  if (isLoading) {
    return <LoaderCircle />;
  }

  return (
    <div className="p-6 md:p-8 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-orange-400 mt-8 mb-6">Scheduled Events</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm md:text-base">
          <thead>
            <tr className="bg-[#FFA768]">
              <th className="py-2 px-4 text-left font-medium text-white border-b">ID</th>
              <th className="py-2 px-4 text-left font-medium text-white border-b">CHALLENGER</th>
              <th className="py-2 px-4 text-left font-medium text-white border-b">OPPONENT</th>
              <th className="py-2 px-4 text-left font-medium text-white border-b">YOUTUBE LINK</th>
              <th className="py-2 px-4 text-left font-medium text-white border-b">ACTION</th>
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
                      {isSavingId === event._id ? "Saving..." : "Save"}
                    </button>
                  )}
                </td>
                <td className="py-2 px-2 border-r">
                  <button
                    className={`py-1 px-2 rounded text-white  ${
                      event.eventStatus === "live"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleGoLive(event._id)}
                    disabled={event.eventStatus === "live"}
                  >
                    {isSavingId === event._id && event.eventStatus !== "live" ? "Going" : "Go Live"}
                  </button>
                  <button
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-md"
                    onClick={() => handleEndClick(event._id)}
                    disabled={isEndingId === event._id || event.eventStatus === "completed"}
                  >
                    {isEndingId === event._id ? "Ending..." : "End"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        data={modalData}
      />
    </div>
  );
};

export default ScheduledEvents;
