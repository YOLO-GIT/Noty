import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotyContext = createContext();
const NotyProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    findNotes();
  }, []);

  return (
    <NotyContext.Provider value={{ notes, setNotes, findNotes }}>
      {children}
    </NotyContext.Provider>
  );
};

export const useNoty = () => useContext(NotyContext);

export default NotyProvider;
