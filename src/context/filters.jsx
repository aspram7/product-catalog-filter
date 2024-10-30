import { createContext, useContext, useEffect, useState } from "react";

const FiltersContext = createContext({});

export const FiltersContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({ categories: [], brands: [], price: [0, 1000], rating: 0 });

  useEffect(() => {
    const filters = localStorage.getItem("filters");

    if (filters) {
      setFilters(JSON.parse(filters));
    }
  }, []);

  return <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>;
};

export const useFilters = () => useContext(FiltersContext);
