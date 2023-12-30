// WaterReminderApp.js

import React, { useState, useEffect } from 'react';
import './WaterReminderApp.css';
import WaterCalendarApp from './WaterCalendarApp';

const WaterReminderApp = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [waterData, setWaterData] = useState({});
  const [isDataDirty, setIsDataDirty] = useState(false);

  useEffect(() => {
    document.title = `Su İçme Hatırlatıcısı - ${waterCount} / ${goal} Bardak`;
    updateWaterData();
  }, [waterCount, goal]);

  useEffect(() => {
    const savedWaterCount = localStorage.getItem('waterCount');
    if (savedWaterCount) {
      setWaterCount(parseInt(savedWaterCount, 10));
    }

    const savedWaterData = localStorage.getItem('waterData');
    if (savedWaterData) {
      setWaterData(JSON.parse(savedWaterData));
    }
  }, []);

  const updateWaterData = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentWaterCount = waterData[currentDate] || 0;

    const updatedWaterData = {
      ...waterData,
      [currentDate]: currentWaterCount + 1, // Sadece 1 ekliyoruz
    };

    setWaterData(updatedWaterData);
    setIsDataDirty(true);
  };

  const saveWaterData = () => {
    updateWaterData();
    localStorage.setItem('waterData', JSON.stringify(waterData));
    setIsDataDirty(false);
  };

  const resetData = () => {
    const currentDate = new Date().toLocaleDateString();
    const updatedWaterData = { ...waterData };
    delete updatedWaterData[currentDate];

    setWaterData(updatedWaterData);
    setIsDataDirty(true);
  };

  const IncrementWaterCount = () => {
    if (waterCount < goal) {
      setWaterCount(waterCount + 1);
    }
  };

  const DecrementWaterCount = () => {
    if (waterCount > 0) {
      setWaterCount(waterCount - 1);
    }
  };

  const SetGoal = (newGoal) => {
    if (newGoal > 0) {
      setGoal(newGoal);
    }
  };

  const ResetCount = () => {
    setWaterCount(0);
    resetData();
  };

  return (
    <div className="water-reminder-app">
      <h1>Su İçme Hatırlatıcısı</h1>
      <div className="goal-container">
        <p className="goal-display">Günlük Hedef: {goal} Bardak</p>
        <input
          type="number"
          min="1"
          value={goal}
          onChange={(e) => SetGoal(parseInt(e.target.value, 10))}
          className="goal-input"
        />
      </div>
      <p className="water-count-display">Bugün İçilen Su: {waterCount} / {goal} Bardak</p>
      <div className="button-container">
        <button className="increment-button" onClick={IncrementWaterCount}>
          Bardak Ekle
        </button>
        <button className="decrement-button" onClick={DecrementWaterCount}>
          Bardak Çıkar
        </button>
      </div>

      <div className="reset-container">
        <button className="reset-button" onClick={ResetCount}>
          Sıfırla
        </button>
      </div>

      <p className="info-message">
        Su içmeyi unutma! Günlük su hedefini belirle, içtiğin her bardağı kaydet ve sıfırla.
      </p>

      {isDataDirty && (
        <button className="save-button" onClick={saveWaterData}>
          Kaydet
        </button>
      )}

      <WaterCalendarApp waterDataFromReminder={waterData} />
    </div>
  );
};

export default WaterReminderApp;
