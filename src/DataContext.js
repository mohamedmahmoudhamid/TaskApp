import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  // قراءة البيانات من localStorage أول ما يفتح الموقع
  useEffect(() => {
    const storedActivities = localStorage.getItem("activities");
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
  }, []);

  // حفظ البيانات في localStorage كل ما تتغير
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const addActivity = (newActivity) => {
    setActivities((prev) => [...prev, newActivity]);
  };

  const deleteActivity = (index) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DataContext.Provider value={{ activities, addActivity, deleteActivity }}>
      {children}
    </DataContext.Provider>
  );
};
