import React, { useContext, useEffect, useState } from "react";
import quailityService from "../services/quality.service";

const QualitiesContext = React.createContext();
export const useQualities = () => {
  return useContext(QualitiesContext);
};
export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await quailityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (error) {
        const { message } = error.response.data;
        setError(message);
      }
    };
    getQualities();
  }, []);

  return (
    <QualitiesContext.Provider value={{ qualities, isLoading }}>
      {!isLoading ? children : <h1>Qualities Loading....</h1>}
      {children}
    </QualitiesContext.Provider>
  );
};