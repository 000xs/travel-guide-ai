import { useState } from 'react';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateClick = (date) => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // reset end date after starting new range
    } else {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(null); // reset range if clicked start date is before end date
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const getDaysInMonth = (date) => {
    const daysInMonth = [];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
      daysInMonth.push(dayDate);
    }
    return daysInMonth;
  };

  const formatDate = (date) => date.toISOString().split('T')[0]; // Format date as yyyy-mm-dd

  const handleInputClick = () => {
    const range = selectedStartDate && selectedEndDate
      ? `${formatDate(selectedStartDate)} to ${formatDate(selectedEndDate)}`
      : 'Select Date Range';
    onDateRangeChange(range);  // Send the selected range to the parent
    toggleCalendar();
  };

  const isDateInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isStartDate = (date) => date && selectedStartDate && date.getTime() === selectedStartDate.getTime();
  const isEndDate = (date) => date && selectedEndDate && date.getTime() === selectedEndDate.getTime();

  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <div className="relative">
      {/* Input */}
      <input
        type="text"
        value={selectedStartDate && selectedEndDate ? `${formatDate(selectedStartDate)} to ${formatDate(selectedEndDate)}` : 'Select Date Range'}
        readOnly
        onClick={handleInputClick}
        className="p-3 border border-gray-300 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Select Date Range"
      />

      {/* Overlay and Centered Calendar Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between mb-4">
              <button onClick={handlePreviousMonth} className="text-xl text-gray-500">
                &lt;
              </button>
              <span className="font-semibold">
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </span>
              <button onClick={handleNextMonth} className="text-xl text-gray-500">
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div key={idx} className="text-sm font-semibold text-gray-600">{day}</div>
              ))}
              {daysInMonth.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`p-2 rounded-md text-sm cursor-pointer ${isStartDate(day) ? 'text-black border border-spice-red' : isEndDate(day) ? 'bg-spice-red text-white' : isDateInRange(day) ? 'bg-blue-100' : 'text-gray-700'}`}
                >
                  {day.getDate()}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={toggleCalendar}
                className="w-full px-4 py-2 bg-spice-red text-white rounded-md hover:bg-spice-red-dark transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
