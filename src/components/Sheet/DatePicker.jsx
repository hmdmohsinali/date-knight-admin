import React, { useState } from 'react';
import Picker from 'react-mobile-picker';

const DatePicker = ({ onDateSelect, onClose }) => {
  const [valueGroups, setValueGroups] = useState({
    year: '0',
    month: '0',
    day: '1',
  });

  // Define the available options for each column
  const optionGroups = {
    year: Array.from({ length: 11 }, (_, i) => i.toString()),  // "0" to "10" years
    month: Array.from({ length: 13 }, (_, i) => i.toString()), // "0" to "12" months
    day: Array.from({ length: 20 }, (_, i) => (i + 1).toString()) // "1" to "20" days
  };

  const handleChange = (name, value) => {
    setValueGroups((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetDate = () => {
    const { year, month, day } = valueGroups;
    const selectedDate = `${year} Years ${month} Months ${day} Days`;
    onDateSelect(selectedDate);
    onClose(); // Close the modal
  };

  const handleCancel = () => {
    onClose(); // Close the modal without selecting a date
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleCancel}></div>

      {/* Modal Content */}
      <div className="bg-white p-4 shadow-lg rounded-lg z-50 w-72">
        <div className="header flex justify-between mb-2">
          <span>Years</span>
          <span>Months</span>
          <span>Days</span>
        </div>
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={handleChange}
        />
        <div className="footer flex justify-end space-x-4 mt-4">
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleCancel}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSetDate}>
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
