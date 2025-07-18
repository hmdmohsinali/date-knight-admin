import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import "daisyui/dist/full.css";
import "./CustomCSS.css";
import axios from "axios";
import { serverUrl } from "../../../api";
import LoaderCircle from "../LoaderCircle/LoaderCircle";
import { toast } from "react-toastify";
import { format, setHours, setMinutes } from "date-fns"; // Import date-fns functions

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [editingTitleIndex, setEditingTitleIndex] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${serverUrl}getEvents`);
        const data = response.data;
        // Filter out events that already have a dateAllot (i.e., skip them)
        const unscheduledEvents = data.filter((event) => !event.dateAllot);

        // Map only unscheduled events to your local state
        const formattedEvents = unscheduledEvents.map((event) => ({
          id: event._id,
          challenger: event.challenger?.name || "N/A",
          opponent: event.challengedUser?.name || "N/A",
          date: null, // We'll keep it null because user hasn't selected yet
          time: "",
          approve: event.approve,
          title: event.title,
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

  const handleTitleChange = (title, index) => {
    const newEvents = [...events];
    newEvents[index].title = title;
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
    if (!event.title) {
      setPopup({
        show: true,
        message: "Please eneter event name",
      });
      return;
    }
    if (!event.approve) {
      setPopup({
        show: true,
        message:
          "Event is not approved. Please approve the event before scheduling.",
      });
      return;
    }

    // Construct the dateAllot in local time and convert it to the required format
    const [hours, minutes] = event.time.split(":").map(Number);
    const localDate = setHours(setMinutes(event.date, minutes), hours);

    // Send the date to the backend in UTC (use toISOString for that)
    const dateAllot = localDate.toISOString(); // Convert to ISO string for UTC
    const eventTitle = event.title;
    try {
      const response = await axios.put(`${serverUrl}setDate/${eventId}`, {
        dateAllot,
        title: eventTitle,
      });
      const { message, eventId: id } = response.data;
      toast.success("Event scheduled successfully");

      // Remove the scheduled event from the local list
      setEvents(events.filter((ev) => ev.id !== id));
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
            <table className="min-w-full bg-white  text-sm md:text-base">
              <thead>
                <tr className="bg-[#FFA768]">
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    ID
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    CHALLENGER
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    OPPONENT
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    EVENT NAME
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    EVENT DATE
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    EVENT TIME
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    APPROVE
                  </th>
                  <th className="py-2 px-4 text-left font-medium text-white border-b">
                    EVENT ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id} className="border-b last:border-b-0">
                    <td className="py-2 px-4 border-r">{event.id.slice(-4)}</td>
                    <td className="py-2 px-4 border-r">{event.challenger}</td>
                    <td className="py-2 px-4 border-r">{event.opponent}</td>
                    <td className="py-2 px-4 border-r">
                      {editingTitleIndex === index ? (
                        <input
                          type="text"
                          placeholder="Enter Title"
                          value={event.title || ""}
                          onChange={(e) =>
                            handleTitleChange(e.target.value, index)
                          }
                          onBlur={() => setEditingTitleIndex(null)} // Finish editing on blur
                          autoFocus
                          className="outline-none border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span
                          className="cursor-pointer text-gray-700"
                          onClick={() => setEditingTitleIndex(index)}
                        >
                          {event.title || (
                            <span className="text-gray-400 italic">
                              Click to enter
                            </span>
                          )}
                        </span>
                      )}
                    </td>

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
  onSchedule: PropTypes.func.isRequired,
};

export default ManageEvents;
