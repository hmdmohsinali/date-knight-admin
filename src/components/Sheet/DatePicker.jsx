import React, { useState } from 'react';
import Picker from 'react-mobile-picker';

const selections = {
  year: [...Array(11).keys()], // Generates [0,1,2,...,10]
  month: [...Array(13).keys()], // Generates [0,1,2,...,12]
  day: [...Array(20).keys()].map((i) => i + 1), // Generates [1,2,...,20]
};

const DatePicker = ({ onDateSelect, onClose }) => {
  const [pickerValue, setPickerValue] = useState({
    year: '0',
    month: '0',
    day: '1',
  });

  const handleSetDate = () => {
    const { year, month, day } = pickerValue;
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
      <div className="bg-white p-4 shadow-lg rounded-lg z-50 w-72"> {/* Increased width with w-96 */}
        <div className="header flex justify-between mb-2">
          <span>Years</span>
          <span>Months</span>
          <span>Days</span>
        </div>
        <Picker
          value={pickerValue}
          onChange={(name, value) => setPickerValue((prev) => ({ ...prev, [name]: value }))}
        >
          {Object.keys(selections).map((name) => (
            <Picker.Column key={name} name={name}>
              {selections[name].map((option) => (
                <Picker.Item key={option} value={option.toString()}>
                  {option}
                </Picker.Item>
              ))}
            </Picker.Column>
          ))}
        </Picker>
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
