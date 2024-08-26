import React, { useState } from 'react';
import Picker from 'react-mobile-picker';

const selections = {
  year: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  month: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
};

const DatePicker = ({ onDateSelect, position }) => {
  const [pickerValue, setPickerValue] = useState({
    year: '0',
    month: '0',
    day: '1',
  });

  const handleSetDate = () => {
    const { year, month, day } = pickerValue;
    const selectedDate = `${year} Years ${month} Months ${day} Days`;
    onDateSelect(selectedDate);
  };

  const handleCancel=()=>{
    onDateSelect()
  }
  return (
    <div
      className="picker-container bg-white p-4 shadow-lg rounded-lg z-50"
      style={{
        position: 'absolute',
        top: position?.top || '50%',
        left: position?.left || '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="header flex justify-between mb-2">
        <span>Years</span>
        <span>Months</span>
        <span>Days</span>
      </div>
      <Picker value={pickerValue} onChange={setPickerValue}>
        {Object.keys(selections).map((name) => (
          <Picker.Column key={name} name={name}>
            {selections[name].map((option) => (
              <Picker.Item key={option} value={option}>
                {option}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
      <div className="footer flex justify-end space-x-4 mt-4">
        <button
          className="cancel-btn bg-red-500 text-white px-3 py-1 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="set-btn bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleSetDate}
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
