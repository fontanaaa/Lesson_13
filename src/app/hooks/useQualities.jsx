import React, { useContext, useEffect, useState } from "react";
import quailityService from "../services/quality.service";
import { toast } from "react-toastify";

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
        errorCather(error);
      }
    };
    getQualities();
  }, []);
  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await quailityService.update(id, data);
      setQualities((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) {
            return content;
          }
          return item;
        })
      );
      return content;
    } catch (error) {
      errorCather(error);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await quailityService.create(data);
      setQualities((prevState) => [...prevState, content]);
      return content;
    } catch (error) {
      errorCather(error);
    }
  };

  const deleteQuality = async (id) => {
    try {
      const { content } = await quailityService.delete(id);
      setQualities((prevState) => {
        return prevState.filter((item) => item._id !== content._id);
      });
    } catch (error) {
      errorCather(error);
    }
  };

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
    }
    setError(null);
  }, [error]);

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality,
      }}
    >
      {!isLoading ? children : <h1>Qualities Loading....</h1>}
    </QualitiesContext.Provider>
  );
};
