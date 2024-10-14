import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import "daisyui/dist/full.css";
import "./CustomCSS.css";
import axios from "axios";
import { serverUrl } from "../../../api";
import LoaderCircle from "../LoaderCircle/LoaderCircle";
import { toast } from "react-toastify";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${serverUrl}getEvents`);
        const data = response.data;
        console.log(data)
        const formattedEvents = data.map((event) => ({
          id: event._id,
          challenger: event.challenger.name,
          opponent: event.challengedUser.name,
          date: null,
          time: "",
          approve: event.approve,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDateChange = (date, index) => {
    const newEvents = [...events];
    newEvents[index].date = date;
    setEvents(newEvents);
  };

  const handleTimeChange = (time, index) => {
    const newEvents = [...events];
    newEvents[index].time = time;
    setEvents(newEvents);
  };

  const handleToggle = async (index) => {
    const eventId = events[index].id;

    try {
      const response = await axios.put(`${serverUrl}approveEvent/${eventId}`);
      if (response.data.message === "Event approval status updated") {
        const newEvents = [...events];
        newEvents[index].approve = !newEvents[index].approve;
        setEvents(newEvents);
        toast.success("Event approval status updated successfully");
      } else {
        toast.error("Failed to update event approval status");
      }
    } catch (error) {
      console.error("Error updating event approval status:", error);
      toast.error("Error updating event approval status");
    } finally {
    }
  };

  const handleGoLive = async (eventId) => {
    const event = events.find((e) => e.id === eventId);

    if (!event.approve) {
      setPopup({
        show: true,
        message:
          "Event is not approved. Please approve the event before going live.",
      });
      return;
    }

    try {
      const response = await axios.put(`${serverUrl}goLive/${eventId}`);
      const { message, eventId: id } = response.data;
      console.log(message, id);
      toast.success("Event live successfully");
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error going live:", error);
    }
  };

  const handleSchedule = async (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (!event.date || !event.time) {
      setPopup({
        show: true,
        message: "Please select both date and time before scheduling.",
      });
      return;
    }
    if (!event.approve) {
      setPopup({
        show: true,
        message: "Event is not approved. Please approve the event before scheduling.",
      });
      return;
    }
  
    const dateAllot = new Date(
      `${event.date.toISOString().split("T")[0]}T${event.time}:00.000Z`
    );
  
    
    console.log(dateAllot)

    try {
      const response = await axios.put(`${serverUrl}setDate/${eventId}`, {
        dateAllot,
      });
      const { message, eventId: id } = response.data;
      toast.success("Event scheduled successfully");
  
     
  
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error scheduling event:", error);
    }
  };
  

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = j === 0 ? "00" : "30";
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();


  return (
    <>
      {loading ? (
        <LoaderCircle />
      ) : (
        <div className="p-6 md:p-8 shadow-lg rounded-xl scrollable-container">
          <h1 className="text-3xl font-bold text-orange-400 mt-8 mb-6 rounded-t-xl">
            Manage Event
          </h1>
          <div className="overflow-x-auto scrollable-container">
            <table className="min-w-full bg-white rounded-xl text-sm md:text-base">
              <thead>
                <tr className="bg-[#FFA768]">
                  <th className="py-2 px-4 text-left font-medium text-gray-700 border-b rounded-tl-xl">
                    ID
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">
                    CHALLENGER
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">
                    OPPONENT
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">
                    EVENT DATE
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">
                    EVENT TIME
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700 border-b">
                    APPROVE
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-gray-700 border-b rounded-tr-xl">
                    EVENT ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id} className="border-b last:border-b-0">
                    <td className="py-2 px-4 border-r">{event.id}</td>
                    <td className="py-2 px-4 border-r">{event.challenger}</td>
                    <td className="py-2 px-4 border-r">{event.opponent}</td>
                    <td className="py-2 px-4 border-r">
                      <div className="flex items-center justify-center">
                        <FaRegCalendarAlt className="mr-2 text-orange-500" />
                        <DatePicker
                          selected={event.date}
                          onChange={(date) => handleDateChange(date, index)}
                          placeholderText="Choose"
                          className="outline-none border-none focus:ring-0 bg-transparent"
                          wrapperClassName="w-full"
                          calendarClassName="custom-calendar"
                          popperPlacement="bottom"
                          minDate={new Date()}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border-r">
                      <select
                        value={event.time}
                        onChange={(e) =>
                          handleTimeChange(e.target.value, index)
                        }
                        className="select-dropdown block w-full"
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 border-r">
                      <input
                        type="checkbox"
                        className="toggle toggle-warning"
                        checked={event.approve}
                        onChange={() => handleToggle(index)}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleSchedule(event.id)}
                        className="btn bg-orange-400 text-white"
                      >
                        Schedule for later
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-gray-800">{popup.message}</p>
            <button
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded"
              onClick={() => setPopup({ show: false, message: "" })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

ManageEvents.propTypes = {
  onSchedule: PropTypes.func.isRequired, // This will ensure onSchedule is a function and must be provided
};


export default ManageEvents;
