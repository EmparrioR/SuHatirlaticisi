// WaterCalendarApp.js

import React, { useState, useEffect } from 'react';
import './WaterCalendarApp.css';

const WaterCalendarApp = () => {
  const [waterData, setWaterData] = useState({});

  useEffect(() => {
    const savedWaterData = localStorage.getItem('waterData');
    if (savedWaterData) {
      setWaterData(JSON.parse(savedWaterData));
    }
  }, []);

  const ShowWaterIntakeForDay = (date) => {
    alert(`Günlük Su İçme Bilgisi (${date}): ${waterData[date] || 0} Bardak`);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getCalendarMatrix = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);

    const calendarMatrix = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(null);
        } else if (dayCounter <= daysInCurrentMonth) {
          const date = new Date(currentYear, currentMonth, dayCounter);
          week.push(date);
          dayCounter++;
        } else {
          week.push(null);
        }
      }
      calendarMatrix.push(week);
    }

    return calendarMatrix;
  };

  const calendarMatrix = getCalendarMatrix();

  return (
    <div className="water-calendar-app">
      <h1>Su İçme Takvimi</h1>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Pzt</th>
            <th>Sal</th>
            <th>Çar</th>
            <th>Per</th>
            <th>Cum</th>
            <th>Cmt</th>
            <th>Paz</th>
          </tr>
        </thead>
        <tbody>
          {calendarMatrix.map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((day, columnIndex) => (
                <td
                  key={columnIndex}
                  onClick={() => day && ShowWaterIntakeForDay(day.toLocaleDateString())}
                  className={day ? 'calendar-day' : 'empty-day'}
                >
                  {day ? day.getDate() : ''}
                  <p className="water-count">{day && waterData[day.toLocaleDateString()] || 0} Bardak</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="info-message">
        Her gün içtiğin su miktarını görmek için takvim üzerinden bilgi alabilirsin.
      </p>
    </div>
  );
};

export default WaterCalendarApp;
