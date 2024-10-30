import { useCallback, useState } from "react";
import Checkbox from "../../components/Checkbox";
import Range from "../../components/Range";
import Rate from "../../components/Rate";
import { useFilters } from "../../context/filters";

import "./style.css";

export const filterData = {
  categories: ["Electronics", "Footwear", "Clothing"],
  brands: ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"],
};

const Filter = () => {
  const [toggle, setToggle] = useState(false);

  const handleFilter = () => {
    setToggle(!toggle);
  };

  const { filters, setFilters } = useFilters();

  const handleCheckbox = useCallback(
    (item, key) => {
      setFilters((filters) => {
        let data = [...filters[key]];

        if (data.includes(item)) {
          data = data.filter((d) => d !== item);
        } else {
          data.push(item);
        }

        localStorage.setItem("filters", JSON.stringify({ ...filters, [key]: data }));

        return { ...filters, [key]: data };
      });
    },
    [setFilters]
  );

  const handleRange = useCallback(
    (price) => {
      setFilters((filters) => {
        localStorage.setItem("filters", JSON.stringify({ ...filters, price }));

        return { ...filters, price };
      });
    },
    [setFilters]
  );

  const handleRate = useCallback(
    (rating) => {
      setFilters((filters) => {
        localStorage.setItem("filters", JSON.stringify({ ...filters, rating }));

        return { ...filters, rating };
      });
    },
    [setFilters]
  );

  return (
    <div className="filter-container-wrapper">
      <button onClick={handleFilter}>
        <p>Filter</p>
        <img src="assets/icons8-filter-48.png" alt="filter" />
      </button>
      <div className={`filter-container${toggle ? " open" : ""}`}>
        <div className="filter-box">
          <h3>Filters</h3>
          <div>
            <h4>Category</h4>
            {filterData.categories.map((category) => (
              <Checkbox
                key={category}
                label={category}
                checked={filters.categories.includes(category)}
                onChange={() => handleCheckbox(category, "categories")}
              />
            ))}
          </div>
          <div>
            <h4>Brand</h4>
            {filterData.brands.map((brand) => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => handleCheckbox(brand, "brands")}
              />
            ))}
          </div>
          <div>
            <h4>Price</h4>
            <Range value={filters.price} onChange={handleRange} />
          </div>
          <div>
            <h4>Rating</h4>
            <Rate value={filters.rating} onChange={handleRate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
